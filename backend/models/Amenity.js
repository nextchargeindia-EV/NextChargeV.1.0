import mongoose from "mongoose";

const PlaceSchema = new mongoose.Schema({
  name: String,
  type: String,
  rating: Number,
  totalRatings: Number,
  openNow: Boolean,
  address: String,
  lat: Number,
  lng: Number,
  placeId: String,
  photo: String,
}, { _id: false });

const SuggestionSchema = new mongoose.Schema({
  place: String,
  type: String,
  activity: String,
  timeNeeded: String,
  walkingTime: String,
  tip: String,
  rating: Number,
}, { _id: false });

const AmenitySchema = new mongoose.Schema({
  cacheKey: { type: String, required: true, unique: true },
  stationId: String,
  chargeTimeMin: Number,
  places: [PlaceSchema],
  suggestions: [SuggestionSchema],
  quickSummary: String,
  fetchedAt: { type: Date, default: Date.now },
});

AmenitySchema.index({ fetchedAt: 1 }, { expireAfterSeconds: 21600 });

export default mongoose.model("Amenity", AmenitySchema);
