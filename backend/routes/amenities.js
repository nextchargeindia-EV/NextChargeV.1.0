import { Router } from "express";
import Amenity from "../models/Amenity.js";
import { fetchNearbyPlaces } from "../services/placesService.js";
import { getAmenitySuggestions } from "../services/openaiService.js";
import { getChargeTimeBucket } from "../utils/chargeTime.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { lat, lng, chargeTime, stationId, stationName } = req.query;

    if (!lat || !lng || !chargeTime || !stationId || !stationName) {
      return res.status(400).json({
        success: false,
        error: "lat, lng, chargeTime, stationId, and stationName are required",
      });
    }

    const chargeTimeMin = parseInt(chargeTime, 10);
    const bucket = getChargeTimeBucket(chargeTimeMin);
    const cacheKey = `google_${stationId}_${bucket}`;
    const latNum = parseFloat(lat);
    const lngNum = parseFloat(lng);

    const cached = await Amenity.findOne({ cacheKey, fetchedAt: { $gte: new Date(Date.now() - 6 * 60 * 60 * 1000) } }).lean();

    if (cached) {
      return res.json({
        success: true,
        source: "cache",
        chargeTimeMin: cached.chargeTimeMin,
        quickSummary: cached.quickSummary,
        suggestions: cached.suggestions,
        places: cached.places,
      });
    }

    const places = await fetchNearbyPlaces(latNum, lngNum, chargeTimeMin);

    let quickSummary = "";
    let suggestions = [];

    if (places.length > 0) {
      try {
        const geminiResult = await getAmenitySuggestions(stationName, chargeTimeMin, places);
        quickSummary = geminiResult.quickSummary || "";
        suggestions = geminiResult.suggestions || [];
      } catch {
        // fallback: no Gemini suggestions
      }
    }

    await Amenity.findOneAndUpdate(
      { cacheKey },
      {
        cacheKey,
        stationId,
        chargeTimeMin,
        places,
        suggestions,
        quickSummary,
        fetchedAt: new Date(),
      },
      { upsert: true, new: true },
    );

    res.json({
      success: true,
      source: "api",
      chargeTimeMin,
      quickSummary,
      suggestions,
      places,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
