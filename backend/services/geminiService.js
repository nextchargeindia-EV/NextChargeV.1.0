const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

if (!GEMINI_API_KEY) {
  console.warn("[Gemini] WARNING: GEMINI_API_KEY is not set. AI features will not work.");
}

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

export function buildTripPrompt({ origin, destination, totalDistanceKm, batteryRangeKm, currentChargePercent, stations }) {
  const currentRangeKm = (batteryRangeKm * currentChargePercent) / 100;

  const stationList = stations.map(s =>
    `- ID:${s.ocmId} | ${s.name} | ${s.city}, ${s.state} | ${s.distanceFromOriginKm}km from origin | Connectors: ${s.connectors.map(c => `${c.type} ${c.powerKW}kW`).join(", ")} | Status: ${s.isOperational ? "Operational" : "Offline"}`
  ).join("\n");

  return `
You are an EV trip planning assistant for India. Plan the most efficient charging stops.

TRIP DETAILS:
- Origin: ${origin}
- Destination: ${destination}
- Total route distance: ${totalDistanceKm} km
- EV battery full range: ${batteryRangeKm} km
- Current battery: ${currentChargePercent}% (${currentRangeKm} km available now)
- Assumed battery capacity: 40 kWh

RULES:
1. Always maintain minimum 15% battery buffer on arrival at each stop and final destination
2. Prefer fast chargers (50kW+) to minimize waiting time
3. Only use Operational stations
4. Charge from ~15% to ~80% at each stop (avoid 80-100%, it is slower)
5. If battery is sufficient to complete the trip with 15% buffer, return empty stops array
6. Consider Indian highway conditions — add 10% to distance for detours

AVAILABLE STATIONS ALONG ROUTE:
${stationList.length > 0 ? stationList : "No stations found along this route."}

Return ONLY valid JSON, no markdown, no explanation:
{
  "stops": [
    {
      "stationName": "exact name from list",
      "city": "city name",
      "distanceFromOriginKm": 0,
      "connectorType": "CCS (Type 2)",
      "powerKW": 0,
      "estimatedChargeTimeMin": 0,
      "chargeFrom": 15,
      "chargeTo": 80,
      "reason": "why stop here specifically"
    }
  ],
  "totalChargingTimeMin": 0,
  "totalTripTimeMin": 0,
  "summary": "one or two sentence trip overview"
}
`;
}

export function buildAmenityPrompt(stationName, chargeTimeMin, places) {
  const placesList = places.map(p =>
    `- ${p.name} | Type: ${p.type} | Rating: ${p.rating ?? "N/A"}/5 (${p.totalRatings ?? 0} reviews) | Open now: ${p.openNow ?? "unknown"} | Address: ${p.address}`
  ).join("\n");

  return `
An EV driver is charging their car at "${stationName}" for ${chargeTimeMin} minutes.
All places listed are within 800 meters walking distance.

AVAILABLE NEARBY PLACES:
${placesList.length > 0 ? placesList : "No places found nearby."}

TASK:
Suggest the best 3-4 activities for exactly ${chargeTimeMin} minutes.
- Account for ~5 min walking time each way to the place
- Prioritize open places with good ratings
- Be specific and practical — mention what to do, not just where to go
- If no suitable places, give general tips for spending time near the charging station

Return ONLY valid JSON, no markdown:
{
  "quickSummary": "one line like: Perfect time for a quick lunch and coffee",
  "suggestions": [
    {
      "place": "place name exactly as given",
      "type": "restaurant/cafe/etc",
      "activity": "specific thing to do there",
      "timeNeeded": "X mins",
      "walkingTime": "X min walk",
      "tip": "one practical tip",
      "rating": 0.0
    }
  ]
}
`;
}

async function callGemini(prompt) {
  const res = await fetch(GEMINI_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.2,
        responseMimeType: "application/json",
        maxOutputTokens: 2048,
      },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gemini API error: ${res.status} ${err}`);
  }

  const data = await res.json();
  const raw = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!raw) throw new Error("Gemini returned empty response");

  try {
    return JSON.parse(raw);
  } catch {
    const cleaned = raw.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned);
  }
}

export async function getTripPlan(params) {
  const prompt = buildTripPrompt(params);
  return callGemini(prompt);
}

export async function getAmenitySuggestions(stationName, chargeTimeMin, places) {
  const prompt = buildAmenityPrompt(stationName, chargeTimeMin, places);
  return callGemini(prompt);
}
