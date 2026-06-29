import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import stationRoutes from "./routes/stations.js";
import amenityRoutes from "./routes/amenities.js";
import tripPlanRoutes from "./routes/tripPlan.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (req, res) => {
  res.json({ success: true, timestamp: new Date().toISOString() });
});

app.use("/api/stations", stationRoutes);
app.use("/api/amenities", amenityRoutes);
app.use("/api/trip-plan", tripPlanRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack || err.message);
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    error: err.message || "Internal server error",
  });
});

async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`NextCharge API running on port ${PORT}`);
  });
}

startServer();
