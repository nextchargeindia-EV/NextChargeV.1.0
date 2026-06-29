import React, { useState, useEffect } from 'react';

const guidesData = [
  {
    title: 'EV Charging 101: Beginner\'s Guide',
    desc: 'Everything a first-time EV owner needs to know about charging — connectors, costs, and best practices.',
    category: 'Getting Started',
    level: 'beginner',
    readTime: '8 min read',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrkM-PDLy8Ldfmhzm-RMCa_FOKPO0-fpTFpw5soi0D0Adckcqa2fByqQlz01zPI2U5FtNwaV6m2rWqWcMtkXC7nrMwWhCk52vYObF0Hys8AQI1AUPxW6mTqPCE4VaSOqRyNiSnyRZLx5h7a2TD8kZgzUP8dmWRsTbKOb9AYkVqtedrVjyBJmpMt4xrPX7Pof-3MgDjiksa7j6tvqilpWH9-kSCYTU-8SauuCwHFq5_mHRN2o0wIPsvlgISELQDdGC1gR5DL0POXw',
  },
  {
    title: 'Understanding Connector Types in India',
    desc: 'CCS2 vs Type 2 vs CHAdeMO — which connector does your EV use and where to find them.',
    category: 'Getting Started',
    level: 'beginner',
    readTime: '5 min read',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6PG_QOrsFYoeaCz5TaDVpmlq4GOtVKl68AoIorgYmsibvuBY0rtCaM-_MtLall8itgCdUsifhQmPP7yLuVvWdZ5hmrucLVbPAX7KzXtsXU1Hheg-_Hu3acD-ox7GssduOrWgNoUQn0VWgk09_uuKTHqgdZw687Qosw6O025Y9Db9P_htU_XTBFaz9GdOzGp_y8zIRNSTUsDwmL8cIC3QUxvzQUPYV5UbQqli1Q_Uw86xdmpDbWnpRsXS8uSQaCc0jWdH_oO8rMQ',
  },
  {
    title: 'Optimizing Your Charging Costs',
    desc: 'Smart strategies to reduce your per-km charging costs, including off-peak charging and subscription plans.',
    category: 'Cost Savings',
    level: 'intermediate',
    readTime: '6 min read',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKgX1gKgEXDdmvAfrEBq2XKhOybnCsaWQkSQ3_zgNuZpwsOxd7IytMlKs5LEeCRVuer-87vD7e_qyyzLg_EtNwRH7qPnU8bOXHHsqYXllqV2-wr02JYq3tfB42ELr097b9i-EI6IgMdnFLwVx8LFY3vZYUKwOFKa8XEHnDJq8Tdrzu9m7__-GRqCSmQ1Tr_5axfr5-WKZh6-3721UBZD7L8LR-0QnijBJCytLEEyom9mzlyjxORD3RA9AFtRwWFpOjZgAyHmNCNA',
  },
  {
    title: 'Planning Your First EV Road Trip',
    desc: 'Step-by-step guide to planning long-distance EV travel using NextCharge\'s trip planner.',
    category: 'Trip Planning',
    level: 'intermediate',
    readTime: '7 min read',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6PG_QOrsFYoeaCz5TaDVpmlq4GOtVKl68AoIorgYmsibvuBY0rtCaM-_MtLall8itgCdUsifhQmPP7yLuVvWdZ5hmrucLVbPAX7KzXtsXU1Hheg-_Hu3acD-ox7GssduOrWgNoUQn0VWgk09_uuKTHqgdZw687Qosw6O025Y9Db9P_htU_XTBFaz9GdOzGp_y8zIRNSTUsDwmL8cIC3QUxvzQUPYV5UbQqli1Q_Uw86xdmpDbWnpRsXS8uSQaCc0jWdH_oO8rMQ',
  },
  {
    title: 'Fleet Charging Management Guide',
    desc: 'Best practices for managing charging infrastructure for commercial EV fleets.',
    category: 'Business',
    level: 'advanced',
    readTime: '10 min read',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrkM-PDLy8Ldfmhzm-RMCa_FOKPO0-fpTFpw5soi0D0Adckcqa2fByqQlz01zPI2U5FtNwaV6m2rWqWcMtkXC7nrMwWhCk52vYObF0Hys8AQI1AUPxW6mTqPCE4VaSOqRyNiSnyRZLx5h7a2TD8kZgzUP8dmWRsTbKOb9AYkVqtedrVjyBJmpMt4xrPX7Pof-3MgDjiksa7j6tvqilpWH9-kSCYTU-8SauuCwHFq5_mHRN2o0wIPsvlgISELQDdGC1gR5DL0POXw',
  },
  {
    title: 'Home Charging Setup Guide',
    desc: 'How to set up a home charging station — costs, electrician requirements, and best chargers for Indian homes.',
    category: 'Getting Started',
    level: 'beginner',
    readTime: '8 min read',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKgX1gKgEXDdmvAfrEBq2XKhOybnCsaWQkSQ3_zgNuZpwsOxd7IytMlKs5LEeCRVuer-87vD7e_qyyzLg_EtNwRH7qPnU8bOXHHsqYXllqV2-wr02JYq3tfB42ELr097b9i-EI6IgMdnFLwVx8LFY3vZYUKwOFKa8XEHnDJq8Tdrzu9m7__-GRqCSmQ1Tr_5axfr5-WKZh6-3721UBZD7L8LR-0QnijBJCytLEEyom9mzlyjxORD3RA9AFtRwWFpOjZgAyHmNCNA',
  },
  {
    title: 'Integrating NextCharge API into Your App',
    desc: 'Developer guide to integrating our REST API for station search, session management, and payments.',
    category: 'Developer',
    level: 'advanced',
    readTime: '12 min read',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6PG_QOrsFYoeaCz5TaDVpmlq4GOtVKl68AoIorgYmsibvuBY0rtCaM-_MtLall8itgCdUsifhQmPP7yLuVvWdZ5hmrucLVbPAX7KzXtsXU1Hheg-_Hu3acD-ox7GssduOrWgNoUQn0VWgk09_uuKTHqgdZw687Qosw6O025Y9Db9P_htU_XTBFaz9GdOzGp_y8zIRNSTUsDwmL8cIC3QUxvzQUPYV5UbQqli1Q_Uw86xdmpDbWnpRsXS8uSQaCc0jWdH_oO8rMQ',
  },
  {
    title: 'EV Battery Health: Tips & Best Practices',
    desc: 'How to maximize your EV battery lifespan through smart charging habits.',
    category: 'Cost Savings',
    level: 'intermediate',
    readTime: '6 min read',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrkM-PDLy8Ldfmhzm-RMCa_FOKPO0-fpTFpw5soi0D0Adckcqa2fByqQlz01zPI2U5FtNwaV6m2rWqWcMtkXC7nrMwWhCk52vYObF0Hys8AQI1AUPxW6mTqPCE4VaSOqRyNiSnyRZLx5h7a2TD8kZgzUP8dmWRsTbKOb9AYkVqtedrVjyBJmpMt4xrPX7Pof-3MgDjiksa7j6tvqilpWH9-kSCYTU-8SauuCwHFq5_mHRN2o0wIPsvlgISELQDdGC1gR5DL0POXw',
  },
  {
    title: 'Setting Up Workplace Charging',
    desc: 'A guide for employers who want to provide EV charging as an employee benefit.',
    category: 'Business',
    level: 'intermediate',
    readTime: '7 min read',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKgX1gKgEXDdmvAfrEBq2XKhOybnCsaWQkSQ3_zgNuZpwsOxd7IytMlKs5LEeCRVuer-87vD7e_qyyzLg_EtNwRH7qPnU8bOXHHsqYXllqV2-wr02JYq3tfB42ELr097b9i-EI6IgMdnFLwVx8LFY3vZYUKwOFKa8XEHnDJq8Tdrzu9m7__-GRqCSmQ1Tr_5axfr5-WKZh6-3721UBZD7L8LR-0QnijBJCytLEEyom9mzlyjxORD3RA9AFtRwWFpOjZgAyHmNCNA',
  },
];

