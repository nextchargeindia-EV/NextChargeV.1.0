import axios from "axios";

const PLACES_API_URL = "https://places.googleapis.com/v1/places:searchNearby";

const PLACE_TYPES_BY_TIME = {
  short: ["cafe", "convenience_store", "atm", "pharmacy"],
  medium: ["restaurant", "cafe", "shopping_mall", "park", "supermarket"],
  long: ["restaurant", "tourist_attraction", "museum", "shopping_mall", "movie_theater", "park"],
};

function getPlaceTypes(chargeTimeMin) {
  if (chargeTimeMin <= 20) return PLACE_TYPES_BY_TIME.short;
  if (chargeTimeMin <= 60) return PLACE_TYPES_BY_TIME.medium;
  return PLACE_TYPES_BY_TIME.long;
}

export async function fetchNearbyPlaces(lat, lng, chargeTimeMin) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) throw new Error("GOOGLE_MAPS_API_KEY not configured");

  const types = getPlaceTypes(chargeTimeMin);
  const results = [];

  for (const type of types) {
    try {
      const response = await axios.post(
        PLACES_API_URL,
        {
          includedTypes: [type],
          maxResultCount: 3,
          locationRestriction: {
            circle: {
              center: { latitude: lat, longitude: lng },
              radius: 800.0,
            },
          },
          rankPreference: "POPULARITY",
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": apiKey,
            "X-Goog-FieldMask": "places.displayName,places.types,places.rating,places.userRatingCount,places.currentOpeningHours,places.formattedAddress,places.location,places.id,places.photos",
          },
          timeout: 5000,
        }
      );

      const places = (response.data.places || []).map((p) => ({
        name: p.displayName?.text || "Unknown",
        type: p.types?.[0] || type,
        rating: p.rating || null,
        totalRatings: p.userRatingCount || 0,
        openNow: p.currentOpeningHours?.openNow ?? null,
        address: p.formattedAddress || "",
        lat: p.location?.latitude || 0,
        lng: p.location?.longitude || 0,
        placeId: p.id || "",
        photo: p.photos?.[0]
          ? `https://places.googleapis.com/v1/${p.photos[0].name}/media?key=${apiKey}&maxWidthPx=400`
          : "",
      }));

      results.push(...places);
    } catch (err) {
      console.warn(`Places API (New) error for type ${type}:`, err.message);
    }
  }

  return results;
}