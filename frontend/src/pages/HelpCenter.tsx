import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export const HelpCenter: React.FC = () => {
  useEffect(() => { document.title = 'Help Center — NextCharge | EV Charging Support India'; }, []);

  const categories = [
    { icon: 'play_circle', title: 'Getting Started', desc: 'Create your account, download the app, and start your first charge.', count: '12 articles' },
    { icon: 'ev_station', title: 'Charging', desc: 'How to find, start, and stop charging sessions. Connector types explained.', count: '18 articles' },
    { icon: 'payments', title: 'Payments & Billing', desc: 'Payment methods, invoices, subscriptions, and refund requests.', count: '14 articles' },
    { icon: 'person', title: 'Account & Profile', desc: 'Manage your profile, reset password, and update preferences.', count: '8 articles' },
    { icon: 'directions_car', title: 'Trip Planning', desc: 'Plan your route with charging stops. Optimized for long drives.', count: '6 articles' },
    { icon: 'build', title: 'Troubleshooting', desc: 'Charger issues, app errors, and common problems solved.', count: '15 articles' },
    { icon: 'business', title: 'For Business', desc: 'Setting up business accounts, fleet management, and analytics.', count: '10 articles' },
    { icon: 'code', title: 'API & Integrations', desc: 'Developer docs, API keys, webhooks, and SDK guides.', count: '9 articles' },
  ];

  const popularArticles = [
    'How to start a charging session',
    'Supported payment methods',
    'What to do if a charger isn\'t working',
    'Understanding connector types (CCS2, Type 2, CHAdeMO)',
    'How to cancel or get a refund',
    'Setting up your EV profile',
  ];

  return (
    <main>
      {/* Hero */}
      <section className="page-hero page-hero--centered">
        <div className="container">
          <p className="page-hero__eyebrow">🛟 Help Center</p>
          <h1 className="page-hero__title">
            How can we <span>help you?</span>
          </h1>
          <p className="page-hero__subtitle">
            Search our knowledge base or browse by category to find what you need.
          </p>
          <div className="search-bar">
            <span className="material-symbols-outlined">search</span>
            <input type="text" placeholder="Search for help articles..." />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="page-section page-section--white">
        <div className="container">
          <div className="grid-4">
            {categories.map((cat, i) => (
              <div className="info-card" key={i} style={{ cursor: 'pointer' }}>
                <div className="info-card__icon info-card__icon--orange">
                  <span className="material-symbols-outlined">{cat.icon}</span>
                </div>
                <h3>{cat.title}</h3>
                <p>{cat.desc}</p>
                <span style={{ fontSize: 'var(--text-body-xs)', color: 'var(--color-orange-500)', fontWeight: 600, marginTop: '12px', display: 'block' }}>
                  {cat.count} →
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="page-section page-section--gray">
        <div className="container">
          <div className="page-section__header">
            <p className="eyebrow">Most Read</p>
            <h2>Popular articles</h2>
          </div>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            {popularArticles.map((article, i) => (
              <a
                key={i}
                href="#"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '18px 24px',
                  background: 'var(--color-white)',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '8px',
                  textDecoration: 'none',
                  color: 'var(--color-navy-900)',
                  fontSize: 'var(--text-body-sm)',
                  fontWeight: 500,
                  border: '1px solid var(--color-border-card)',
                  transition: 'all 200ms ease',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,106,34,0.3)'; (e.currentTarget as HTMLElement).style.transform = 'translateX(4px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border-card)'; (e.currentTarget as HTMLElement).style.transform = 'none'; }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--color-orange-500)' }}>article</span>
                {article}
                <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--color-text-tertiary)', marginLeft: 'auto' }}>chevron_right</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Live Chat CTA */}
      <section className="page-section page-section--white" id="live-chat">
        <div className="container" style={{ textAlign: 'center', maxWidth: '560px' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '48px', color: 'var(--color-orange-500)', marginBottom: '16px' }}>support_agent</span>
          <h2 style={{ fontSize: 'var(--text-heading-md)', fontWeight: 700, color: 'var(--color-navy-900)', margin: '0 0 12px' }}>
            Still need help?
          </h2>
          <p style={{ fontSize: 'var(--text-body-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: '24px' }}>
            Our support team is available via email and phone. Email us at nextchargeindia@gmail.com or call +91 82087 46187.
          </p>
          <div className="btn-group" style={{ justifyContent: 'center' }}>
            <button className="form-submit">
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>mail</span>
              Email Support
            </button>
            <Link to="/faqs" style={{ padding: '14px 28px', textDecoration: 'none', color: 'var(--color-navy-900)', fontWeight: 600, fontSize: 'var(--text-body-sm)' }}>
              Browse FAQs →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};
