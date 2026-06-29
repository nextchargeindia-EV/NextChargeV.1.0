import mongoose from "mongoose";

const ConnectorSchema = new mongoose.Schema({
  type: String,
  powerKW: Number,
}, { _id: false });

const StationSchema = new mongoose.Schema({
  placeId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  city: String,
  state: String,
  address: String,
  operator: String,
  isOperational: { type: Boolean, default: true },
  connectors: [ConnectorSchema],
  rating: Number,
  totalRatings: Number,
  photo: String,
  updatedAt: { type: Date, default: Date.now },
});

StationSchema.index({ lat: 1, lng: 1 });
StationSchema.index({ updatedAt: 1 }, { expireAfterSeconds: 86400 });

export default mongoose.model("Station", StationSchema);