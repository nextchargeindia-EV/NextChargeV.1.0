import type { Station, StationsResponse, AmenityResponse, TripPlanResponse } from '../types';

const BASE_URL = (import.meta as any).env?.VITE_API_URL || '';

function getAuthHeaders(): Record<string, string> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const token = localStorage.getItem('authToken');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: getAuthHeaders(),
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json();
}

export async function fetchNearbyStations(
  lat: number,
  lng: number,
  radius = 25,
): Promise<Station[]> {
  const params = new URLSearchParams({
    lat: lat.toString(),
    lng: lng.toString(),
    radius: radius.toString(),
  });
  const data = await request<StationsResponse>(`${BASE_URL}/api/stations?${params}`);
  return data.stations || [];
}

export async function fetchAmenities(
  lat: number,
  lng: number,
  chargeTime: number,
  stationId: string | number,
  stationName: string,
): Promise<AmenityResponse> {
  const params = new URLSearchParams({
    lat: lat.toString(),
    lng: lng.toString(),
    chargeTime: chargeTime.toString(),
    stationId: String(stationId),
    stationName,
  });
  return request<AmenityResponse>(`${BASE_URL}/api/amenities?${params}`);
}

export async function fetchTripPlan(tripData: {
  origin: string;
  destination: string;
  batteryRangeKm: number;
  currentChargePercent: number;
  connectorType?: string;
}): Promise<TripPlanResponse> {
  return request<TripPlanResponse>(`${BASE_URL}/api/trip-plan`, {
    method: 'POST',
    body: JSON.stringify(tripData),
  });
}
