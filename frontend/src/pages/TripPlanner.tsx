import React, { useState, useEffect } from 'react';
import { fetchTripPlan } from '../utils/api';
import { getGoogleMapsLoader } from '../utils/mapsLoader';
import type { TripPlanResponse } from '../types';

export const TripPlanner: React.FC = () => {
  const [origin, setOrigin] = useState('Mumbai');
  const [destination, setDestination] = useState('Pune');
  const [batteryRangeKm, setBatteryRangeKm] = useState(400);
  const [currentChargePercent, setCurrentChargePercent] = useState(80);
  const [connectorType, setConnectorType] = useState('');
  const [calculating, setCalculating] = useState(false);
  const [result, setResult] = useState<TripPlanResponse | null>(null);
  const [error, setError] = useState('');

  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const loader = getGoogleMapsLoader();
    (loader as any).importLibrary('maps').then(() => {
      (loader as any).importLibrary('geometry').then(() => {
        setMapLoaded(true);
      });
    }).catch((err: any) => {
      console.error('Failed to load Google Maps for trip planner:', err);
    });
  }, []);

  const mapRef = React.useRef<any>(null);
  const polylineRef = React.useRef<any>(null);

  useEffect(() => {
    if (!mapLoaded || !result) return;

    const timer = setTimeout(() => {
      const el = document.getElementById('google-map-trip');
      if (!el) return;

      const startPos = { lat: result.originLat || 19.076, lng: result.originLng || 72.877 };
      const endPos = { lat: result.destinationLat || 18.5204, lng: result.destinationLng || 73.8567 };

      const newMap = new (window as any).google.maps.Map(el, {
        center: startPos,
        zoom: 7,
        styles: [
          { elementType: 'geometry', stylers: [{ color: '#1f2937' }] },
          { elementType: 'labels.text.stroke', stylers: [{ color: '#1f2937' }] },
          { elementType: 'labels.text.fill', stylers: [{ color: '#9ca3af' }] },
          { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#111827' }] },
          { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#374151' }] },
          { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#4b5563' }] },
        ],
      });

      const bounds = new (window as any).google.maps.LatLngBounds();

      new (window as any).google.maps.Marker({
        position: startPos, map: newMap, title: `Start: ${result.origin}`,
        icon: { path: google.maps.SymbolPath.CIRCLE, fillColor: '#10B981', fillOpacity: 1, strokeColor: '#FFFFFF', strokeWeight: 2, scale: 8 },
      });
      bounds.extend(startPos);

      (result.stops || []).forEach((stop, i) => {
        if (stop.lat && stop.lng) {
          const pos = { lat: stop.lat, lng: stop.lng };
          new (window as any).google.maps.Marker({
            position: pos, map: newMap, title: `Stop ${i + 1}: ${stop.stationName}`,
            label: { text: `${i + 1}`, color: '#FFFFFF', fontSize: '12px', fontWeight: 'bold' },
            icon: { path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z', fillColor: '#F97316', fillOpacity: 1, strokeColor: '#FFFFFF', strokeWeight: 2, scale: 1.3, labelOrigin: new (window as any).google.maps.Point(12, 10) },
          });
          bounds.extend(pos);
        }
      });

      new (window as any).google.maps.Marker({
        position: endPos, map: newMap, title: `End: ${result.destination}`,
        icon: { path: google.maps.SymbolPath.CIRCLE, fillColor: '#EF4444', fillOpacity: 1, strokeColor: '#FFFFFF', strokeWeight: 2, scale: 8 },
      });
      bounds.extend(endPos);

      if (result.routePolyline) {
        const path = (window as any).google.maps.geometry.encoding.decodePath(result.routePolyline);
        polylineRef.current = new (window as any).google.maps.Polyline({
          path, geodesic: true, strokeColor: '#00d4aa', strokeOpacity: 0.8, strokeWeight: 4, map: newMap,
        });
      }

      newMap.fitBounds(bounds);
      mapRef.current = newMap;
    }, 200);

    return () => clearTimeout(timer);
  }, [result, mapLoaded]);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCalculating(true);
    setError('');
    setResult(null);

    try {
      const data = await fetchTripPlan({
        origin,
        destination,
        batteryRangeKm,
        currentChargePercent,
        connectorType: connectorType || undefined,
      });
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Failed to generate trip plan');
    } finally {
      setCalculating(false);
    }
  };

  return (
    <section className="trip-planner">
      <div className="container">
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <p className="eyebrow">Smart Route Optimization</p>
          <h1 className="text-display-lg" style={{ marginTop: '5px', fontWeight: 900, lineHeight: 1.1 }}>EV Trip Planner</h1>
          <p className="text-body-lg" style={{ color: 'var(--color-text-on-dark-muted)', maxWidth: '600px', marginTop: '8px' }}>
            Plan long-distance EV drives across India with smart charging stop recommendations powered by Gemini AI.
          </p>
        </div>

        <div className="planner-layout">
          <div className="planner-card planner-form">
            <h3>Route Settings</h3>
            <form id="trip-planner-form" onSubmit={handleCalculate}>
              <div className="form-group">
                <label htmlFor="route-source">Origin</label>
                <input type="text" id="route-source" required placeholder="e.g. Mumbai" value={origin} onChange={e => setOrigin(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="route-destination">Destination</label>
                <input type="text" id="route-destination" required placeholder="e.g. Pune" value={destination} onChange={e => setDestination(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="route-range">Battery Range (km)</label>
                <input type="number" id="route-range" required min={50} max={1000} value={batteryRangeKm} onChange={e => setBatteryRangeKm(Number(e.target.value))} />
              </div>
              <div className="form-group">
                <label htmlFor="route-soc">Current Charge (%)</label>
                <input type="range" id="route-soc" min={0} max={100} value={currentChargePercent} onChange={e => setCurrentChargePercent(Number(e.target.value))} />
                <span style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>{currentChargePercent}%</span>
              </div>
              <div className="form-group">
                <label htmlFor="route-connector">Preferred Connector (optional)</label>
                <select id="route-connector" value={connectorType} onChange={e => setConnectorType(e.target.value)}>
                  <option value="">Any</option>
                  <option value="CCS">CCS</option>
                  <option value="CHAdeMO">CHAdeMO</option>
                  <option value="Type 2">Type 2</option>
                </select>
              </div>
              <button type="submit" className="btn--primary" id="btn-submit-trip" disabled={calculating} style={{ width: '100%', border: 'none', padding: '14px', fontWeight: 'bold', borderRadius: 'var(--radius-sm)', cursor: 'pointer', marginTop: 'var(--space-4)' }}>
                {calculating ? 'Planning Trip...' : 'Plan My Trip'}
              </button>
            </form>
          </div>

          <div className="results-container active">
            {error && (
              <div className="route-dashboard">
                <p style={{ color: 'var(--color-error)', padding: 24, textAlign: 'center' }}>{error}</p>
              </div>
            )}

            {result ? (
              <div className="route-dashboard" id="trip-results">
                <div className="route-dashboard__header">
                  <h3 className="route-dashboard__title">{result.origin} to {result.destination}</h3>
                  <div className="route-dashboard__vehicle-badge">{result.stops.length === 0 ? 'No stops needed' : `${result.stops.length} stop(s)`}</div>
                </div>

                {mapLoaded && (
                  <div className="trip-route-map" style={{ minHeight: '400px', position: 'relative', marginBottom: '24px' }}>
                    <div id="google-map-trip" style={{ width: '100%', height: '400px', borderRadius: 'var(--radius-lg)' }}></div>
                  </div>
                )}

                <div className="route-dashboard__stats">
                  <div className="route-stat">
                    <span className="route-stat__label">Total Distance</span>
                    <span className="route-stat__value">{result.totalDistanceKm} <span className="route-stat__unit">km</span></span>
                  </div>
                  <div className="route-stat">
                    <span className="route-stat__label">Charging Time</span>
                    <span className="route-stat__value">{result.totalChargingTimeMin} <span className="route-stat__unit">min</span></span>
                  </div>
                  <div className="route-stat">
                    <span className="route-stat__label">Total Trip Time</span>
                    <span className="route-stat__value">{result.totalTripTimeMin} <span className="route-stat__unit">min</span></span>
                  </div>
                  <div className="route-stat">
                    <span className="route-stat__label">Charging Stops</span>
                    <span className="route-stat__value">{result.stops.length} <span className="route-stat__unit">stops</span></span>
                  </div>
                </div>

                {result.summary && (
                  <div style={{ padding: '16px', background: 'rgba(0, 212, 170, 0.1)', borderRadius: 'var(--radius-sm)', marginBottom: 'var(--space-6)', color: 'var(--color-text-on-dark-muted)' }}>
                    <span style={{ fontWeight: 600, color: '#00d4aa' }}>Summary: </span>{result.summary}
                  </div>
                )}

                {result.stops.length > 0 && (
                  <div className="timeline-container">
                    <div style={{ marginBottom: 'var(--space-6)' }}>
                      <h4 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '16px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)' }}>
                        Charging Stops
                      </h4>
                    </div>
                    <div className="trip-timeline">
                      {result.stops.map((stop, idx) => (
                        <div key={idx} className="trip-stop trip-stop--card">
                          <div className="trip-stop__dot trip-stop__dot--charge"></div>
                          <div className="trip-stop__card-inner">
                            <div>
                              <div className="trip-stop__label trip-stop__label--charge">Stop #{idx + 1}</div>
                              <h5 className="trip-stop__name">{stop.stationName}</h5>
                              <div className="trip-stop__meta">{stop.city} · {stop.distanceFromOriginKm}km from origin</div>
                              <div className="trip-stop__meta" style={{ marginTop: '4px', color: 'var(--color-orange-500)', fontWeight: 'bold' }}>
                                {stop.chargeFrom}% → {stop.chargeTo}% · {stop.connectorType} {stop.powerKW}kW · {stop.estimatedChargeTimeMin} min
                              </div>
                              {stop.reason && (
                                <div className="trip-stop__meta" style={{ marginTop: '4px', fontStyle: 'italic', color: 'var(--color-text-secondary)' }}>
                                  "{stop.reason}"
                                </div>
                              )}
                              {stop.quickSummary && (
                                <div style={{ marginTop: 8, padding: '8px 12px', background: 'rgba(0, 212, 170, 0.1)', borderRadius: 6 }}>
                                  <span style={{ fontSize: 12, color: '#00d4aa' }}>{stop.quickSummary}</span>
                                </div>
                              )}
                              {stop.suggestions?.length > 0 && (
                                <div className="amenities-row" style={{ marginTop: 8 }}>
                                  {stop.suggestions.map((s, i) => (
                                    <span key={i} className="amenity-badge">{s.place} ({s.walkingTime})</span>
                                  ))}
                                </div>
                              )}
                            </div>
                            <div className="trip-stop__duration">
                              <span className="trip-stop__duration-value">{stop.estimatedChargeTimeMin}m</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="route-dashboard">
                <div className="route-dashboard__header">
                  <h3 className="route-dashboard__title">Route Preview</h3>
                  <div className="route-dashboard__vehicle-badge">Ready</div>
                </div>
                <div className="trip-route-map trip-route-map--preview" style={{ minHeight: '400px', position: 'relative' }}>
                  {mapLoaded ? (
                    <div id="google-map-trip" style={{ width: '100%', height: '100%', borderRadius: 'var(--radius-lg)' }}></div>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: '#1A2840', color: 'white', borderRadius: 'var(--radius-lg)' }}>
                      <p>Loading Map...</p>
                    </div>
                  )}
                  <div className="map-preview-overlay" style={{ pointerEvents: 'none' }}>
                    <span className="material-symbols-outlined map-preview-overlay__icon">map</span>
                    <h4 className="map-preview-overlay__title">AI Trip Planner</h4>
                    <p className="map-preview-overlay__text">Enter origin, destination, and battery details to plan your route with AI-powered charging stops.</p>
                  </div>
                </div>
                <div className="route-dashboard__stats">
                  <div className="route-stat route-stat--centered">
                    <span className="route-stat__label">Status</span>
                    <span className="route-stat__value route-stat__value--muted">Awaiting inputs...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
