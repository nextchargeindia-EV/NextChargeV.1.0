import React, { useState, useEffect } from 'react';

export const Contact: React.FC = () => {
  useEffect(() => { document.title = 'Contact Us — NextCharge | EV Charging Support India'; }, []);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    setSubmitted(true);
    setFirstName('');
    setLastName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setLoading(false);
    return;
  };

  return (
    <main>
      {/* Hero */}
      <section className="page-hero page-hero--centered">
        <div className="container">
          <p className="page-hero__eyebrow">💬 Get in Touch</p>
          <h1 className="page-hero__title">
            We'd love to <span>hear from you</span>
          </h1>
          <p className="page-hero__subtitle">
            Have a question, feedback, or partnership inquiry? We're building NextCharge for you — and your input matters.
          </p>
        </div>
      </section>

      {/* Contact Form + Channels */}
      <section className="page-section page-section--white">
        <div className="container">
          <div className="contact-grid">
            {/* Channels */}
            <div>
              <h3 style={{ fontSize: 'var(--text-heading-md)', fontWeight: 700, color: 'var(--color-navy-900)', marginBottom: '24px' }}>Reach us directly</h3>
              <div className="contact-channels">
                <div className="contact-channel">
                  <div className="contact-channel__icon info-card__icon--orange">
                    <span className="material-symbols-outlined">mail</span>
                  </div>
                  <div>
                    <h4>Email Us</h4>
                    <p><a href="mailto:nextchargeindia@gmail.com" style={{ color: 'var(--color-orange-500)', textDecoration: 'none' }}>nextchargeindia@gmail.com</a></p>
                  </div>
                </div>
                <div className="contact-channel">
                  <div className="contact-channel__icon info-card__icon--green">
                    <span className="material-symbols-outlined">call</span>
                  </div>
                  <div>
                    <h4>Call Us</h4>
                    <p>+91 82087 46187</p>
                    <p>+91 75079 02116</p>
                  </div>
                </div>
                <div className="contact-channel">
                  <div className="contact-channel__icon info-card__icon--blue">
                    <span className="material-symbols-outlined">share</span>
                  </div>
                  <div>
                    <h4>Follow Us</h4>
                    <p style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <a href="https://instagram.com/nextcharge.in" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontSize: 'var(--text-body-sm)' }}>Instagram: @nextcharge.in</a>
                      <a href="https://twitter.com/nextchargeindia" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontSize: 'var(--text-body-sm)' }}>X (Twitter): @nextchargeindia</a>
                      <a href="https://www.linkedin.com/in/next-charge" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontSize: 'var(--text-body-sm)' }}>LinkedIn: NextCharge</a>
                    </p>
                  </div>
                </div>
                <div className="contact-channel">
                  <div className="contact-channel__icon info-card__icon--purple">
                    <span className="material-symbols-outlined">location_on</span>
                  </div>
                  <div>
                    <h4>Our Base</h4>
                    <p>Chhatrapati Sambhajinagar, Maharashtra, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="info-card" style={{ padding: '40px' }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '48px', color: 'var(--color-success)', marginBottom: '16px', display: 'block' }}>check_circle</span>
                  <h3 style={{ fontSize: 'var(--text-heading-sm)', color: 'var(--color-navy-900)', marginBottom: '8px' }}>Message Sent!</h3>
                  <p style={{ fontSize: 'var(--text-body-sm)', color: 'var(--color-text-secondary)' }}>We've sent an acknowledgement email and will get back to you shortly.</p>
                  <button className="btn btn--outline" onClick={() => setSubmitted(false)} style={{ marginTop: '24px' }}>Send Another Message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {error && <div className="alert-box error" style={{ display: 'block', marginBottom: '16px' }}>{error}</div>}
                  <div className="grid-2">
                    <div className="form-group">
                      <label>First Name</label>
                      <input className="form-input" type="text" placeholder="Rushikesh" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label>Last Name</label>
                      <input className="form-input" type="text" placeholder="Rathod" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input className="form-input" type="email" placeholder="your@email.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Subject</label>
                    <select className="form-select" required value={subject} onChange={(e) => setSubject(e.target.value)}>
                      <option value="">Select a topic</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Partnership / Business">Partnership / Business</option>
                      <option value="List My Charging Station">List My Charging Station</option>
                      <option value="Home Charger Reselling">Home Charger Reselling</option>
                      <option value="Technical Support">Technical Support</option>
                      <option value="Press & Media">Press & Media</option>
                      <option value="Investment / Funding">Investment / Funding</option>
                      <option value="Join the Team">Join the Team</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Message</label>
                    <textarea className="form-textarea" placeholder="Tell us how we can help..." required value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                  </div>
                  <button type="submit" className="form-submit" disabled={loading} style={{ width: '100%', justifyContent: 'center' }}>
                    {loading ? 'Sending...' : 'Send Message'}
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>send</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