const allCategories = ['All', ...Array.from(new Set(guidesData.map(g => g.category)))];
const allLevels = ['All', 'beginner', 'intermediate', 'advanced'];

export const Guides: React.FC = () => {
  useEffect(() => { document.title = 'EV Charging Guides — NextCharge | Learn About EV Charging India'; }, []);
  const [category, setCategory] = useState('All');
  const [level, setLevel] = useState('All');

  const filtered = guidesData.filter(g =>
    (category === 'All' || g.category === category) &&
    (level === 'All' || g.level === level)
  );

  return (
    <main>
      {/* Hero */}
      <section className="page-hero page-hero--centered">
        <div className="container">
          <p className="page-hero__eyebrow">📖 Guides</p>
          <h1 className="page-hero__title">
            Learn everything about <span>EV charging in India</span>
          </h1>
          <p className="page-hero__subtitle">
            Comprehensive guides for Indian EV owners — from beginners to fleet managers.
          </p>
        </div>
      </section>

      {/* Guide Grid */}
      <section className="page-section page-section--white">
        <div className="container">
          {/* Filters */}
          <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', marginBottom: '16px', flexWrap: 'wrap' }}>
            <div>
              <span style={{ fontSize: 'var(--text-body-xs)', fontWeight: 600, color: 'var(--color-text-secondary)', marginRight: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Category:</span>
              {allCategories.map(cat => (
                <button
                  key={cat}
                  className={`filter-tab ${category === cat ? 'filter-tab--active' : ''}`}
                  onClick={() => setCategory(cat)}
                  style={{ padding: '6px 16px', fontSize: '13px' }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '48px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: 'var(--text-body-xs)', fontWeight: 600, color: 'var(--color-text-secondary)', marginRight: '8px', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center' }}>Level:</span>
            {allLevels.map(l => (
              <button
                key={l}
                className={`filter-tab ${level === l ? 'filter-tab--active' : ''}`}
                onClick={() => setLevel(l)}
                style={{ padding: '6px 16px', fontSize: '13px', textTransform: 'capitalize' }}
              >
                {l}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '48px', color: 'var(--color-text-tertiary)', marginBottom: '16px', display: 'block' }}>search_off</span>
              <p style={{ color: 'var(--color-text-secondary)' }}>No guides match the selected filters.</p>
            </div>
          ) : (
            <div className="grid-3">
              {filtered.map((guide, i) => (
                <div className="guide-card" key={i} style={{ cursor: 'pointer' }}>
                  <img className="guide-card__image" src={guide.image} alt={guide.title} />
                  <div className="guide-card__content">
                    <div className="guide-card__badges">
                      <span className={`guide-card__badge guide-card__badge--${guide.level}`}>
                        {guide.level.charAt(0).toUpperCase() + guide.level.slice(1)}
                      </span>
                      <span className="guide-card__badge" style={{ background: 'rgba(2,11,77,0.06)', color: 'var(--color-navy-900)' }}>{guide.category}</span>
                    </div>
                    <h3>{guide.title}</h3>
                    <p>{guide.desc}</p>
                    <a href="#" className="guide-card__link">
                      Read Guide <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};
