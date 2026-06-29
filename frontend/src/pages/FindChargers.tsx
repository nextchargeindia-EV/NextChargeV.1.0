import React, { useState, useEffect, useCallback } from 'react';
import { MapView } from '../components/map/MapView';
import { SearchBar } from '../components/SearchBar';
import { FilterPanel } from '../components/FilterPanel';
import { StationDetail } from '../components/StationDetail';
import { fetchNearbyStations } from '../utils/api';
import type { Station, UserLocation } from '../types';
import { MAP_ZOOM } from '../types';

const FALLBACK_CENTER: UserLocation = { lat: 19.0760, lng: 72.8777 }; // Mumbai - high charger density

export const FindChargers: React.FC = () => {
  const [center, setCenter] = useState<UserLocation>(FALLBACK_CENTER);
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);

  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchRadius] = useState(25);
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);

  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [operationalFilter, setOperationalFilter] = useState<boolean | null>(null);

  const displayedStations = operationalFilter
    ? stations.filter(s => s.isOperational)
    : stations;

  const loadStations = useCallback(async (lat: number, lng: number, radius = searchRadius) => {
    setLoading(true);
    try {
      const data = await fetchNearbyStations(lat, lng, radius);
      setStations(data);
    } catch {
      setStations([]);
    } finally {
      setLoading(false);
    }
  }, [searchRadius]);

  useEffect(() => {
    if (!navigator.geolocation) {
      loadStations(FALLBACK_CENTER.lat, FALLBACK_CENTER.lng);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = { lat: position.coords.latitude, lng: position.coords.longitude };
        setCenter(coords);
        loadStations(coords.lat, coords.lng);
      },
      (err) => {
        console.warn('Geolocation failed:', err.message);
        loadStations(FALLBACK_CENTER.lat, FALLBACK_CENTER.lng);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLocationSearch = useCallback((lat: number, lng: number, _placeName: string) => {
    const newCenter = { lat, lng };
    setCenter(newCenter);
    if (mapRef) {
      mapRef.panTo(newCenter);
      mapRef.setZoom(MAP_ZOOM.CITY);
    }
    loadStations(lat, lng);
  }, [mapRef, loadStations]);

  const handleStationSelect = useCallback((station: Station) => {
    setSelectedStation(station);
  }, []);

  const handleCloseDetail = useCallback(() => {
    setSelectedStation(null);
  }, []);

  const handleRecenter = useCallback(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = { lat: position.coords.latitude, lng: position.coords.longitude };
        setCenter(coords);
        if (mapRef) {
          mapRef.panTo(coords);
          mapRef.setZoom(MAP_ZOOM.CITY);
        }
        loadStations(coords.lat, coords.lng);
      },
      (err) => {
        console.warn('Geolocation failed:', err.message);
        setCenter(FALLBACK_CENTER);
        if (mapRef) {
          mapRef.panTo(FALLBACK_CENTER);
          mapRef.setZoom(MAP_ZOOM.CITY);
        }
        loadStations(FALLBACK_CENTER.lat, FALLBACK_CENTER.lng);
      }
    );
  }, [mapRef, loadStations]);

  return (
    <section className="find-chargers" id="find-chargers-page">
      <div className="container" style={{ position: 'relative' }}>
        <div className="find-chargers__header">
          <p className="eyebrow">All Networks, One Map</p>
          <h1 className="text-heading-xl" style={{ color: 'var(--color-navy-900)' }}>
            Find EV Charging Stations
          </h1>
        </div>

        <div className="find-chargers__layout">

          <div className={`find-chargers__sidebar ${viewMode === 'list' ? 'active-mobile' : 'hidden-mobile'}`}>
            <SearchBar
              onLocationSearch={handleLocationSearch}
              isLoading={loading}
            />

            <FilterPanel
              onOperationalFilter={setOperationalFilter}
            />

            <div className="find-chargers__count" id="station-count">
              {loading ? (
                <span>Searching stations...</span>
              ) : (
                <span><strong>{displayedStations.length}</strong> stations found</span>
              )}
            </div>

            <div className="station-list" id="station-list-container">
              {loading ? (
                <div className="station-list__loading">
                  {[1,2,3].map(i => (
                    <div key={i} className="station-card station-card--skeleton">
                      <div className="skeleton-line skeleton-line--title" />
                      <div className="skeleton-line skeleton-line--subtitle" />
                      <div className="skeleton-line skeleton-line--short" />
                    </div>
                  ))}
                </div>
              ) : displayedStations.length === 0 ? (
                <div className="station-list__empty">
                  <span className="material-symbols-outlined" style={{ fontSize: 48, color: 'var(--color-text-tertiary)' }}>
                    ev_station
                  </span>
                  <p>No stations found in this area.</p>
                  <p style={{ fontSize: 'var(--text-body-sm)', color: 'var(--color-text-tertiary)' }}>
                    Try a different location or adjust your filters.
                  </p>
                </div>
              ) : (
                displayedStations.map(station => {
                  const maxPower = station.connectors.length > 0
                    ? Math.max(...station.connectors.map(c => c.powerKW))
                    : 0;
                  const connectorTypes = [...new Set(station.connectors.map(c => c.type))];
                  const addressStr = [station.address, station.city].filter(Boolean).join(', ');

                  return (
                    <div
                      key={station.placeId}
                      className={`station-card ${selectedStation?.placeId === station.placeId ? 'station-card--active' : ''}`}
                      onClick={() => handleStationSelect(station)}
                      id={`station-card-${station.placeId}`}
                    >
                      <div className="station-card__header">
                        <div>
                          <div className="station-card__status-row">
                            <span className="station-card__availability" style={{ color: station.isOperational ? '#22C55E' : '#EF4444' }}>
                              <span className="station-card__availability-dot" style={{ background: station.isOperational ? '#22C55E' : '#EF4444' }} />
                              {station.isOperational ? 'Operational' : 'Offline'}
                            </span>
                            {station.distanceKm != null && (
                              <span className="station-card__distance">{station.distanceKm.toFixed(1)} km</span>
                            )}
                          </div>
                          <h4 className="station-card__name">{station.name}</h4>
                          <p className="station-card__operator">{station.operator || 'Unknown Operator'}</p>
                        </div>
                      </div>

                      <div className="station-card__details">
                        <div className="station-card__connector-badges">
                          {connectorTypes.map(type => (
                            <span key={type} className="station-card__badge">{type}</span>
                          ))}
                          <span className="station-card__badge station-card__badge--power">{maxPower} kW</span>
                        </div>
                        {addressStr && (
                          <p className="station-card__address">{addressStr}</p>
                        )}
                      </div>

                      <div className="station-card__footer">
                        <button
                          className="station-card__details-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStationSelect(station);
                          }}
                        >
                          Details
                          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className={`find-chargers__map ${viewMode === 'map' ? 'active-mobile' : 'hidden-mobile'}`}>
            <MapView
              center={center}
              stations={displayedStations}
              selectedStationId={selectedStation?.placeId ?? null}
              onStationSelect={handleStationSelect}
              onMapReady={(map) => setMapRef(map)}
            />

            <button
              className="find-chargers__recenter"
              onClick={handleRecenter}
              aria-label="Re-center to your location"
              id="btn-recenter"
              title="My Location"
            >
              <span className="material-symbols-outlined">my_location</span>
            </button>
          </div>

          {selectedStation && (
            <div className="find-chargers__detail-overlay" onClick={handleCloseDetail}>
              <div className="find-chargers__detail-panel" onClick={e => e.stopPropagation()}>
                <StationDetail
                  station={selectedStation}
                  onClose={handleCloseDetail}
                />
              </div>
            </div>
          )}
        </div>

        <button
          className="mobile-view-toggle"
          onClick={() => setViewMode(viewMode === 'list' ? 'map' : 'list')}
          id="btn-toggle-view"
        >
          <span className="material-symbols-outlined">
            {viewMode === 'list' ? 'map' : 'format_list_bulleted'}
          </span>
          {viewMode === 'list' ? 'Show Map' : 'Show List'}
        </button>
      </div>
    </section>
  );
};
