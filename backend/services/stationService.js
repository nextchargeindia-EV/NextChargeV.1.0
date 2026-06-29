import Station from "../models/Station.js";
import { fetchEVStations } from "./googlePlacesService.js";
import { getDistanceKm } from "../utils/distance.js";

export async function findNearbyStations(lat, lng, radiusKm = 25, options = {}) {
  const { useCache = true, maxAgeHours = 24, operationalOnly = false } = options;

  const latRange = radiusKm / 111;
  const lngRange = radiusKm / (111 * Math.cos(lat * Math.PI / 180));

  if (useCache) {
    const cached = await Station.find({
      lat: { $gte: lat - latRange, $lte: lat + latRange },
      lng: { $gte: lng - lngRange, $lte: lng + lngRange },
      updatedAt: { $gte: new Date(Date.now() - maxAgeHours * 60 * 60 * 1000) },
    }).lean();

    if (cached.length > 0) {
      let stations = cached.map(s => ({
        ...s,
        distanceKm: Math.round(getDistanceKm(lat, lng, s.lat, s.lng) * 10) / 10,
      }));

      stations.sort((a, b) => a.distanceKm - b.distanceKm);

      if (operationalOnly) {
        stations = stations.filter(s => s.isOperational);
      }

      return { stations, source: "cache" };
    }
  }

  const raw = await fetchEVStations(lat, lng, radiusKm);
  const docs = raw.map(s => ({ ...s, updatedAt: new Date() }));

  for (const doc of docs) {
    await Station.findOneAndUpdate({ placeId: doc.placeId }, doc, { upsert: true });
  }

  let stations = docs.map(s => ({
    ...s,
    distanceKm: Math.round(getDistanceKm(lat, lng, s.lat, s.lng) * 10) / 10,
  }));

  stations.sort((a, b) => a.distanceKm - b.distanceKm);

  if (operationalOnly) {
    stations = stations.filter(s => s.isOperational);
  }

  return { stations, source: "api" };
}