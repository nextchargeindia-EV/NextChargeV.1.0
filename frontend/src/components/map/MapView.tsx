import React, { useEffect, useRef, useState, useCallback } from 'react';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import { getGoogleMapsLoader } from '../../utils/mapsLoader';
import type { Station, UserLocation } from '../../types';
import { MAP_ZOOM } from '../../types';

interface MapViewProps {
  center: UserLocation;
  stations: Station[];
  selectedStationId: number | null;
  onStationSelect: (station: Station) => void;
  onMapReady?: (map: google.maps.Map) => void;
}

const MAP_STYLES: google.maps.MapTypeStyle[] = [
  { elementType: 'geometry', stylers: [{ color: '#0f172a' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#0f172a' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#64748b' }] },
  { featureType: 'administrative', elementType: 'geometry.stroke', stylers: [{ color: '#1e293b' }] },
  { featureType: 'landscape', elementType: 'geometry', stylers: [{ color: '#1e293b' }] },
  { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#1e293b' }] },
  { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#475569' }] },
  { featureType: 'poi.park', elementType: 'geometry.fill', stylers: [{ color: '#132a13' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#334155' }] },
  { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#1e293b' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#475569' }] },
  { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{ color: '#334155' }] },
  { featureType: 'transit', elementType: 'geometry', stylers: [{ color: '#1e293b' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0c1929' }] },
  { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#334155' }] },
];



export const MapView: React.FC<MapViewProps> = ({
  center,
  stations,
  selectedStationId,
  onStationSelect,
  onMapReady,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const clustererRef = useRef<MarkerClusterer | null>(null);
  const userMarkerRef = useRef<google.maps.Marker | null>(null);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    const loader = getGoogleMapsLoader();

    (loader as any).importLibrary('maps').then(() => {
      if (!mapRef.current) return;

      const map = new google.maps.Map(mapRef.current, {
        center: { lat: center.lat, lng: center.lng },
        zoom: MAP_ZOOM.CITY,
        styles: MAP_STYLES,
        disableDefaultUI: false,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        gestureHandling: 'greedy',
      });

      mapInstance.current = map;
      infoWindowRef.current = new google.maps.InfoWindow();
      setIsLoaded(true);
      onMapReady?.(map);
    }).catch((err: any) => {
      console.error('Google Maps failed to load:', err);
      setLoadError('Failed to load Google Maps. Please check your API key.');
    });

    return () => {
      if (mapInstance.current) {
        google.maps.event.clearInstanceListeners(mapInstance.current);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isLoaded || !mapInstance.current) return;

    if (userMarkerRef.current) {
      userMarkerRef.current.setPosition({ lat: center.lat, lng: center.lng });
    } else {
      userMarkerRef.current = new google.maps.Marker({
        position: { lat: center.lat, lng: center.lng },
        map: mapInstance.current,
        title: 'Your Location',
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: '#3B82F6',
          fillOpacity: 1,
          strokeColor: '#FFFFFF',
          strokeWeight: 3,
          scale: 8,
        },
        zIndex: 999,
      });
    }
  }, [center, isLoaded]);

  const buildInfoContent = useCallback((station: Station): string => {
    const connectorBadges = station.connectors
      .map(c => `<span style="display:inline-block;padding:2px 6px;background:rgba(255,255,255,0.1);border-radius:4px;font-size:10px;margin-right:4px;color:#e2e8f0">${c.type} ${c.powerKW}kW</span>`)
      .join('');

    return `
      <div style="font-family:'Inter',sans-serif;padding:8px 4px;max-width:260px;color:#f8fafc">
        <h4 style="margin:0 0 4px;font-size:14px;font-weight:700;color:#f8fafc">${station.name}</h4>
        <p style="margin:0 0 6px;font-size:11px;color:#94a3b8;line-height:1.3">${station.operator || 'Unknown Operator'}</p>
        <div style="margin-bottom:6px">${connectorBadges}</div>
        <div style="display:flex;justify-content:space-between;align-items:center;font-size:11px">
          <span style="display:flex;align-items:center;gap:4px">
            <span style="width:8px;height:8px;border-radius:50%;background:${station.isOperational ? '#22C55E' : '#EF4444'};display:inline-block"></span>
            <span style="color:${station.isOperational ? '#22C55E' : '#EF4444'};font-weight:600">${station.isOperational ? 'Operational' : 'Offline'}</span>
          </span>
          <span style="color:#94a3b8">${station.distanceKm ? station.distanceKm.toFixed(1) + ' km' : ''}</span>
        </div>
        <div style="margin-top:8px;display:flex;gap:6px">
          <a href="https://www.google.com/maps/dir/?api=1&destination=${station.lat},${station.lng}"
             target="_blank" rel="noopener noreferrer"
             style="flex:1;padding:6px 0;text-align:center;background:#FF6A22;color:white;border-radius:6px;font-size:11px;font-weight:600;text-decoration:none">
            Navigate
          </a>
        </div>
      </div>
    `;
  }, []);

  useEffect(() => {
    if (!isLoaded || !mapInstance.current) return;

    markersRef.current.forEach(m => m.setMap(null));
    markersRef.current = [];
    if (clustererRef.current) {
      clustererRef.current.clearMarkers();
    }

    const validStations = stations.filter(station => 
      typeof station.lat === 'number' && 
      typeof station.lng === 'number' && 
      !isNaN(station.lat) && 
      !isNaN(station.lng) &&
      station.lat !== 0 && 
      station.lng !== 0
    );

    const newMarkers = validStations.map(station => {
      const isSelected = station.placeId === selectedStationId;
      const color = station.isOperational ? '#22C55E' : '#EF4444';

      const marker = new google.maps.Marker({
        position: { lat: station.lat, lng: station.lng },
        title: station.name,
        icon: {
          path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
          fillColor: color,
          fillOpacity: 1,
          strokeColor: isSelected ? '#FFFFFF' : 'rgba(255,255,255,0.5)',
          strokeWeight: isSelected ? 2.5 : 1.5,
          scale: isSelected ? 1.6 : 1.3,
          anchor: new google.maps.Point(12, 22),
        },
        zIndex: isSelected ? 100 : 1,
      });

      marker.addListener('click', () => {
        onStationSelect(station);

        if (infoWindowRef.current && mapInstance.current) {
          infoWindowRef.current.setContent(buildInfoContent(station));
          infoWindowRef.current.open(mapInstance.current, marker);
          mapInstance.current.panTo({ lat: station.lat, lng: station.lng });
        }
      });

      return marker;
    });

    markersRef.current = newMarkers;

    if (newMarkers.length > 50) {
      clustererRef.current = new MarkerClusterer({
        map: mapInstance.current,
        markers: newMarkers,
      });
    } else {
      newMarkers.forEach(m => m.setMap(mapInstance.current!));
    }

    return () => {
      newMarkers.forEach(m => {
        google.maps.event.clearInstanceListeners(m);
        m.setMap(null);
      });
      if (clustererRef.current) {
        clustererRef.current.clearMarkers();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stations, selectedStationId, isLoaded]);

  useEffect(() => {
    if (mapInstance.current && isLoaded) {
      mapInstance.current.panTo({ lat: center.lat, lng: center.lng });
    }
  }, [center, isLoaded]);

  return (
    <div className="map-view" style={{ width: '100%', height: '100%', position: 'relative' }}>
      <div
        ref={mapRef}
        id="google-map"
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 'var(--radius-lg)',
          minHeight: '480px',
        }}
      />
      {!isLoaded && !loadError && (
        <div className="map-view__loading">
          <div className="map-view__loading-spinner" />
          <p>Loading Map...</p>
        </div>
      )}
      {loadError && (
        <div className="map-view__loading">
          <span className="material-symbols-outlined" style={{ fontSize: 40, color: '#EF4444' }}>error</span>
          <p style={{ color: '#EF4444', marginTop: 8 }}>{loadError}</p>
        </div>
      )}
    </div>
  );
};

export default MapView;
