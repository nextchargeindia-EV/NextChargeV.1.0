import { Router } from "express";
import { findNearbyStations } from "../services/stationService.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { lat, lng, radius = "25", operational } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({ success: false, error: "lat and lng are required" });
    }

    const latNum = parseFloat(lat);
    const lngNum = parseFloat(lng);
    const radiusNum = parseFloat(radius);

    const { stations, source } = await findNearbyStations(latNum, lngNum, radiusNum, {
      operationalOnly: operational === "true",
    });

    res.json({
      success: true,
      source,
      count: stations.length,
      stations: stations.map(({ _id, updatedAt, ...rest }) => rest),
    });
  } catch (err) {
    next(err);
  }
});

export default router;