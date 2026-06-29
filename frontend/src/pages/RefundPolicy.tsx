import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const sections = [
  { id: 'eligibility', title: '1. Refund Eligibility' },
  { id: 'auto', title: '2. Automatic Refunds' },
  { id: 'manual', title: '3. Manual Refund Requests' },
  { id: 'process', title: '4. Refund Process & Timelines' },
  { id: 'subscriptions', title: '5. Subscription Refunds' },
  { id: 'non-refundable', title: '6. Non-Refundable Items' },
  { id: 'disputes', title: '7. Payment Disputes' },
  { id: 'contact', title: '8. Contact Us' },
];

export const RefundPolicy: React.FC = () => {
  useEffect(() => { document.title = 'Refund Policy — NextCharge | EV Charging Refunds'; }, []);

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <p className="page-hero__eyebrow">💳 Legal</p>
          <h1 className="page-hero__title">Refund Policy</h1>
          <p className="page-hero__subtitle">Our commitment to fair and transparent refund practices.</p>
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

              <h2 id="eligibility">1. Refund Eligibility</h2>
              <p>NextCharge is committed to ensuring a seamless charging experience. You may be eligible for a refund in the following circumstances:</p>
              <ul>
                <li>Charging session failed to start due to a charger malfunction</li>
                <li>Session was interrupted before completion due to equipment failure</li>
                <li>You were charged for energy that was not delivered to your vehicle</li>
                <li>Duplicate or erroneous charges on your payment method</li>
                <li>Significant discrepancy between displayed and actual charging rates</li>
              </ul>

              <h2 id="auto">2. Automatic Refunds</h2>
              <p>In the following cases, refunds are processed automatically without the need for a manual request:</p>
              <ul>
                <li><strong>Failed sessions:</strong> If a session fails to deliver any energy, the full amount is refunded automatically.</li>
                <li><strong>System errors:</strong> If our system detects a billing error, the difference is credited to your account.</li>
                <li><strong>Duplicate charges:</strong> Detected and reversed within 24 hours.</li>
              </ul>

              <h2 id="manual">3. Manual Refund Requests</h2>
              <p>For issues not covered by automatic refunds, you can submit a refund request through:</p>
              <ul>
                <li>The NextCharge app: Go to Session History → Select session → "Request Refund"</li>
                <li>Email: <a href="mailto:nextchargeindia@gmail.com" style={{ color: 'var(--color-orange-500)' }}>nextchargeindia@gmail.com</a></li>
                <li>The <Link to="/report-issue" style={{ color: 'var(--color-orange-500)' }}>Report an Issue</Link> page on our website</li>
              </ul>
              <p>Please include your session ID, date, station name, and a description of the issue.</p>

              <h2 id="process">4. Refund Process & Timelines</h2>
              <p>Once a refund is approved, processing times depend on your payment method:</p>
              <ul>
                <li><strong>UPI:</strong> 1–3 business days</li>
                <li><strong>Credit/Debit Cards:</strong> 5–7 business days</li>
                <li><strong>Net Banking:</strong> 5–10 business days</li>
                <li><strong>Wallet Credits:</strong> Instant (credited to your NextCharge wallet)</li>
              </ul>

              <h2 id="subscriptions">5. Subscription Refunds</h2>
              <p>Monthly subscription plans (Pro plan) can be cancelled at any time. Upon cancellation:</p>
              <ul>
                <li>You retain access until the end of the current billing cycle</li>
                <li>No partial refund is provided for the remaining days in the cycle</li>
                <li>If cancelled within 48 hours of initial subscription, a full refund is provided</li>
              </ul>

              <h2 id="non-refundable">6. Non-Refundable Items</h2>
              <p>The following are not eligible for refunds:</p>
              <ul>
                <li>Successfully completed charging sessions</li>
                <li>Sessions stopped by the user before completion</li>
                <li>Parking or service fees charged by station operators</li>
                <li>Any promotional credits or rewards already redeemed</li>
              </ul>

              <h2 id="disputes">7. Payment Disputes</h2>
              <p>If you believe a charge is unauthorized, please contact us before filing a dispute with your bank. We can usually resolve issues faster through direct communication. Filing a bank dispute may result in temporary account suspension pending investigation.</p>

              <h2 id="contact">8. Contact Us</h2>
              <p>For refund inquiries or billing questions:</p>
              <ul>
                <li>Email: <a href="mailto:nextchargeindia@gmail.com" style={{ color: 'var(--color-orange-500)' }}>nextchargeindia@gmail.com</a></li>
                <li>Phone: +91 82087 46187 / +91 75079 02116</li>
                <li>In-app: Go to Help → Payments & Billing</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
