import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const faqData: Record<string, { q: string; a: string }[]> = {
  'General': [
    { q: 'What is NextCharge?', a: 'NextCharge is India\'s upcoming EV charging aggregator platform. We bring every charging station from every network — Tata Power, Statiq, ChargeZone, Ather Grid, and more — onto a single app with live availability, real-time status, and seamless payments.' },
    { q: 'How is NextCharge different from ElectricPe or other apps?', a: 'NextCharge focuses on real-time transparency — we show live charger status (available, occupied, or offline) for every station. In the future, our own NextCharge-branded chargers will let you charge without any app — just scan a QR code and pay via UPI or card.' },
    { q: 'Is NextCharge available yet?', a: 'We\'re currently building the NextCharge app and website. We\'re planning to launch soon and are actively onboarding charging stations. Join our waitlist to be the first to know when we go live!' },
    { q: 'Do I need to create an account?', a: 'You can browse charger locations without an account. To start charging sessions, make payments, and access features like trip planning and session history, you\'ll need to sign up — it\'s quick and free.' },
    { q: 'What EV brands are compatible?', a: 'NextCharge works with all electric vehicles. We support all connector types available in India including CCS2, Type 2, CHAdeMO, and standard AC plugs. Whether you drive a Tata Nexon EV, MG ZS EV, Hyundai Ioniq, or any other EV — we\'ve got you covered.' },
  ],
  'Charging': [
    { q: 'How do I find a charging station?', a: 'Open the NextCharge app or visit our Find Chargers page. You\'ll see every charging station near you on a map with live status — green means available, red means occupied or offline.' },
    { q: 'What types of chargers are listed?', a: 'We aggregate all types — AC slow chargers (3.3–22 kW) for overnight or destination charging, and DC fast chargers (50–150+ kW) for quick top-ups. Each station listing shows the available charger types, power ratings, and pricing.' },
    { q: 'What is Rescue Charging?', a: 'Rescue Charging is our on-demand mobile charging service exclusively for Premium members. If your EV runs out of charge on the road, our team will come to your location with a mobile charger. This service will be available in select cities at launch.' },
    { q: 'Will NextCharge have its own chargers?', a: 'Yes! After establishing our aggregator network, we plan to deploy our own NextCharge-branded chargers. These will be unique — no app needed. You can charge by scanning a QR code, paying via UPI or ATM card, or tapping your NextCharge RFID card.' },
  ],
  'Payments': [
    { q: 'What payment methods will be supported?', a: 'We will support UPI (GPay, PhonePe, Paytm), credit/debit cards (Visa, Mastercard, RuPay), net banking, and our own NextCharge RFID card for Premium members. At our future chargers, you\'ll also be able to pay directly via QR code or ATM card swipe.' },
    { q: 'How is the charging cost calculated?', a: 'Charging is billed per kWh (unit of energy). The per-kWh rate is set by each station operator and is always displayed before you start a session. NextCharge provides transparent pricing — no hidden fees.' },
    { q: 'What is the RFID card?', a: 'The NextCharge RFID card is a physical card for Premium and Enterprise members. Tap it at any NextCharge-compatible charger to start charging instantly — no phone or app needed. It also unlocks exclusive discounts and loyalty rewards.' },
    { q: 'How do refunds work?', a: 'If a session fails or is interrupted due to a charger issue, you\'ll receive a refund as per our refund policy. For other refund requests, contact us at nextchargeindia@gmail.com or visit our Refund Policy page.' },
  ],
  'Account': [
    { q: 'How do I sign up?', a: 'Download the NextCharge app (coming soon to Google Play and App Store) or sign up on our website. Registration is free and takes less than a minute.' },
    { q: 'Can I add multiple vehicles?', a: 'Yes! You can add multiple vehicles to your NextCharge account. Go to Profile → My Vehicles to add, edit, or remove vehicles. This helps us show you the right connector types and charging recommendations.' },
    { q: 'Is my data secure?', a: 'Absolutely. We use industry-standard encryption for all data. We never store your payment card details — all payments are processed through secure, PCI-DSS compliant partners. Read our Privacy Policy for full details.' },
    { q: 'How do I contact support?', a: 'Email us at nextchargeindia@gmail.com or call +91 82087 46187 / +91 75079 02116. You can also reach us on Instagram @nextcharge.in or Twitter @nextchargeindia.' },
  ],
};

export const FAQs: React.FC = () => {
  useEffect(() => { document.title = 'FAQs — NextCharge | EV Charging Questions Answered'; }, []);
  const categories = Object.keys(faqData);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setOpenIndex(0);
  };

  return (
    <main>
      {/* Hero */}
      <section className="page-hero page-hero--centered">
        <div className="container">
          <p className="page-hero__eyebrow">❓ FAQs</p>
          <h1 className="page-hero__title">
            Frequently asked <span>questions</span>
          </h1>
          <p className="page-hero__subtitle">
            Find quick answers to the most common questions about NextCharge — India's EV charging aggregator.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="page-section page-section--white">
        <div className="container">
          {/* Category Tabs */}
          <div className="filter-tabs">
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-tab ${activeCategory === cat ? 'filter-tab--active' : ''}`}
                onClick={() => handleCategoryChange(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Accordion */}
          <div className="accordion">
            {faqData[activeCategory].map((faq, i) => (
              <div key={`${activeCategory}-${i}`} className={`accordion-item ${openIndex === i ? 'accordion-item--open' : ''}`}>
                <button className="accordion-trigger" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                  {faq.q}
                  <span className="material-symbols-outlined">expand_more</span>
                </button>
                <div className="accordion-content">
                  <div className="accordion-content__inner">{faq.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="page-cta">
        <div className="container">
          <h2>Still have questions?</h2>
          <p>Reach out to us — we'd love to help.</p>
          <div className="btn-group">
            <Link to="/help" className="btn btn--primary" style={{ padding: '14px 36px', fontSize: '14px', textDecoration: 'none' }}>
              Visit Help Center
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
