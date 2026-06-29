export interface Connector {
  type: string;
  powerKW: number;
}

export interface Station {
  placeId: string;
  name: string;
  lat: number;
  lng: number;
  city: string;
  state: string;
  address: string;
  operator: string;
  isOperational: boolean;
  connectors: Connector[];
  distanceKm?: number;
  rating?: number;
  totalRatings?: number;
  photo?: string;
}

export interface AmenitySuggestion {
  place: string;
  type: string;
  activity: string;
  timeNeeded: string;
  walkingTime: string;
  tip: string;
  rating: number;
}

export interface AmenityPlace {
  name: string;
  type: string;
  rating: number;
  totalRatings: number;
  openNow: boolean;
  address: string;
  lat: number;
  lng: number;
  placeId: string;
  photo: string;
}

export interface AmenityResponse {
  success: boolean;
  source: string;
  chargeTimeMin: number;
  quickSummary: string;
  suggestions: AmenitySuggestion[];
  places: AmenityPlace[];
}

export interface TripStop {
  stationName: string;
  city: string;
  lat: number;
  lng: number;
  distanceFromOriginKm: number;
  connectorType: string;
  powerKW: number;
  estimatedChargeTimeMin: number;
  chargeFrom: number;
  chargeTo: number;
  reason: string;
  quickSummary: string;
  suggestions: AmenitySuggestion[];
  places: AmenityPlace[];
}

export interface TripPlanResponse {
  success: boolean;
  source: string;
  origin: string;
  destination: string;
  originLat: number;
  originLng: number;
  destinationLat: number;
  destinationLng: number;
  totalDistanceKm: number;
  totalChargingTimeMin: number;
  totalTripTimeMin: number;
  summary: string;
  stops: TripStop[];
  routePolyline: string;
}

export interface StationsResponse {
  success: boolean;
  source: string;
  count: number;
  stations: Station[];
}

export interface UserLocation {
  lat: number;
  lng: number;
  accuracy?: number;
}

export const INDIA_CENTER: UserLocation = {
  lat: 20.5937,
  lng: 78.9629,
};

export const MAP_ZOOM = {
  COUNTRY: 5,
  CITY: 12,
  STATION: 15,
} as const;
