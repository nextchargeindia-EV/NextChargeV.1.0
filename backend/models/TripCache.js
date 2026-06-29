import mongoose from "mongoose";

const StopSchema = new mongoose.Schema({
  stationName: String,
  city: String,
  lat: Number,
  lng: Number,
  distanceFromOriginKm: Number,
  connectorType: String,
  powerKW: Number,
  estimatedChargeTimeMin: Number,
  chargeFrom: Number,
  chargeTo: Number,
  reason: String,
  amenities: { type: Array, default: [] },
  suggestions: { type: Array, default: [] },
  quickSummary: String,
}, { _id: false });

const TripCacheSchema = new mongoose.Schema({
  cacheKey: { type: String, required: true, unique: true },
  origin: String,
  destination: String,
  batteryRangeKm: Number,
  currentChargePercent: Number,
  totalDistanceKm: Number,
  stops: [StopSchema],
  totalChargingTimeMin: Number,
  totalTripTimeMin: Number,
  summary: String,
  routePolyline: String,
  createdAt: { type: Date, default: Date.now },
});

TripCacheSchema.index({ createdAt: 1 }, { expireAfterSeconds: 43200 });

export default mongoose.model("TripCache", TripCacheSchema);
