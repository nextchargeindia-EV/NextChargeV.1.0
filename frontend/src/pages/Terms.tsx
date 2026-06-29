import React, { useEffect } from 'react';

const sections = [
  { id: 'acceptance', title: '1. Acceptance of Terms' },
  { id: 'services', title: '2. Description of Services' },
  { id: 'accounts', title: '3. User Accounts' },
  { id: 'payments', title: '4. Payments & Billing' },
  { id: 'conduct', title: '5. User Conduct' },
  { id: 'ip', title: '6. Intellectual Property' },
  { id: 'liability', title: '7. Limitation of Liability' },
  { id: 'termination', title: '8. Termination' },
  { id: 'governing', title: '9. Governing Law' },
  { id: 'changes', title: '10. Changes to Terms' },
];

export const Terms: React.FC = () => {
  useEffect(() => { document.title = 'Terms of Service — NextCharge | Usage Agreement'; }, []);

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <p className="page-hero__eyebrow">📜 Legal</p>
          <h1 className="page-hero__title">Terms of Service</h1>
          <p className="page-hero__subtitle">Please read these terms carefully before using NextCharge services.</p>
        </div>
      </section>

      <section className="page-section page-section--white">
        <div className="container">
          <div className="legal-layout">
            <aside className="legal-sidebar">
              <nav>
                <ul className="legal-sidebar__nav">
                  {sections.map(s => (
                    <li key={s.id}><a href={`#${s.id}`}>{s.title}</a></li>
                  ))}
                </ul>
              </nav>
            </aside>

            <div className="legal-content">
              <p className="legal-content__updated">Last updated: June 1, 2026</p>

              <h2 id="acceptance">1. Acceptance of Terms</h2>
              <p>By accessing or using the NextCharge platform, mobile application, website, or any associated services (collectively, the "Services"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Services.</p>
              <p>These terms constitute a legally binding agreement between you and NextCharge ("NextCharge", "we", "us", or "our"). NextCharge is currently in the process of being registered as a Private Limited Company under the Companies Act, 2013.</p>

              <h2 id="services">2. Description of Services</h2>
              <p>NextCharge provides an electric vehicle (EV) charging aggregator platform that enables users to:</p>
              <ul>
                <li>Locate and navigate to EV charging stations</li>
                <li>Initiate, monitor, and pay for charging sessions</li>
                <li>Plan trips with charging stops</li>
                <li>Manage their EV charging profile and session history</li>
                <li>Access business solutions for fleet management and station hosting</li>
              </ul>

              <h2 id="accounts">3. User Accounts</h2>
              <p>To access certain features, you must create a NextCharge account. You agree to provide accurate, current, and complete information during registration and to keep your account information updated.</p>
              <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.</p>

              <h2 id="payments">4. Payments & Billing</h2>
              <p>Charging sessions are billed based on energy consumed (per kWh). Prices vary by station and charger type and are clearly displayed before each session begins.</p>
              <p>By initiating a charging session, you authorize NextCharge to charge your selected payment method. All payments are processed through secure, PCI-DSS compliant payment partners.</p>
              <p>Subscription plans are billed monthly and auto-renew unless cancelled. You can cancel anytime from your account settings.</p>

              <h2 id="conduct">5. User Conduct</h2>
              <p>When using our Services, you agree not to:</p>
              <ul>
                <li>Damage, tamper with, or misuse any charging equipment</li>
                <li>Use the Services for any illegal or unauthorized purpose</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt the Services or servers</li>
                <li>Misrepresent your identity or vehicle information</li>
              </ul>

              <h2 id="ip">6. Intellectual Property</h2>
              <p>All content, trademarks, logos, software, and technology associated with NextCharge are owned by or licensed to NextCharge. You may not reproduce, distribute, or create derivative works without our express written consent.</p>

              <h2 id="liability">7. Limitation of Liability</h2>
              <p>NextCharge provides the Services "as is" and makes no warranties regarding the availability, accuracy, or reliability of charging stations. To the maximum extent permitted by law, NextCharge shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Services.</p>
              <p>Our total liability shall not exceed the amount paid by you to NextCharge in the 12 months preceding the claim.</p>

              <h2 id="termination">8. Termination</h2>
              <p>We reserve the right to suspend or terminate your account at any time if you violate these terms or engage in conduct that is harmful to other users, our partners, or NextCharge.</p>
              <p>Upon termination, your right to use the Services will cease immediately. Any outstanding payments remain due.</p>

              <h2 id="governing">9. Governing Law</h2>
              <p>These Terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Chhatrapati Sambhajinagar, Maharashtra.</p>

              <h2 id="changes">10. Changes to Terms</h2>
              <p>We may update these Terms from time to time. We will notify you of material changes via email or in-app notification. Your continued use of the Services after such changes constitutes acceptance of the updated terms.</p>
              <p>For questions about these Terms, contact us at <a href="mailto:nextchargeindia@gmail.com" style={{ color: 'var(--color-orange-500)' }}>nextchargeindia@gmail.com</a>.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
