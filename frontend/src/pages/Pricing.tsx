import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export const Pricing: React.FC = () => {
  useEffect(() => { document.title = 'Pricing — NextCharge | EV Charging Plans India'; }, []);

  return (
    <main>
      {/* Hero */}
      <section className="page-hero page-hero--centered">
        <div className="container">
          <p className="page-hero__eyebrow">💰 Simple Pricing</p>
          <h1 className="page-hero__title">
            Plans that <span>grow with you</span>
          </h1>
          <p className="page-hero__subtitle">
            Whether you charge occasionally or daily, NextCharge has a plan for you. Transparent pricing with no hidden fees.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="page-section page-section--gray">
        <div className="container">
          <div className="pricing-grid">
            {/* Free */}
            <div className="pricing-card">
              <h4 className="pricing-card__name">Free</h4>
              <div className="pricing-card__price">₹0</div>
              <p className="pricing-card__desc">Perfect for getting started with EV charging in India.</p>
              <ul className="pricing-card__features">
                <li><span className="material-symbols-outlined">check_circle</span> Find chargers across all networks</li>
                <li><span className="material-symbols-outlined">check_circle</span> Live charger availability</li>
                <li><span className="material-symbols-outlined">check_circle</span> Pay-per-use charging</li>
                <li><span className="material-symbols-outlined">check_circle</span> Basic session history</li>
                <li><span className="material-symbols-outlined">check_circle</span> Standard support</li>
                <li className="disabled"><span className="material-symbols-outlined">cancel</span> Priority booking</li>
                <li className="disabled"><span className="material-symbols-outlined">cancel</span> RFID card access</li>
                <li className="disabled"><span className="material-symbols-outlined">cancel</span> Rescue Charging service</li>
              </ul>
              <button className="pricing-card__cta pricing-card__cta--outline">Get Started Free</button>
            </div>

            {/* Premium */}
            <div className="pricing-card pricing-card--featured">
              <div className="pricing-card__badge">Recommended</div>
              <h4 className="pricing-card__name">Premium</h4>
              <div className="pricing-card__price">Coming Soon</div>
              <p className="pricing-card__desc">For regular EV drivers who want the full experience.</p>
              <ul className="pricing-card__features">
                <li><span className="material-symbols-outlined">check_circle</span> Everything in Free</li>
                <li><span className="material-symbols-outlined">check_circle</span> Priority charger booking</li>
                <li><span className="material-symbols-outlined">check_circle</span> NextCharge RFID card</li>
                <li><span className="material-symbols-outlined">check_circle</span> Rescue Charging access</li>
                <li><span className="material-symbols-outlined">check_circle</span> Exclusive discounts & offers</li>
                <li><span className="material-symbols-outlined">check_circle</span> Advanced charging analytics</li>
                <li><span className="material-symbols-outlined">check_circle</span> Trip planner with smart routing</li>
                <li><span className="material-symbols-outlined">check_circle</span> Priority support</li>
              </ul>
              <button className="pricing-card__cta pricing-card__cta--primary">Join Waitlist</button>
            </div>

            {/* Enterprise */}
            <div className="pricing-card">
              <h4 className="pricing-card__name">Enterprise</h4>
              <div className="pricing-card__price">Custom</div>
              <p className="pricing-card__desc">For fleets, businesses & charging station operators.</p>
              <ul className="pricing-card__features">
                <li><span className="material-symbols-outlined">check_circle</span> Everything in Premium</li>
                <li><span className="material-symbols-outlined">check_circle</span> Fleet management dashboard</li>
                <li><span className="material-symbols-outlined">check_circle</span> Bulk RFID cards for drivers</li>
                <li><span className="material-symbols-outlined">check_circle</span> Station listing & analytics</li>
                <li><span className="material-symbols-outlined">check_circle</span> Home charger reseller program</li>
                <li><span className="material-symbols-outlined">check_circle</span> API access</li>
                <li><span className="material-symbols-outlined">check_circle</span> Dedicated account manager</li>
                <li><span className="material-symbols-outlined">check_circle</span> Custom integrations</li>
              </ul>
              <Link to="/contact" className="pricing-card__cta pricing-card__cta--outline" style={{ textDecoration: 'none' }}>Contact Us</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="page-section page-section--white">
        <div className="container">
          <div className="page-section__header">
            <p className="eyebrow">Compare Plans</p>
            <h2>Feature-by-feature breakdown</h2>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Free</th>
                  <th>Premium</th>
                  <th>Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Find Chargers (All Networks)', true, true, true],
                  ['Live Charger Availability', true, true, true],
                  ['Session History', true, true, true],
                  ['UPI & Card Payments', true, true, true],
                  ['Priority Booking', false, true, true],
                  ['RFID Card', false, true, true],
                  ['Rescue Charging', false, true, true],
                  ['Trip Planner', false, true, true],
                  ['Advanced Analytics', false, true, true],
                  ['Fleet Dashboard', false, false, true],
                  ['Station Listing', false, false, true],
                  ['API Access', false, false, true],
                  ['Dedicated Support', false, false, true],
                ].map(([feature, free, premium, enterprise], i) => (
                  <tr key={i}>
                    <td>{feature as string}</td>
                    <td><span className={`material-symbols-outlined ${free ? 'check' : 'cross'}`}>{free ? 'check_circle' : 'cancel'}</span></td>
                    <td><span className={`material-symbols-outlined ${premium ? 'check' : 'cross'}`}>{premium ? 'check_circle' : 'cancel'}</span></td>
                    <td><span className={`material-symbols-outlined ${enterprise ? 'check' : 'cross'}`}>{enterprise ? 'check_circle' : 'cancel'}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="page-section page-section--gray">
        <div className="container">
          <div className="page-section__header">
            <p className="eyebrow">Common Questions</p>
            <h2>Pricing FAQs</h2>
          </div>
          <PricingFAQ />
        </div>
      </section>

      {/* CTA */}
      <section className="page-cta">
        <div className="container">
          <h2>Ready to start charging smarter?</h2>
          <p>Join NextCharge today — free to start, premium features coming soon.</p>
          <div className="btn-group">
            <Link to="/find-chargers" className="btn btn--primary" style={{ padding: '14px 36px', fontSize: '14px', textDecoration: 'none' }}>
              Find Chargers
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

const PricingFAQ: React.FC = () => {
  const [open, setOpen] = React.useState<number | null>(0);
  const faqs = [
    { q: 'When will Premium pricing be announced?', a: 'We\'re finalizing our Premium plan pricing and will announce it before our official launch. Join the waitlist to be the first to know and get early-bird discounts.' },
    { q: 'Is there a long-term commitment?', a: 'No commitments at all. The Free plan is always free. Premium plans will be annual subscriptions that you can cancel anytime.' },
    { q: 'How does pay-per-use pricing work?', a: 'With the Free plan, you simply pay for what you use at each charging station. Rates are set by the individual station operators and are displayed before you start a session.' },
    { q: 'What is Rescue Charging?', a: 'Rescue Charging is our on-demand mobile charging service for Premium members. If your EV runs out of charge, our team will come to your location and provide emergency charging. This service will be available in select cities at launch.' },
    { q: 'What payment methods will you accept?', a: 'We will support UPI (GPay, PhonePe, Paytm), credit/debit cards (Visa, Mastercard, RuPay), net banking, and our own NextCharge RFID card for Premium members.' },
    { q: 'What is the RFID card?', a: 'The NextCharge RFID card is a physical card for Premium and Enterprise members. Simply tap it at any NextCharge-compatible charger to start charging instantly — no app needed. It also unlocks exclusive discounts and loyalty rewards.' },
  ];

  return (
    <div className="accordion">
      {faqs.map((faq, i) => (
        <div key={i} className={`accordion-item ${open === i ? 'accordion-item--open' : ''}`}>
          <button className="accordion-trigger" onClick={() => setOpen(open === i ? null : i)}>
            {faq.q}
            <span className="material-symbols-outlined">expand_more</span>
          </button>
          <div className="accordion-content">
            <div className="accordion-content__inner">{faq.a}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
