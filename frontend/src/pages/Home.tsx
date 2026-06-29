import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchNearbyStations } from '../utils/api';
import { MapView } from '../components/map/MapView';
import type { UserLocation } from '../types';

const FALLBACK_CENTER: UserLocation = { lat: 19.0760, lng: 72.8777 };

export const Home: React.FC = () => {
  const [stations, setStations] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [loading, setLoading] = useState(true);
  const [selectedCharger, setSelectedCharger] = useState<any | null>(null);
  const [locationLabel, setLocationLabel] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStations = async (lat: number, lng: number) => {
      try {
        const data = await fetchNearbyStations(lat, lng, 25);

        const mapped = data.map((st: any) => {
          const hasDC = st.connectors?.some((c: any) =>
            ['CCS', 'CHAdeMO', 'GBT', 'Tesla'].some(t => (c.type || '').toLowerCase().includes(t.toLowerCase()))
          );
          const maxPower = st.connectors?.length > 0
            ? Math.max(...st.connectors.map((c: any) => c.powerKW || 0))
            : 22;
          const addressStr = [st.address, st.city, st.state].filter(Boolean).join(', ') || 'Unknown area';

          return {
            id: `google_${st.placeId}`,
            placeId: st.placeId,
            name: st.name,
            location: addressStr,
            lat: st.lat,
            lng: st.lng,
            status: st.isOperational ? 'Available' : 'Busy',
            power: maxPower,
            price: 18,
            rating: st.rating || 4.5,
            type: hasDC ? 'DC Fast' : 'AC'
          };
        });

        setStations(mapped);
        setError(null);
        if (mapped.length > 0) setSelectedCharger(mapped[0]);
        else setSelectedCharger(null);
      } catch (err) {
        console.error('Failed to fetch nearby stations:', err);
        setStations([]);
        setSelectedCharger(null);
        setError('Unable to load charging stations. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    // Use geolocation to find nearby chargers
    const FALLBACK_LAT = 19.0760; // Mumbai - high charger density
    const FALLBACK_LNG = 72.8777;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationLabel('Near You');
          loadStations(position.coords.latitude, position.coords.longitude);
        },
        (err) => {
          // Geolocation denied/unavailable — fallback to Mumbai (high charger density)
          console.warn('Geolocation failed:', err.message);
          setLocationLabel('Popular Stations (Mumbai)');
          loadStations(FALLBACK_LAT, FALLBACK_LNG);
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      setLocationLabel('Popular Stations (Mumbai)');
      loadStations(FALLBACK_LAT, FALLBACK_LNG);
    }
  }, []);

  const filteredStations = stations.filter(st => {
    const cleanSearch = search.toLowerCase().trim();
    const searchMatch = !cleanSearch ||
      st.name.toLowerCase().includes(cleanSearch) ||
      st.location.toLowerCase().includes(cleanSearch);
    const typeMatch = filterType === 'All' || st.type === filterType;
    const statusMatch = filterStatus === 'All' || st.status === filterStatus;
    return searchMatch && typeMatch && statusMatch;
  });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <section className="hero" id="hero">
        <div className="hero__container">
          <div className="hero__grid">
            <div className="hero-content">
              <div className="badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#F97316">
                  <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" />
                </svg>
                <span>India's Smartest EV Charging Aggregator</span>
              </div>

              <h1 className="headline">
                <span className="line-white">Charge Smarter.</span>
                <span className="line-orange">Drive Further.</span>
              </h1>

              <p className="body-text">
                NextCharge brings every EV charging station in India onto one platform — with live availability, real-time status, and seamless payments. No more juggling multiple apps.
              </p>

              <div className="cta-group">
                <Link to="/find-chargers" className="btn-primary" style={{ textDecoration: 'none' }}>
                  Find Chargers
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
                <a href="#app" className="btn-secondary" style={{ textDecoration: 'none' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                    <line x1="12" y1="18" x2="12.01" y2="18" />
                  </svg>
                  Get the App
                </a>
              </div>

              <div className="stats-row">
                <div className="stat">
                  <svg className="stat-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="1.8">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <div className="stat-text">
                    <span className="stat-label">All Networks</span>
                    <span className="stat-sub">One Platform</span>
                  </div>
                </div>
                <div className="stat-divider"></div>
                <div className="stat">
                  <svg className="stat-icon" width="20" height="20" viewBox="0 0 24 24" fill="#F97316">
                    <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" />
                  </svg>
                  <div className="stat-text">
                    <span className="stat-label">Live Status</span>
                    <span className="stat-sub">Real-time Availability</span>
                  </div>
                </div>
                <div className="stat-divider"></div>
                <div className="stat">
                  <svg className="stat-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="1.8">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                    <line x1="1" y1="10" x2="23" y2="10" />
                  </svg>
                  <div className="stat-text">
                    <span className="stat-label">QR + UPI Payments</span>
                    <span className="stat-sub">Coming Soon</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="hero__visual">
              <img src="/assets/hero-bg.jpg" alt="EV Charging Station in India — NextCharge Aggregator" className="hero__vehicle" />
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '48px 0', background: 'var(--color-white)' }}>
        <div className="container">
          <p style={{ textAlign: 'center', fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '32px' }}>
            Aggregating chargers from India's leading EV charging networks
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '40px', opacity: 0.6 }}>
            {['Tata Power', 'Statiq', 'ChargeZone', 'Ather Grid', 'Jio-bp', 'Bolt.Earth'].map((name) => (
              <span key={name} style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-navy-900)', letterSpacing: '0.03em', padding: '8px 20px', border: '1.5px solid var(--color-border-card)', borderRadius: 'var(--radius-button)' }}>
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="features" id="features">
        <div className="container">
          <div className="features__header reveal-on-scroll">
            <p className="eyebrow">Why NextCharge</p>
            <h2 className="text-heading-xl" style={{ color: 'var(--color-navy-900)' }}>
              Every charger in India.<br />One powerful app.
            </h2>
          </div>
          <div className="features__grid">
            <div className="feature-card reveal-on-scroll">
              <div className="feature-card__icon feature-card__icon--orange">
                <span className="material-symbols-outlined">location_on</span>
              </div>
              <h3 className="feature-card__title" style={{ fontSize: '18px' }}>Find Every Charger</h3>
              <p className="feature-card__body">Discover charging stations from every network on a single map — Tata Power, Statiq, ChargeZone, and more.</p>
            </div>
            <div className="feature-card reveal-on-scroll" style={{ transitionDelay: '100ms' }}>
              <div className="feature-card__icon feature-card__icon--green">
                <span className="material-symbols-outlined">bolt</span>
              </div>
              <h3 className="feature-card__title" style={{ fontSize: '18px' }}>Live Availability</h3>
              <p className="feature-card__body">See real-time status for every charger — available, occupied, or offline. No more wasted trips to broken stations.</p>
            </div>
            <div className="feature-card reveal-on-scroll" style={{ transitionDelay: '200ms' }}>
              <div className="feature-card__icon feature-card__icon--blue">
                <span className="material-symbols-outlined">payments</span>
              </div>
              <h3 className="feature-card__title" style={{ fontSize: '18px' }}>Seamless Payments</h3>
              <p className="feature-card__body">Pay via UPI, QR code, cards, or RFID — all from one app. No need for separate wallets or accounts.</p>
            </div>
            <div className="feature-card reveal-on-scroll" style={{ transitionDelay: '300ms' }}>
              <div className="feature-card__icon feature-card__icon--green">
                <span className="material-symbols-outlined">eco</span>
              </div>
              <h3 className="feature-card__title" style={{ fontSize: '18px' }}>Drive Green, Live Clean</h3>
              <p className="feature-card__body">Every charge you take contributes to a cleaner India. Track your carbon savings and be part of the EV revolution.</p>
            </div>
          </div>
          <div className="features__explore">
            <a href="#" className="features__explore-btn">
              Explore All Features
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '16px', height: '16px' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <section className="home-charger-preview" id="home-chargers">
        <div className="container">
          <div className="home-charger-header reveal-on-scroll">
            <p className="eyebrow">Aggregated live network</p>
            <h2 className="text-heading-xl" style={{ color: 'var(--color-navy-900)' }}>
              Find Charging Stations Near You
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '15px', marginTop: '8px', maxWidth: '600px' }}>
              {locationLabel ? `${locationLabel} — ` : ''}Explore EV chargers in our unified network. Type in a location name or filter by connector type and availability.
            </p>
          </div>

          <div className="home-charger-layout">
            <div className="home-charger-list-container reveal-on-scroll" style={{ transitionDelay: '100ms' }}>
              <div className="home-filter-bar">
                <input
                  type="text"
                  placeholder="Search location or name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <div className="home-filter-row">
                  <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                    <option value="All">All Connectors</option>
                    <option value="DC Fast">DC Fast</option>
                    <option value="AC">AC Charging</option>
                  </select>
                  <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                    <option value="All">All Status</option>
                    <option value="Available">Available</option>
                    <option value="Busy">Busy</option>
                  </select>
                </div>
              </div>

              <div className="home-charger-list">
                {loading ? (
                  <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', padding: '24px 0' }}>
                    Loading chargers...
                  </p>
                ) : error ? (
                  <p style={{ textAlign: 'center', color: 'var(--color-error)', padding: '24px 0' }}>
                    {error}
                  </p>
                ) : filteredStations.length === 0 ? (
                  <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', padding: '24px 0' }}>
                    No chargers found matching filters.
                  </p>
                ) : (
                  filteredStations.slice(0, 4).map(c => (
                    <div
                      key={c.id}
                      className={`station-card ${selectedCharger?.id === c.id ? 'active' : ''}`}
                      onClick={() => setSelectedCharger(c)}
                      style={{ display: 'block' }}
                    >
                      <div className="station-card__header">
                        <div>
                          <div className="station-card__status">
                            <span className={`station-card__status-text ${c.status === 'Available' ? 'station-card__status-text--available' : 'station-card__status-text--busy'}`}>
                              {c.status}
                            </span>
                            <span className="station-card__distance">{c.power} kW</span>
                          </div>
                          <h4 className="station-card__name">{c.name}</h4>
                          <div className="station-card__rating">
                            <span className="material-symbols-outlined" style={{ fontSize: '14px', color: 'var(--color-orange-500)', fontVariationSettings: "'FILL' 1" }}>star</span>
                            <span className="station-card__rating-value">{c.rating}</span>
                          </div>
                        </div>
                        <div className="station-card__navigate">
                          <span className="material-symbols-outlined">directions_car</span>
                        </div>
                      </div>
                      <div className="station-card__details">
                        <div>
                          <span className="station-card__detail-label">Location</span>
                          <span className="station-card__detail-value" style={{ display: 'block' }}>{c.location}</span>
                        </div>
                        <span className="station-card__price">₹{(c.price ?? 0).toFixed(2)}/kWh</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="home-charger-map reveal-on-scroll" style={{ transitionDelay: '200ms' }}>
              <MapView
                center={filteredStations.length > 0 
                  ? { lat: filteredStations[0].lat, lng: filteredStations[0].lng } 
                  : FALLBACK_CENTER}
                stations={filteredStations.slice(0, 20)}
                selectedStationId={selectedCharger?.placeId ?? null}
                onStationSelect={setSelectedCharger}
              />
            </div>
          </div>

          <div className="home-charger-explore reveal-on-scroll" style={{ transitionDelay: '300ms' }}>
            <Link to="/find-chargers" className="home-charger-explore-btn">
              Explore Interactive Map
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '18px', height: '18px' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="showcase-section" id="app">
        <div className="container">
          <div className="showcase-card">
            <div className="app-showcase">
              <div className="hero-left">
                <div className="app-label">NEXTCHARGE APP</div>
                <h2 className="heading">Your EV journey,<br />all in one app.</h2>
                <p className="subtext">Search. Compare. Charge. Pay.<br />All from the NextCharge app.</p>
                <div className="store-buttons">
                  <a className="btn-store" href="#">
                    <svg viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    <div className="btn-store-text">
                      <span className="btn-store-top">Download on the</span>
                      <span className="btn-store-bottom">App Store</span>
                    </div>
                  </a>
                  <a className="btn-store" href="#">
                    <svg viewBox="0 0 24 24">
                      <path d="M3 20.5v-17c0-.83.94-1.3 1.6-.8l14 8.5c.6.37.6 1.23 0 1.6l-14 8.5c-.66.5-1.6.03-1.6-.8z" />
                    </svg>
                    <div className="btn-store-text">
                      <span className="btn-store-top">GET IT ON</span>
                      <span className="btn-store-bottom">Google Play</span>
                    </div>
                  </a>
                </div>
              </div>
              <div className="hero-right">
                <div className="card-battery">
                  <div className="battery-header">
                    <span className="battery-title">Battery Level</span>
                    <svg className="battery-icon" viewBox="0 0 24 24">
                      <path d="M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
                    </svg>
                  </div>
                  <div className="battery-value">80%</div>
                  <div className="battery-progress">
                    <div className="battery-progress-fill" style={{ width: '80%' }}></div>
                  </div>
                  <div className="battery-footer">
                    <span>Range </span><span className="battery-range">320 km</span>
                  </div>
                </div>
                <img src="/assets/Mobile-showcase.png" alt="NextCharge App — EV Charging Aggregator India" className="phone-image" />
              </div>
            </div>
            <div className="stats-bar">
              <div className="stat-item">
                <div className="stat-icon" style={{ background: 'var(--orange)' }}>
                  <svg viewBox="0 0 24 24">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" fill="none" stroke="white" strokeWidth="2" />
                  </svg>
                </div>
                <div className="stat-text">
                  <span className="stat-number">Every Network</span>
                  <span className="stat-label">One App</span>
                </div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-icon" style={{ background: 'var(--green)' }}>
                  <svg viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                  </svg>
                </div>
                <div className="stat-text">
                  <span className="stat-number">Live Status</span>
                  <span className="stat-label">Real-time Updates</span>
                </div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-icon" style={{ background: 'var(--amber)' }}>
                  <svg viewBox="0 0 24 24">
                    <path d="M7 2v11h3v9l7-12h-4l4-8z" />
                  </svg>
                </div>
                <div className="stat-text">
                  <span className="stat-number">Zero Range Anxiety</span>
                  <span className="stat-label">Always Find a Charger</span>
                </div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-icon" style={{ background: 'var(--green)' }}>
                  <svg viewBox="0 0 24 24">
                    <path d="M17 8C8 10 5.9 16.17 3.82 21c-.2.5.27.99.79.79C7.53 20.47 15 17 17 8zm-1 4.77-1.37 1.37c-.79-1.02-1.84-1.99-3.18-2.81C12.41 10.5 14.82 9.63 16 13.77zM8.81 15.62c.23-.77.58-1.55 1.07-2.33.82 1.34 1.79 2.39 2.81 3.18L11.32 17.8c-1.12-.73-1.9-1.56-2.51-2.18z" />
                  </svg>
                </div>
                <div className="stat-text">
                  <span className="stat-number">Drive Green</span>
                  <span className="stat-label">Track Carbon Savings</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials" id="testimonials" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          <div className="testimonials__header reveal-on-scroll">
            <p className="eyebrow">Be the First</p>
            <h2 className="text-heading-xl" style={{ color: 'var(--color-navy-900)' }}>Get early access to NextCharge</h2>
          </div>
          <div className="testimonials__grid">
            <div className="review-card reveal-on-scroll">
              <div className="review-card__stars">
                <span className="material-symbols-outlined" style={{ fontSize: '32px', color: 'var(--color-orange-500)' }}>smartphone</span>
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-navy-900)', margin: '16px 0 8px' }}>Download the App</h3>
              <p className="review-card__quote">Be among the first EV drivers in India to experience one-app charging across all networks. Early users get exclusive benefits.</p>
            </div>
            <div className="review-card reveal-on-scroll" style={{ transitionDelay: '100ms' }}>
              <div className="review-card__stars">
                <span className="material-symbols-outlined" style={{ fontSize: '32px', color: 'var(--color-orange-500)' }}>star</span>
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-navy-900)', margin: '16px 0 8px' }}>Exclusive Early Benefits</h3>
              <p className="review-card__quote">Early adopters will receive priority access to our premium features, RFID cards, and special discounts from our Rescue Charging service.</p>
            </div>
            <div className="review-card reveal-on-scroll" style={{ transitionDelay: '200ms' }}>
              <div className="review-card__stars">
                <span className="material-symbols-outlined" style={{ fontSize: '32px', color: 'var(--color-orange-500)' }}>group</span>
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-navy-900)', margin: '16px 0 8px' }}>Shape the Product</h3>
              <p className="review-card__quote">Your feedback will directly influence the features we build. Help us create the charging app that India's EV drivers truly deserve.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="blog-section" id="blog" style={{ background: 'var(--color-offwhite)' }}>
        <div className="container">
          <div className="blog-section__header reveal-on-scroll">
            <div>
              <p className="eyebrow">From the blog</p>
              <h2 className="text-heading-lg" style={{ color: 'var(--color-navy-900)' }}>Insights, updates and more.</h2>
            </div>
            <Link to="/blog" className="blog-section__view-all" style={{ textDecoration: 'none' }}>View all articles →</Link>
          </div>
          <div className="blog-section__grid">
            <div className="blog-card reveal-on-scroll">
              <div className="blog-card__image-wrapper">
                <img className="blog-card__image" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrkM-PDLy8Ldfmhzm-RMCa_FOKPO0-fpTFpw5soi0D0Adckcqa2fByqQlz01zPI2U5FtNwaV6m2rWqWcMtkXC7nrMwWhCk52vYObF0Hys8AQI1AUPxW6mTqPCE4VaSOqRyNiSnyRZLx5h7a2TD8kZgzUP8dmWRsTbKOb9AYkVqtedrVjyBJmpMt4xrPX7Pof-3MgDjiksa7j6tvqilpWH9-kSCYTU-8SauuCwHFq5_mHRN2o0wIPsvlgISELQDdGC1gR5DL0POXw" alt="Why India needs an EV charging aggregator" />
                <span className="blog-card__category">Industry</span>
              </div>
              <h3 className="blog-card__title">Why India Needs an EV Charging Aggregator in 2026</h3>
              <p className="blog-card__excerpt">With 60+ charging networks and fragmented apps, Indian EV drivers deserve a unified platform.</p>
              <div className="blog-card__meta">
                <span>June 10, 2026</span>
                <span className="blog-card__meta-dot"></span>
                <span>5 min read</span>
              </div>
            </div>
            <div className="blog-card reveal-on-scroll" style={{ transitionDelay: '100ms' }}>
              <div className="blog-card__image-wrapper">
                <img className="blog-card__image" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6PG_QOrsFYoeaCz5TaDVpmlq4GOtVKl68AoIorgYmsibvuBY0rtCaM-_MtLall8itgCdUsifhQmPP7yLuVvWdZ5hmrucLVbPAX7KzXtsXU1Hheg-_Hu3acD-ox7GssduOrWgNoUQn0VWgk09_uuKTHqgdZw687Qosw6O025Y9Db9P_htU_XTBFaz9GdOzGp_y8zIRNSTUsDwmL8cIC3QUxvzQUPYV5UbQqli1Q_Uw86xdmpDbWnpRsXS8uSQaCc0jWdH_oO8rMQ" alt="How NextCharge solves EV charging fragmentation" />
                <span className="blog-card__category">Product</span>
              </div>
              <h3 className="blog-card__title">How NextCharge Solves India's Fragmented EV Charging Problem</h3>
              <p className="blog-card__excerpt">One app, every charger, live status — here's how we're building a better charging experience.</p>
              <div className="blog-card__meta">
                <span>June 5, 2026</span>
                <span className="blog-card__meta-dot"></span>
                <span>4 min read</span>
              </div>
            </div>
            <div className="blog-card reveal-on-scroll" style={{ transitionDelay: '200ms' }}>
              <div className="blog-card__image-wrapper">
                <img className="blog-card__image" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKgX1gKgEXDdmvAfrEBq2XKhOybnCsaWQkSQ3_zgNuZpwsOxd7IytMlKs5LEeCRVuer-87vD7e_qyyzLg_EtNwRH7qPnU8bOXHHsqYXllqV2-wr02JYq3tfB42ELr097b9i-EI6IgMdnFLwVx8LFY3vZYUKwOFKa8XEHnDJq8Tdrzu9m7__-GRqCSmQ1Tr_5axfr5-WKZh6-3721UBZD7L8LR-0QnijBJCytLEEyom9mzlyjxORD3RA9AFtRwWFpOjZgAyHmNCNA" alt="EV charging guide for beginners India" />
                <span className="blog-card__category">Guide</span>
              </div>
              <h3 className="blog-card__title">EV Charging 101: A Complete Guide for Indian EV Owners</h3>
              <p className="blog-card__excerpt">From connector types to billing — everything a new EV owner needs to know about charging in India.</p>
              <div className="blog-card__meta">
                <span>June 1, 2026</span>
                <span className="blog-card__meta-dot"></span>
                <span>6 min read</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-banner" id="cta">
        <div className="container">
          <div className="cta-banner__inner">
            <div className="cta-banner__content">
              <div className="cta-banner__icon">
                <img src="/assets/logo.png" alt="NextCharge Logo" style={{ width: '28px', height: 'auto' }} />
              </div>
              <div>
                <h3 className="cta-banner__title">Ready to charge smarter?</h3>
                <p className="cta-banner__subtitle">Join the waitlist and be the first to experience NextCharge.</p>
              </div>
            </div>
            <div className="cta-banner__actions">
              <Link to="/contact" className="btn btn--primary" style={{ padding: '12px 32px', fontSize: '14px', textDecoration: 'none' }}>
                Join the Waitlist
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '16px', height: '16px' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link to="/contact" className="btn btn--outline" style={{ padding: '12px 32px', fontSize: '14px', textDecoration: 'none' }}>
                Contact Us
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '16px', height: '16px' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
