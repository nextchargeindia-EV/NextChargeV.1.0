import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export const Careers: React.FC = () => {
  useEffect(() => { document.title = 'Careers — NextCharge | Join India\'s EV Charging Startup'; }, []);

  const areasOfInterest = [
    { icon: 'code', title: 'App & Web Development', desc: 'React Native, React, Node.js, MongoDB — help us build the platform that India\'s EV drivers will love.', location: 'Remote / Chhatrapati Sambhajinagar' },
    { icon: 'campaign', title: 'Marketing & Growth', desc: 'Digital marketing, SEO, social media, content creation — help us reach every EV driver in India.', location: 'Remote' },
    { icon: 'handshake', title: 'Business Development', desc: 'Build relationships with charging station operators, home charger brands, and B2B clients across India.', location: 'Remote / Field' },
    { icon: 'palette', title: 'UI/UX Design', desc: 'Design beautiful, intuitive experiences for our app and website. Make EV charging feel effortless.', location: 'Remote' },
  ];

  return (
    <main>
      {/* Hero */}
      <section className="page-hero page-hero--centered">
        <div className="container">
          <p className="page-hero__eyebrow">🚀 Join the Founding Team</p>
          <h1 className="page-hero__title">
            Build India's <span>EV future</span> from day one
          </h1>
          <p className="page-hero__subtitle">
            We're a team of 2 passionate founders looking for driven individuals who want to shape the future of clean mobility in India. This is your chance to join at the ground floor.
          </p>
        </div>
      </section>

      {/* Why Join */}
      <section className="page-section page-section--white">
        <div className="container">
          <div className="page-section__header">
            <p className="eyebrow">Why Join a Startup</p>
            <h2>This isn't a job — it's a mission</h2>
          </div>
          <div className="grid-3">
            {[
              { icon: 'rocket_launch', title: 'Ground Floor Opportunity', desc: 'Join before we launch. Your work will directly shape the product, brand, and culture from the very beginning.' },
              { icon: 'trending_up', title: 'Equity & Growth', desc: 'Early team members will be offered equity (ESOPs). As NextCharge grows, so does your ownership stake.' },
              { icon: 'lightbulb', title: 'Build Something Real', desc: 'You won\'t be a cog in a machine. Every feature you build, every user you acquire — it all matters.' },
              { icon: 'home', title: 'Remote-First Culture', desc: 'Work from anywhere in India. We believe in output, not office hours. Flexibility is part of our DNA.' },
              { icon: 'eco', title: 'Impact-Driven Work', desc: 'Help accelerate India\'s transition to electric mobility. Your work will contribute to a cleaner, greener future.' },
              { icon: 'groups', title: 'Small Team, Big Impact', desc: 'In a team of 2 (and growing), your voice is heard. Every idea gets considered, every contribution matters.' },
            ].map((p, i) => (
              <div className="perk-card" key={i}>
                <span className="material-symbols-outlined">{p.icon}</span>
                <div>
                  <h4>{p.title}</h4>
                  <p>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas We're Hiring */}
      <section className="page-section page-section--gray">
        <div className="container">
          <div className="page-section__header">
            <p className="eyebrow">We're Looking For</p>
            <h2>Passionate builders in these areas</h2>
            <p style={{ color: 'var(--color-text-secondary)', marginTop: '8px' }}>We don't have formal job listings yet — we're looking for people who are excited about the mission. Reach out if any of these areas excite you.</p>
          </div>
          <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {areasOfInterest.map((area, i) => (
              <div className="job-card" key={i}>
                <div className="job-card__info">
                  <h3>{area.title}</h3>
                  <p style={{ fontSize: 'var(--text-body-sm)', color: 'var(--color-text-secondary)', marginTop: '4px', lineHeight: 1.6 }}>{area.desc}</p>
                  <div className="job-card__tags" style={{ marginTop: '8px' }}>
                    <span className="job-card__tag">
                      <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>location_on</span>
                      {area.location}
                    </span>
                    <span className="job-card__tag">
                      <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>schedule</span>
                      Full-time / Part-time
                    </span>
                  </div>
                </div>
                <a href="mailto:nextchargeindia@gmail.com?subject=Interest in joining NextCharge — {area.title}" className="job-card__apply">Reach Out →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Founders */}
      <section className="page-section page-section--white">
        <div className="container">
          <div className="page-section__header">
            <p className="eyebrow">The Founders</p>
            <h2>Who you'll be working with</h2>
          </div>
          <div className="grid-2" style={{ maxWidth: '700px', margin: '0 auto' }}>
            {[
              { name: 'Rushikesh B. Rathod', role: 'Co-Founder', desc: 'Leading product, engineering, and technology at NextCharge.' },
              { name: 'Mangesh B. Mhaske', role: 'Co-Founder', desc: 'Leading business strategy, operations, and partnerships.' },
            ].map((founder, i) => (
              <div className="info-card" key={i} style={{ textAlign: 'center' }}>
                <div className="info-card__icon info-card__icon--orange" style={{ margin: '0 auto 16px', width: '56px', height: '56px' }}>
                  <span className="material-symbols-outlined">person</span>
                </div>
                <h3>{founder.name}</h3>
                <p style={{ fontSize: 'var(--text-body-xs)', color: 'var(--color-orange-500)', fontWeight: 600, marginBottom: '4px' }}>{founder.role}</p>
                <p>{founder.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="page-cta">
        <div className="container">
          <h2>Excited about clean mobility?</h2>
          <p>Send us an email with your resume, portfolio, or just a message about why you want to join. We'd love to hear from you.</p>
          <div className="btn-group">
            <a href="mailto:nextchargeindia@gmail.com?subject=I want to join NextCharge!" className="btn btn--primary" style={{ padding: '14px 36px', fontSize: '14px', textDecoration: 'none' }}>
              Email Us Your Resume
            </a>
            <Link to="/contact" className="btn btn--outline" style={{ padding: '14px 36px', fontSize: '14px', textDecoration: 'none' }}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};
