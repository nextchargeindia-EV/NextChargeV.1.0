import axios from "axios";

const ROUTES_API_URL = "https://routes.googleapis.com/directions/v2:computeRoutes";

export async function getDirections(origin, destination) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) throw new Error("GOOGLE_MAPS_API_KEY not configured");

  const response = await axios.post(
    ROUTES_API_URL,
    {
      origin: { address: origin },
      destination: { address: destination },
      travelMode: "DRIVE",
      routingPreference: "TRAFFIC_AWARE",
      computeAlternativeRoutes: false,
      routeModifiers: { avoidTolls: false, avoidHighways: false, avoidFerries: false },
      languageCode: "en-IN",
      regionCode: "IN",
      units: "METRIC",
    },
    {
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline,routes.legs.startLocation,routes.legs.endLocation,routes.legs.steps",
      },
      timeout: 15000,
    }
  );

  const route = response.data.routes?.[0];
  if (!route) throw new Error("No routes found");

  const leg = route.legs[0];
  const steps = leg.steps || [];

  const waypoints = [];
  steps.forEach((step, i) => {
    if (i % 3 === 0 && step.endLocation) {
      waypoints.push({
        lat: step.endLocation.latLng.latitude,
        lng: step.endLocation.latLng.longitude,
      });
    }
  });

  if (leg.endLocation) {
    waypoints.push({
      lat: leg.endLocation.latLng.latitude,
      lng: leg.endLocation.latLng.longitude,
    });
  }

  return {
    totalDistanceKm: Math.round((route.distanceMeters || 0) / 1000),
    waypoints,
    encodedPolyline: route.polyline?.encodedPolyline || "",
    startAddress: origin,
    endAddress: destination,
    durationText: route.duration || "",
  };
}