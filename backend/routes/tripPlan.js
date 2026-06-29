import { Router } from "express";
import TripCache from "../models/TripCache.js";
import Station from "../models/Station.js";
import { getDirections } from "../services/directionsService.js";
import { findNearbyStations } from "../services/stationService.js";
import { fetchNearbyPlaces } from "../services/placesService.js";
import { getTripPlan, getAmenitySuggestions } from "../services/openaiService.js";
import { getDistanceKm } from "../utils/distance.js";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const { origin, destination, batteryRangeKm, currentChargePercent, connectorType } = req.body;

    if (!origin || !destination || batteryRangeKm == null || currentChargePercent == null) {
      return res.status(400).json({
        success: false,
        error: "origin, destination, batteryRangeKm, and currentChargePercent are required",
      });
    }

    const cacheKey = `${origin}_${destination}_${batteryRangeKm}_${currentChargePercent}`.replace(/\s+/g, "_");

    const cached = await TripCache.findOne({
      cacheKey,
      createdAt: { $gte: new Date(Date.now() - 12 * 60 * 60 * 1000) },
    }).lean();

    if (cached) {
      const { _id, createdAt, ...rest } = cached;
      return res.json({ success: true, source: "cache", ...rest });
    }

    const directions = await getDirections(origin, destination);

    const originLat = directions.waypoints[0]?.lat || 0;
    const originLng = directions.waypoints[0]?.lng || 0;
    const destinationLat = directions.waypoints[directions.waypoints.length - 1]?.lat || 0;
    const destinationLng = directions.waypoints[directions.waypoints.length - 1]?.lng || 0;

    const routeDistanceKm = directions.totalDistanceKm;
    const searchRadius = Math.min(Math.ceil(routeDistanceKm) + 50, 200);

    const { stations: routeStations } = await findNearbyStations(originLat, originLng, searchRadius, {
      useCache: true,
      maxAgeHours: 24,
      operationalOnly: true,
    });

    let stations = routeStations;

    if (connectorType) {
      const ct = connectorType.toLowerCase();
      stations = stations.filter(s =>
        s.connectors?.some(c => c.type.toLowerCase().includes(ct))
      );
    }

    stations = stations.map(s => ({
      ...s,
      distanceFromOriginKm: Math.round(getDistanceKm(originLat, originLng, s.lat, s.lng) * 10) / 10,
    }));

    stations.sort((a, b) => a.distanceFromOriginKm - b.distanceFromOriginKm);

    const aiResult = await getTripPlan({
      origin,
      destination,
      totalDistanceKm: routeDistanceKm,
      batteryRangeKm,
      currentChargePercent,
      stations: stations.slice(0, 50),
    });

    const stops = await Promise.all(
      (aiResult.stops || []).map(async (stop) => {
        const station = stations.find(s => s.name === stop.stationName);

        let amenities = [];
        let suggestions = [];
        let quickSummary = "";

        if (station) {
          try {
            const places = await fetchNearbyPlaces(station.lat, station.lng, stop.estimatedChargeTimeMin || 30);
            amenities = places;

            if (places.length > 0) {
              const ai = await getAmenitySuggestions(stop.stationName, stop.estimatedChargeTimeMin || 30, places);
              quickSummary = ai.quickSummary || "";
              suggestions = ai.suggestions || [];
            }
          } catch {
            // amenities not available for this stop
          }
        }

        return {
          stationName: stop.stationName,
          city: stop.city,
          lat: station?.lat || 0,
          lng: station?.lng || 0,
          distanceFromOriginKm: stop.distanceFromOriginKm,
          connectorType: stop.connectorType,
          powerKW: stop.powerKW,
          estimatedChargeTimeMin: stop.estimatedChargeTimeMin,
          chargeFrom: stop.chargeFrom,
          chargeTo: stop.chargeTo,
          reason: stop.reason,
          quickSummary,
          suggestions,
          places: amenities,
        };
      }),
    );

    const result = {
      origin,
      destination,
      originLat,
      originLng,
      destinationLat,
      destinationLng,
      totalDistanceKm: routeDistanceKm,
      totalChargingTimeMin: aiResult.totalChargingTimeMin || 0,
      totalTripTimeMin: aiResult.totalTripTimeMin || 0,
      summary: aiResult.summary || "",
      stops,
      routePolyline: directions.encodedPolyline,
    };

    await TripCache.findOneAndUpdate(
      { cacheKey },
      { ...result, cacheKey, createdAt: new Date() },
      { upsert: true },
    );

    res.json({ success: true, source: "api", ...result });
  } catch (err) {
    if (err.message?.includes('403') || err.message?.includes('Directions API') || err.message?.includes('Routes API')) {
      return res.status(502).json({
        success: false,
        error: err.message,
      });
    }
    if (err.message?.includes('OpenAI') || err.message?.includes('AI service')) {
      return res.status(502).json({
        success: false,
        error: `AI service error: ${err.message}`,
      });
    }
    next(err);
  }
});

export default router;