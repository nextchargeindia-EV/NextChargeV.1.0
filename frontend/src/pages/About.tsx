import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export const About: React.FC = () => {
  useEffect(() => { document.title = 'About Us — NextCharge | India\'s EV Charging Aggregator'; }, []);

  return (
    <main>
      {/* Hero */}
      <section className="page-hero page-hero--centered">
        <div className="container">
          <p className="page-hero__eyebrow">🌍 Our Story</p>
          <h1 className="page-hero__title">
            Simplifying EV charging for <span>every Indian driver</span>
          </h1>
          <p className="page-hero__subtitle">
            Born in Chhatrapati Sambhajinagar, Maharashtra — we're two passionate founders on a mission to make EV charging as simple as scanning a QR code.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="page-section page-section--white">
        <div className="container">
          <div className="grid-2" style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div className="info-card">
              <div className="info-card__icon info-card__icon--orange">
                <span className="material-symbols-outlined">flag</span>
              </div>
              <h3>Our Mission</h3>
              <p>To simplify India's EV charging experience by aggregating every charging station onto one intelligent platform — making charging accessible, transparent, and hassle-free for every electric vehicle driver.</p>
            </div>
            <div className="info-card">
              <div className="info-card__icon info-card__icon--green">
                <span className="material-symbols-outlined">visibility</span>
              </div>
              <h3>Our Vision</h3>
              <p>A future where finding and using any EV charger in India is as easy as scanning a QR code — no multiple apps, no confusion, no range anxiety. Just charge and go.</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem We're Solving */}
      <section className="page-section page-section--gray">
        <div className="container">
          <div className="page-section__header">
            <p className="eyebrow">The Problem</p>
            <h2>India's EV charging is fragmented</h2>
          </div>
          <div className="grid-3">
            {[
              { icon: 'apps', color: 'orange', title: '60+ Charging Apps', desc: 'Indian EV drivers are forced to download dozens of different apps — one for each charging network. This is unsustainable.' },
              { icon: 'signal_wifi_off', color: 'blue', title: 'No Live Status', desc: 'Most apps don\'t show real-time charger availability. Drivers arrive at stations only to find them offline, broken, or occupied.' },
              { icon: 'credit_card_off', color: 'green', title: 'Payment Chaos', desc: 'Each network has its own wallet, payment system, and pricing. There\'s no unified way to pay across all chargers.' },
            ].map((v, i) => (
              <div className="info-card" key={i}>
                <div className={`info-card__icon info-card__icon--${v.color}`}>
                  <span className="material-symbols-outlined">{v.icon}</span>
                </div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="page-section page-section--white">
        <div className="container">
          <div className="page-section__header">
            <p className="eyebrow">What Drives Us</p>
            <h2>Our core values</h2>
          </div>
          <div className="grid-4">
            {[
              { icon: 'bolt', color: 'orange', title: 'Innovation', desc: 'We\'re building chargers that work without an app — just scan a QR code, pay via UPI or card, and charge.' },
              { icon: 'handshake', color: 'blue', title: 'Transparency', desc: 'Live charger status, upfront pricing, and honest communication. No hidden fees, no surprises.' },
              { icon: 'eco', color: 'green', title: 'Sustainability', desc: 'Every decision we make is guided by its impact on the planet. More EVs on the road means a cleaner India.' },
              { icon: 'favorite', color: 'purple', title: 'User First', desc: 'We obsess over the driver\'s experience — from finding a charger to completing payment in seconds.' },
            ].map((v, i) => (
              <div className="info-card" key={i}>
                <div className={`info-card__icon info-card__icon--${v.color}`}>
                  <span className="material-symbols-outlined">{v.icon}</span>
                </div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders */}
      <section className="page-section page-section--gray">
        <div className="container">
          <div className="page-section__header">
            <p className="eyebrow">Meet the Founders</p>
            <h2>Built with passion from Maharashtra</h2>
          </div>
          <div className="grid-2" style={{ maxWidth: '700px', margin: '0 auto' }}>
            {[
              { name: 'Rushikesh B. Rathod', role: 'Co-Founder', desc: 'Passionate about technology and clean mobility. Leading product development, app engineering, and the vision for NextCharge.' },
              { name: 'Mangesh B. Mhaske', role: 'Co-Founder', desc: 'Driving business strategy, partnerships, and operations. Focused on building a sustainable EV charging ecosystem in India.' },
            ].map((founder, i) => (
              <div className="info-card" key={i} style={{ textAlign: 'center' }}>
                <div className="info-card__icon info-card__icon--orange" style={{ margin: '0 auto 16px', width: '56px', height: '56px', fontSize: '24px' }}>
                  <span className="material-symbols-outlined">person</span>
                </div>
                <h3>{founder.name}</h3>
                <p style={{ fontSize: 'var(--text-body-xs)', color: 'var(--color-orange-500)', fontWeight: 600, marginBottom: '8px' }}>{founder.role}</p>
                <p>{founder.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="page-section page-section--white">
        <div className="container">
          <div className="page-section__header">
            <p className="eyebrow">Our Roadmap</p>
            <h2>Building the future, step by step</h2>
          </div>
          <div className="timeline">
            {[
              { year: '2026 Q1', title: 'The Idea is Born', desc: 'Rushikesh and Mangesh identify the fragmented EV charging problem and begin building NextCharge in Chhatrapati Sambhajinagar.' },
              { year: '2026 Q2', title: 'Building in Public', desc: 'App and website development begins. Brand identity, UI/UX design, and backend architecture take shape.' },
              { year: '2026 Q3', title: 'Launch & Onboarding', desc: 'NextCharge app goes live. Onboarding first charging stations across Maharashtra and key Indian cities.' },
              { year: '2026 Q4', title: 'Growth & Funding', desc: 'Pitch to investors for pre-seed funding. Expand network coverage and onboard B2B partners.' },
              { year: '2027', title: 'NextCharge Hardware', desc: 'Launch our own branded chargers with QR code + UPI + ATM + RFID card payments — no app required.' },
            ].map((m, i) => (
              <div className="timeline-item" key={i}>
                <div className="timeline-item__year">{m.year}</div>
                <h3>{m.title}</h3>
                <p>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="page-cta">
        <div className="container">
          <h2>Want to be part of the journey?</h2>
          <p>We're looking for passionate people, partners, and early adopters who share our vision for a cleaner India.</p>
          <div className="btn-group">
            <Link to="/careers" className="btn btn--primary" style={{ padding: '14px 36px', fontSize: '14px', textDecoration: 'none' }}>
              Join the Team
            </Link>
            <Link to="/contact" className="btn btn--outline" style={{ padding: '14px 36px', fontSize: '14px', textDecoration: 'none' }}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};
