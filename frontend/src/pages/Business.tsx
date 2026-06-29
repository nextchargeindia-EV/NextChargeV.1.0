import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export const Business: React.FC = () => {
  useEffect(() => { document.title = 'For Business — NextCharge | EV Charging Partnership India'; }, []);

  return (
    <main>
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <p className="page-hero__eyebrow">⚡ NextCharge for Business</p>
          <h1 className="page-hero__title">
            Partner with India's <span>smartest EV charging platform</span>
          </h1>
          <p className="page-hero__subtitle">
            List your chargers on our aggregator, sell home chargers, manage fleet charging, or deploy NextCharge-branded stations at your location.
          </p>
          <div style={{ marginTop: '32px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn--primary" style={{ padding: '14px 32px', fontSize: '14px', textDecoration: 'none' }}>
              Become a Partner →
            </Link>
            <Link to="/pricing" className="btn btn--outline" style={{ padding: '14px 32px', fontSize: '14px', textDecoration: 'none' }}>
              View Plans
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="page-section page-section--white">
        <div className="container">
          <div className="page-section__header">
            <p className="eyebrow">Why Partner With NextCharge</p>
            <h2>Grow your EV business with us</h2>
          </div>
          <div className="grid-4">
            {[
              { icon: 'location_on', color: 'orange', title: 'List Your Chargers', desc: 'Get your charging stations discovered by thousands of EV drivers across India through our aggregator platform.' },
              { icon: 'home', color: 'blue', title: 'Sell Home Chargers', desc: 'Partner with us to distribute and sell home EV charging solutions. Earn revenue through our reseller program.' },
              { icon: 'analytics', color: 'green', title: 'Smart Dashboard', desc: 'Monitor your charger visibility, driver engagement, and performance metrics through our intuitive partner dashboard.' },
              { icon: 'support_agent', color: 'purple', title: 'Dedicated Support', desc: 'Get onboarding assistance, technical support, and a dedicated partner success manager for your business.' },
            ].map((b, i) => (
              <div className="info-card" key={i}>
                <div className={`info-card__icon info-card__icon--${b.color}`}>
                  <span className="material-symbols-outlined">{b.icon}</span>
                </div>
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="page-section page-section--gray">
        <div className="container">
          <div className="page-section__header">
            <p className="eyebrow">How It Works</p>
            <h2>Get started in 4 simple steps</h2>
          </div>
          <div className="steps-grid">
            {[
              { num: '1', title: 'Reach Out', desc: 'Fill out our partner inquiry form or email us at nextchargeindia@gmail.com.' },
              { num: '2', title: 'Onboarding', desc: 'Our team helps you list your chargers or set up your home charger reseller account.' },
              { num: '3', title: 'Go Live', desc: 'Your chargers appear on the NextCharge platform, visible to EV drivers across India.' },
              { num: '4', title: 'Grow Together', desc: 'Track performance, earn revenue, and scale your EV business with our support.' },
            ].map((s, i) => (
              <div className="step-card" key={i}>
                <div className="step-card__number">{s.num}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="page-section page-section--white">
        <div className="container">
          <div className="page-section__header">
            <p className="eyebrow">Solutions For</p>
            <h2>Every type of EV business</h2>
          </div>
          <div className="grid-3">
            {[
              { icon: 'ev_station', title: 'Charging Station Operators', desc: 'List your stations on NextCharge and reach more drivers. We handle discovery, you handle charging.' },
              { icon: 'home', title: 'Home Charger Resellers', desc: 'Sell home charging units through our platform. We provide the brand, marketing, and customer reach.' },
              { icon: 'directions_car', title: 'Fleet Operators', desc: 'Manage charging for your entire fleet across any network. One dashboard, all chargers, complete visibility.' },
              { icon: 'apartment', title: 'Commercial Real Estate', desc: 'Add EV charging as a premium amenity for malls, offices, and residential complexes.' },
              { icon: 'hotel', title: 'Hotels & Hospitality', desc: 'Attract eco-conscious guests by offering EV charging. Listed on NextCharge for maximum visibility.' },
              { icon: 'domain', title: 'Government & Municipal', desc: 'Partner with us for public charging infrastructure in smart cities and green mobility initiatives.' },
            ].map((c, i) => (
              <div className="info-card" key={i}>
                <div className="info-card__icon info-card__icon--navy">
                  <span className="material-symbols-outlined">{c.icon}</span>
                </div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Vision */}
      <section className="page-section page-section--gray">
        <div className="container">
          <div className="page-section__header">
            <p className="eyebrow">Coming Soon</p>
            <h2>NextCharge-branded chargers</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
              We're developing our own EV chargers that will be radically different — customers can charge without any app. Just scan a QR code, pay via UPI or ATM card, and start charging. RFID cards with loyalty benefits will also be available.
            </p>
          </div>
          <div className="grid-3" style={{ maxWidth: '900px', margin: '0 auto' }}>
            {[
              { icon: 'qr_code_2', title: 'QR Code Payments', desc: 'No app download needed. Scan, pay via UPI, and charge instantly.' },
              { icon: 'credit_card', title: 'ATM Card Support', desc: 'Swipe your debit or credit card directly at the charger.' },
              { icon: 'contactless', title: 'RFID Loyalty Card', desc: 'Tap your NextCharge RFID card for instant charging with exclusive benefits.' },
            ].map((f, i) => (
              <div className="info-card" key={i} style={{ textAlign: 'center' }}>
                <div className="info-card__icon info-card__icon--orange" style={{ margin: '0 auto 16px' }}>
                  <span className="material-symbols-outlined">{f.icon}</span>
                </div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="page-cta">
        <div className="container">
          <h2>Ready to grow your EV business?</h2>
          <p>Let's discuss the perfect partnership model for your needs.</p>
          <div className="btn-group">
            <Link to="/contact" className="btn btn--primary" style={{ padding: '14px 36px', fontSize: '14px', textDecoration: 'none' }}>
              Contact Us →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};
