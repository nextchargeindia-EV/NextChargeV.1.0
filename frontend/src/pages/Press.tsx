import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export const Press: React.FC = () => {
  useEffect(() => { document.title = 'Press & Media — NextCharge | EV Charging Startup India'; }, []);

  const pressReleases = [
    { date: 'June 2026', title: 'NextCharge Launches: India\'s New EV Charging Aggregator Platform', excerpt: 'NextCharge brings every EV charging station in India onto one platform with live availability, real-time status, and unified payments — solving the fragmentation problem for millions of EV drivers.' },
    { date: 'June 2026', title: 'Two Young Entrepreneurs from Maharashtra Are Building the Future of EV Charging', excerpt: 'Rushikesh Rathod and Mangesh Mhaske, based in Chhatrapati Sambhajinagar, are on a mission to simplify EV charging across India with their startup NextCharge.' },
    { date: 'Coming Soon', title: 'NextCharge App Goes Live on Google Play and App Store', excerpt: 'The NextCharge app will be available for download soon, enabling Indian EV drivers to find, compare, and use any charging station from a single app.' },
    { date: 'Coming Soon', title: 'NextCharge Announces Plans for App-Free EV Chargers with QR + UPI Payments', excerpt: 'NextCharge reveals plans to deploy its own branded chargers that work without any app — customers can scan a QR code and pay via UPI, ATM card, or RFID card.' },
  ];

  return (
    <main>
      {/* Hero */}
      <section className="page-hero page-hero--centered">
        <div className="container">
          <p className="page-hero__eyebrow">📰 Press & Media</p>
          <h1 className="page-hero__title">
            NextCharge in the <span>news</span>
          </h1>
          <p className="page-hero__subtitle">
            Latest announcements, press releases, and brand resources from NextCharge — India's EV charging aggregator.
          </p>
        </div>
      </section>

      {/* Media Kit */}
      <section className="page-section page-section--white">
        <div className="container">
          <div className="media-kit">
            <div>
              <h3>Media Kit & Brand Assets</h3>
              <p>Download our logo, brand guidelines, and product screenshots for press coverage.</p>
            </div>
            <a href="#" className="media-kit__btn">
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>download</span>
              Download Media Kit
            </a>
          </div>
        </div>
      </section>

      {/* Press Releases */}
      <section className="page-section page-section--gray">
        <div className="container">
          <div className="page-section__header">
            <p className="eyebrow">Press Releases</p>
            <h2>Latest announcements</h2>
          </div>
          <div className="grid-2" style={{ maxWidth: '900px', margin: '0 auto' }}>
            {pressReleases.map((pr, i) => (
              <div className="press-card" key={i}>
                <div className="press-card__date">{pr.date}</div>
                <h3 className="press-card__title">{pr.title}</h3>
                <p className="press-card__excerpt">{pr.excerpt}</p>
                <a href="#" className="press-card__link">
                  Read More <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Contact */}
      <section className="page-section page-section--white">
        <div className="container" style={{ textAlign: 'center', maxWidth: '560px' }}>
          <div className="info-card__icon info-card__icon--blue" style={{ margin: '0 auto 20px' }}>
            <span className="material-symbols-outlined">mail</span>
          </div>
          <h2 style={{ fontSize: 'var(--text-heading-md)', fontWeight: 700, color: 'var(--color-navy-900)', margin: '0 0 12px' }}>Press Inquiries</h2>
          <p style={{ fontSize: 'var(--text-body-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: '24px' }}>
            For media inquiries, interview requests, and press-related questions, please reach out to our founders directly.
          </p>
          <a href="mailto:nextchargeindia@gmail.com" style={{ color: 'var(--color-orange-500)', fontWeight: 600, fontSize: 'var(--text-body-md)' }}>
            nextchargeindia@gmail.com
          </a>
        </div>
      </section>

      {/* CTA */}
      <section className="page-cta">
        <div className="container">
          <h2>Want to partner with us?</h2>
          <p>Let's discuss how NextCharge can be part of your story.</p>
          <div className="btn-group">
            <Link to="/contact" className="btn btn--primary" style={{ padding: '14px 36px', fontSize: '14px', textDecoration: 'none' }}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};
