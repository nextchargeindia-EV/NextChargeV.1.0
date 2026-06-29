import React, { useEffect } from 'react';

const sections = [
  { id: 'overview', title: '1. Overview' },
  { id: 'collection', title: '2. Information We Collect' },
  { id: 'usage', title: '3. How We Use Your Data' },
  { id: 'sharing', title: '4. Data Sharing' },
  { id: 'security', title: '5. Data Security' },
  { id: 'retention', title: '6. Data Retention' },
  { id: 'rights', title: '7. Your Rights' },
  { id: 'cookies', title: '8. Cookies' },
  { id: 'children', title: '9. Children\'s Privacy' },
  { id: 'changes', title: '10. Policy Changes' },
];

export const Privacy: React.FC = () => {
  useEffect(() => { document.title = 'Privacy Policy — NextCharge | Data Protection India'; }, []);

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <p className="page-hero__eyebrow">🔒 Legal</p>
          <h1 className="page-hero__title">Privacy Policy</h1>
          <p className="page-hero__subtitle">How we collect, use, and protect your personal information.</p>
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

              <h2 id="overview">1. Overview</h2>
              <p>NextCharge ("NextCharge", "we", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, share, and protect your personal information when you use our platform, mobile application, and services. NextCharge is currently in the process of being registered as a Private Limited Company under the Companies Act, 2013.</p>

              <h2 id="collection">2. Information We Collect</h2>
              <p>We collect the following types of information:</p>
              <ul>
                <li><strong>Account Information:</strong> Name, email address, phone number, and password when you create an account.</li>
                <li><strong>Vehicle Information:</strong> EV make, model, and battery capacity for optimized charging recommendations.</li>
                <li><strong>Location Data:</strong> Your device location to help you find nearby chargers (only when you grant permission).</li>
                <li><strong>Charging Data:</strong> Session details including duration, energy consumed, and costs.</li>
                <li><strong>Payment Information:</strong> Payment method details processed securely by our PCI-DSS compliant payment partners.</li>
                <li><strong>Device Information:</strong> Device type, OS version, app version, and crash reports for debugging.</li>
              </ul>

              <h2 id="usage">3. How We Use Your Data</h2>
              <p>We use your information to:</p>
              <ul>
                <li>Provide and improve our charging services</li>
                <li>Process payments and generate invoices</li>
                <li>Send service updates, alerts, and notifications</li>
                <li>Personalize your experience and recommendations</li>
                <li>Analyze usage patterns to improve our network</li>
                <li>Ensure safety and prevent fraud</li>
              </ul>

              <h2 id="sharing">4. Data Sharing</h2>
              <p>We do not sell your personal data. We may share information with:</p>
              <ul>
                <li><strong>Payment processors:</strong> To process your transactions securely.</li>
                <li><strong>Station operators:</strong> Limited session data for station management.</li>
                <li><strong>Analytics partners:</strong> Anonymized data for service improvement.</li>
                <li><strong>Legal authorities:</strong> When required by law or to protect rights and safety.</li>
              </ul>

              <h2 id="security">5. Data Security</h2>
              <p>We implement industry-standard security measures including AES-256 encryption for data at rest, TLS 1.3 for data in transit, regular security audits, and access controls. However, no system is 100% secure, and we cannot guarantee absolute security.</p>

              <h2 id="retention">6. Data Retention</h2>
              <p>We retain your personal data for as long as your account is active or as needed to provide services. Charging session data is retained for 3 years for legal and billing purposes. You can request deletion of your data at any time.</p>

              <h2 id="rights">7. Your Rights</h2>
              <p>You have the right to:</p>
              <ul>
                <li>Access and download your personal data</li>
                <li>Correct inaccurate or incomplete information</li>
                <li>Request deletion of your account and data</li>
                <li>Opt out of marketing communications</li>
                <li>Withdraw consent for location tracking</li>
              </ul>
              <p>To exercise any of these rights, contact us at <a href="mailto:nextchargeindia@gmail.com" style={{ color: 'var(--color-orange-500)' }}>nextchargeindia@gmail.com</a>.</p>

              <h2 id="cookies">8. Cookies</h2>
              <p>Our website uses essential cookies for authentication and session management. We also use analytics cookies (Google Analytics) to understand how users interact with our platform. You can manage cookie preferences in your browser settings.</p>

              <h2 id="children">9. Children's Privacy</h2>
              <p>Our Services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected such data, please contact us for immediate removal.</p>

              <h2 id="changes">10. Policy Changes</h2>
              <p>We may update this Privacy Policy periodically. We will notify you of material changes via email or in-app notification. Your continued use of the Services after changes constitutes acceptance of the updated policy.</p>
              <p>For questions about this policy, contact us at <a href="mailto:nextchargeindia@gmail.com" style={{ color: 'var(--color-orange-500)' }}>nextchargeindia@gmail.com</a>.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
