import React, { useState, useEffect } from 'react';

export const ReportIssue: React.FC = () => {
  useEffect(() => { document.title = 'Report an Issue — NextCharge | EV Charger Problem Reporting'; }, []);
  const [selectedType, setSelectedType] = useState('');
  const [stationId, setStationId] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const issueTypes = [
    { id: 'charger', icon: 'ev_station', label: 'Charger Not Working' },
    { id: 'payment', icon: 'credit_card_off', label: 'Payment Issue' },
    { id: 'app', icon: 'phonelink_erase', label: 'App Bug / Error' },
    { id: 'safety', icon: 'warning', label: 'Safety Concern' },
    { id: 'billing', icon: 'receipt_long', label: 'Billing Dispute' },
    { id: 'other', icon: 'help', label: 'Other Issue' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedType) {
      setError('Please select an issue type.');
      return;
    }

    setLoading(true);
    setError(null);

    setSubmitted(true);
    setLoading(false);
    return;
  };

  if (submitted) {
    return (
      <main>
        <section className="page-hero page-hero--centered">
          <div className="container">
            <span className="material-symbols-outlined" style={{ fontSize: '64px', color: 'var(--color-success)', marginBottom: '24px', display: 'block' }}>task_alt</span>
            <h1 className="page-hero__title">Issue <span>Reported</span></h1>
            <p className="page-hero__subtitle">
              Thank you for reporting. We've received your issue and our team will investigate within 24 hours. You'll receive an email acknowledgement at {email}.
            </p>
            <div style={{ marginTop: '32px', display: 'flex', gap: '16px', justifyContent: 'center' }}>
              <a href="/help" className="btn btn--primary" style={{ padding: '14px 32px', fontSize: '14px', textDecoration: 'none' }}>
                Back to Help Center
              </a>
              <button className="btn btn--outline" onClick={() => { setSubmitted(false); setSelectedType(''); setDescription(''); setStationId(''); setPhone(''); }} style={{ padding: '14px 32px', fontSize: '14px' }}>
                Report Another Issue
              </button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      {/* Hero */}
      <section className="page-hero page-hero--centered">
        <div className="container">
          <p className="page-hero__eyebrow">🐛 Report a Problem</p>
          <h1 className="page-hero__title">
            Let us know <span>what went wrong</span>
          </h1>
          <p className="page-hero__subtitle">
            Help us improve by reporting issues with chargers, payments, or the app.
          </p>
        </div>
      </section>

      {/* Report Form */}
      <section className="page-section page-section--white">
        <div className="container" style={{ maxWidth: '720px' }}>
          <form onSubmit={handleSubmit}>
            {error && <div className="alert-box error" style={{ display: 'block', marginBottom: '16px' }}>{error}</div>}
            
            {/* Issue Type */}
            <h3 style={{ fontSize: 'var(--text-body-md)', fontWeight: 600, color: 'var(--color-navy-900)', marginBottom: '16px' }}>
              What type of issue are you experiencing?
            </h3>
            <div className="issue-type-grid">
              {issueTypes.map(type => (
                <div
                  key={type.id}
                  className={`issue-type-card ${selectedType === type.id ? 'issue-type-card--selected' : ''}`}
                  onClick={() => setSelectedType(type.id)}
                >
                  <span className="material-symbols-outlined">{type.icon}</span>
                  <h4>{type.label}</h4>
                </div>
              ))}
            </div>

            {/* Details */}
            <div className="form-group" style={{ marginTop: '24px' }}>
              <label>Station / Charger ID (if applicable)</label>
              <input className="form-input" type="text" placeholder="e.g., NC-BLR-001 or station name" value={stationId} onChange={(e) => setStationId(e.target.value)} />
            </div>

            <div className="form-group">
              <label>Describe the issue *</label>
              <textarea className="form-textarea" placeholder="Please provide as much detail as possible about the issue you encountered..." required value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>

            <div className="form-group">
              <label>Your Email *</label>
              <input className="form-input" type="email" placeholder="We'll send updates to this email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="form-group">
              <label>Phone Number (optional)</label>
              <input className="form-input" type="tel" placeholder="+91" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>

            <button type="submit" className="form-submit" disabled={loading} style={{ width: '100%', justifyContent: 'center' }}>
              {loading ? 'Submitting...' : 'Submit Report'}
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>send</span>
            </button>
          </form>
        </div>
      </section>

      {/* What happens next */}
      <section className="page-section page-section--gray">
        <div className="container">
          <div className="page-section__header">
            <p className="eyebrow">What Happens Next</p>
            <h2>Our resolution process</h2>
          </div>
          <div className="steps-grid" style={{ maxWidth: '800px', margin: '0 auto' }}>
            {[
              { num: '1', title: 'Report Received', desc: 'We acknowledge your report instantly.' },
              { num: '2', title: 'Investigation', desc: 'Our team reviews and investigates within 24h.' },
              { num: '3', title: 'Resolution', desc: 'We fix the issue and notify you via email.' },
              { num: '4', title: 'Follow-up', desc: 'We confirm everything is resolved to your satisfaction.' },
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
    </main>
  );
};
