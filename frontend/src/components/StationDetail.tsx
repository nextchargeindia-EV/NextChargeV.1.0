import React, { useEffect, useState } from 'react';
import type { Station, AmenitySuggestion } from '../types';
import { fetchAmenities } from '../utils/api';
import { estimateChargeTime } from '../utils/chargeTime';

interface StationDetailProps {
  station: Station;
  onClose: () => void;
}

export const StationDetail: React.FC<StationDetailProps> = ({
  station,
  onClose,
}) => {
  const [loadingAmenities, setLoadingAmenities] = useState(true);
  const [amenities, setAmenities] = useState<{
    quickSummary: string;
    suggestions: AmenitySuggestion[];
  } | null>(null);

  const chargeTime = station.connectors.length > 0
    ? estimateChargeTime(Math.max(...station.connectors.map(c => c.powerKW)))
    : 30;

  useEffect(() => {
    let cancelled = false;
    setLoadingAmenities(true);

    fetchAmenities(station.lat, station.lng, chargeTime, station.placeId, station.name)
      .then(data => {
        if (!cancelled) {
          setAmenities({
            quickSummary: data.quickSummary,
            suggestions: data.suggestions || [],
          });
          setLoadingAmenities(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setAmenities(null);
          setLoadingAmenities(false);
        }
      });

    return () => { cancelled = true; };
  }, [station.placeId, station.lat, station.lng, chargeTime]);

  const handleNavigate = () => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${station.lat},${station.lng}`,
      '_blank'
    );
  };

  const handleShare = async () => {
    const shareData = {
      title: station.name,
      text: `${station.name} — EV Charging Station on NextCharge`,
      url: `https://www.google.com/maps?q=${station.lat},${station.lng}`,
    };

    if (navigator.share) {
      try { await navigator.share(shareData); } catch { /* user cancelled */ }
    } else {
      await navigator.clipboard.writeText(shareData.url);
      alert('Link copied to clipboard!');
    }
  };

  const addressStr = [station.address, station.city, station.state].filter(Boolean).join(', ') || 'Address not available';

  return (
    <div className="station-detail" id="station-detail-panel">
      <button className="station-detail__close" onClick={onClose} aria-label="Close detail panel">
        <span className="material-symbols-outlined">close</span>
      </button>

      <div className="station-detail__header">
        <div className="station-detail__header-text">
          <h2 className="station-detail__name" id="detail-station-name">{station.name}</h2>
          <p className="station-detail__operator" id="detail-operator-name">
            {station.operator || 'Unknown Operator'}
          </p>
        </div>
      </div>

      <div className="station-detail__availability" id="detail-availability">
        <span
          className="station-detail__availability-dot"
          style={{ background: station.isOperational ? '#22C55E' : '#EF4444' }}
        />
        <span style={{ color: station.isOperational ? '#22C55E' : '#EF4444', fontWeight: 600 }}>
          {station.isOperational ? 'Operational' : 'Offline'}
        </span>
      </div>

      <div className="station-detail__section">
        <div className="station-detail__section-header">
          <span className="material-symbols-outlined">location_on</span>
          <span>Address</span>
        </div>
        <p className="station-detail__address" id="detail-address">{addressStr}</p>
      </div>

      <div className="station-detail__section">
        <div className="station-detail__section-header">
          <span className="material-symbols-outlined">ev_station</span>
          <span>Connectors</span>
        </div>
        <div className="station-detail__connectors" id="detail-connectors">
          {station.connectors.map((conn, i) => (
            <div key={i} className="station-detail__connector-card">
              <div className="station-detail__connector-type">
                <span className="station-detail__connector-name">{conn.type}</span>
              </div>
              <div className="station-detail__connector-meta">
                <span className="station-detail__connector-power">{conn.powerKW} kW</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="station-detail__section">
        <div className="station-detail__section-header">
          <span className="material-symbols-outlined">timer</span>
          <span>Estimated Charge Time</span>
        </div>
        <p className="station-detail__address">{chargeTime} min (15% → 80%, 40kWh battery)</p>
      </div>

      {loadingAmenities ? (
        <div className="station-detail__loading">
          <div className="station-detail__loading-pulse" />
          <div className="station-detail__loading-pulse station-detail__loading-pulse--short" />
        </div>
      ) : amenities ? (
        <div className="station-detail__section">
          <div className="station-detail__section-header">
            <span className="material-symbols-outlined">local_activity</span>
            <span>Things to Do While Charging</span>
          </div>
          {amenities.quickSummary && (
            <p className="station-detail__address" style={{ color: 'var(--color-orange-500)', fontWeight: 600, marginBottom: 8 }}>
              {amenities.quickSummary}
            </p>
          )}
          {amenities.suggestions.length > 0 ? (
            <div className="station-detail__amenities">
              {amenities.suggestions.map((s, i) => (
                <div key={i} className="station-detail__amenity-card" style={{
                  padding: '12px',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: 'var(--radius-sm)',
                  marginBottom: 8,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ fontSize: 14 }}>{s.place}</strong>
                    <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
                      {'★'.repeat(Math.round(s.rating))} {s.rating}
                    </span>
                  </div>
                  <p style={{ fontSize: 12, color: 'var(--color-text-tertiary)', margin: '4px 0' }}>
                    {s.activity} · {s.timeNeeded} · {s.walkingTime}
                  </p>
                  {s.tip && (
                    <p style={{ fontSize: 11, color: 'var(--color-orange-500)', margin: 0 }}>
                      💡 {s.tip}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="station-detail__address" style={{ color: 'var(--color-text-tertiary)' }}>
              No suggestions available for this area.
            </p>
          )}
        </div>
      ) : null}

      <div className="station-detail__actions" id="detail-actions">
        <button
          className="station-detail__action station-detail__action--primary"
          onClick={handleNavigate}
          id="btn-navigate"
        >
          <span className="material-symbols-outlined">directions</span>
          Navigate
        </button>
        <button
          className="station-detail__action station-detail__action--secondary"
          onClick={handleShare}
          id="btn-share"
        >
          <span className="material-symbols-outlined">share</span>
          Share
        </button>
      </div>
    </div>
  );
};

export default StationDetail;
