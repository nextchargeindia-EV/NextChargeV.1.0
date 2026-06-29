import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export const ApiDocs: React.FC = () => {
  useEffect(() => { document.title = 'API Documentation — NextCharge | EV Charging API for Developers'; }, []);

  const endpoints = [
    { method: 'GET', path: '/api/v1/stations', desc: 'List all charging stations. Supports filtering by location, connector type, power, and availability status.' },
    { method: 'GET', path: '/api/v1/stations/:id', desc: 'Get detailed information about a specific station including chargers, pricing, and real-time availability.' },
    { method: 'GET', path: '/api/v1/stations/nearby', desc: 'Find stations near a given latitude/longitude within a specified radius. Returns sorted by distance.' },
    { method: 'POST', path: '/api/v1/auth/register', desc: 'Register a new user account. Requires name, email, phone, and password.' },
    { method: 'POST', path: '/api/v1/auth/login', desc: 'Authenticate a user and receive a JWT access token and refresh token.' },
    { method: 'POST', path: '/api/v1/bookings', desc: 'Create a new charging session booking. Requires station ID, charger ID, and payment method.' },
    { method: 'GET', path: '/api/v1/bookings', desc: 'List all bookings for the authenticated user. Supports pagination and date filtering.' },
    { method: 'PUT', path: '/api/v1/bookings/:id/stop', desc: 'Stop an active charging session. Finalizes billing and generates invoice.' },
    { method: 'POST', path: '/api/v1/payments/create-order', desc: 'Create a Razorpay payment order for a charging session.' },
    { method: 'POST', path: '/api/v1/payments/verify', desc: 'Verify a completed payment using Razorpay signature validation.' },
    { method: 'GET', path: '/api/v1/users/me', desc: 'Get the authenticated user\'s profile information.' },
    { method: 'DELETE', path: '/api/v1/users/me', desc: 'Delete the authenticated user\'s account and all associated data.' },
  ];

  return (
    <main>
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <p className="page-hero__eyebrow">{'</>'} Developer Preview — Coming Soon</p>
          <h1 className="page-hero__title">
            Build with the <span>NextCharge API</span>
          </h1>
          <p className="page-hero__subtitle">
            Our API is under active development. Register for early access and be the first to integrate NextCharge into your application.
          </p>
          <div style={{ marginTop: '32px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a href="#endpoints" className="btn btn--primary" style={{ padding: '14px 32px', fontSize: '14px', textDecoration: 'none' }}>
              View Endpoints
            </a>
            <a href="#auth" className="btn btn--outline" style={{ padding: '14px 32px', fontSize: '14px', textDecoration: 'none' }}>
              Authentication →
            </a>
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section className="page-section page-section--white">
        <div className="container">
          <div className="page-section__header">
            <p className="eyebrow">Getting Started</p>
            <h2>Quick start guide</h2>
          </div>
          <div className="grid-3" style={{ maxWidth: '900px', margin: '0 auto' }}>
            {[
              { num: '1', icon: 'key', title: 'Get API Key', desc: 'Sign up for an Enterprise account and generate your API key from the dashboard.' },
              { num: '2', icon: 'code', title: 'Make Your First Call', desc: 'Use your API key to authenticate and make your first request to our endpoints.' },
              { num: '3', icon: 'rocket_launch', title: 'Go Live', desc: 'Test in sandbox, then switch to production when you\'re ready to launch.' },
            ].map((s, i) => (
              <div className="info-card" key={i} style={{ textAlign: 'center' }}>
                <div className="info-card__icon info-card__icon--orange" style={{ margin: '0 auto 16px' }}>
                  <span className="material-symbols-outlined">{s.icon}</span>
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Authentication */}
      <section className="page-section page-section--gray" id="auth">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="page-section__header">
            <p className="eyebrow">Authentication</p>
            <h2>Bearer Token Auth</h2>
            <p>All API requests require authentication via Bearer token in the Authorization header.</p>
          </div>

          <div className="code-block">
            <code>
              <span className="comment">// Include your API key in all requests</span>{'\n'}
              <span className="keyword">const</span> response = <span className="keyword">await</span> fetch(<span className="string">'https://api.nextcharge.in/v1/stations'</span>, {'{\n'}
              {'  '}headers: {'{\n'}
              {'    '}<span className="string">'Authorization'</span>: <span className="string">'Bearer YOUR_API_KEY'</span>,{'\n'}
              {'    '}<span className="string">'Content-Type'</span>: <span className="string">'application/json'</span>{'\n'}
              {'  }\n'}
              {'}'});{'\n\n'}
              <span className="keyword">const</span> data = <span className="keyword">await</span> response.json();{'\n'}
              console.log(data);
            </code>
          </div>

          <div style={{ marginTop: '24px', padding: '16px 20px', background: 'rgba(255, 106, 34, 0.06)', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--color-orange-500)', fontSize: 'var(--text-body-sm)', color: 'var(--color-navy-900)' }}>
            <strong>Base URL:</strong> <code style={{ background: 'rgba(0,0,0,0.05)', padding: '2px 6px', borderRadius: '4px' }}>https://api.nextcharge.in/v1</code>
          </div>
        </div>
      </section>

      {/* Endpoints */}
      <section className="page-section page-section--white" id="endpoints">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="page-section__header">
            <p className="eyebrow">Reference</p>
            <h2>API Endpoints</h2>
            <p>Complete list of available REST API endpoints.</p>
          </div>

          {endpoints.map((ep, i) => (
            <div className="api-endpoint" key={i}>
              <div className="api-endpoint__header">
                <span className={`api-endpoint__method api-endpoint__method--${ep.method.toLowerCase()}`}>
                  {ep.method}
                </span>
                <span className="api-endpoint__path">{ep.path}</span>
              </div>
              <div className="api-endpoint__desc">{ep.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Rate Limits */}
      <section className="page-section page-section--gray">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="page-section__header">
            <p className="eyebrow">Rate Limits</p>
            <h2>Usage limits</h2>
          </div>
          <div className="grid-3">
            {[
              { plan: 'Free Tier', limit: '100 requests/min', desc: 'For development and testing' },
              { plan: 'Pro', limit: '1,000 requests/min', desc: 'For production applications' },
              { plan: 'Enterprise', limit: 'Custom', desc: 'Unlimited with SLA guarantee' },
            ].map((r, i) => (
              <div className="info-card" key={i} style={{ textAlign: 'center' }}>
                <h3 style={{ color: 'var(--color-orange-500)', fontSize: 'var(--text-body-xs)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>{r.plan}</h3>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-navy-900)', marginBottom: '4px' }}>{r.limit}</div>
                <p>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="page-cta">
        <div className="container">
          <h2>Interested in integrating?</h2>
          <p>Our API is under development. Register for early access and we'll notify you when it's ready.</p>
          <div className="btn-group">
            <Link to="/contact" className="btn btn--primary" style={{ padding: '14px 36px', fontSize: '14px', textDecoration: 'none' }}>
              Request API Access
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};
