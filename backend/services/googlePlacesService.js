import axios from "axios";

const PLACES_API_URL = "https://places.googleapis.com/v1/places:searchNearby";

const EV_CHARGER_TYPES = ["electric_vehicle_charging_station"];

export async function fetchEVStations(lat, lng, radiusKm = 25) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) throw new Error("GOOGLE_MAPS_API_KEY not configured");

  try {
    const response = await axios.post(
      PLACES_API_URL,
      {
        includedTypes: EV_CHARGER_TYPES,
        maxResultCount: 20,
        locationRestriction: {
          circle: {
            center: { latitude: lat, longitude: lng },
            radius: radiusKm * 1000,
          },
        },
        rankPreference: "DISTANCE",
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "places.id,places.displayName,places.location,places.formattedAddress,places.types,places.rating,places.userRatingCount,places.currentOpeningHours,places.evChargeOptions,places.photos",
        },
        timeout: 15000,
      }
    );

    return (response.data.places || []).map(transformGooglePlace);
  } catch (err) {
    console.error("Google Places API error:", err.response?.data || err.message);
    throw new Error(`Places API error: ${err.response?.data?.error?.message || err.message}`);
  }
}

function transformGooglePlace(place) {
  const location = place.location || {};
  const evOptions = place.evChargeOptions || {};
  const connectors = (evOptions.connectors || []).map(c => ({
    type: c.type || "Unknown",
    powerKW: c.maxChargeRateKw || 0,
  }));

  return {
    placeId: place.id,
    name: place.displayName?.text || "Unknown",
    lat: location.latitude || 0,
    lng: location.longitude || 0,
    city: extractCity(place.formattedAddress || ""),
    state: extractState(place.formattedAddress || ""),
    address: place.formattedAddress || "",
    operator: "",
    isOperational: place.currentOpeningHours?.openNow ?? true,
    connectors: connectors.length > 0 ? connectors : [{ type: "Unknown", powerKW: 0 }],
    rating: place.rating || null,
    totalRatings: place.userRatingCount || 0,
    photo: place.photos?.[0]
      ? `https://places.googleapis.com/v1/${place.photos[0].name}/media?key=${process.env.GOOGLE_MAPS_API_KEY}&maxWidthPx=400`
      : "",
  };
}

function extractCity(address) {
  const parts = address.split(",").map(p => p.trim());
  return parts[parts.length - 3] || parts[parts.length - 2] || "";
}

function extractState(address) {
  const parts = address.split(",").map(p => p.trim());
  return parts[parts.length - 2] || "";
}