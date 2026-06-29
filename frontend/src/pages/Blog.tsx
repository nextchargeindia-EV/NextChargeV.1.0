import React, { useState, useEffect } from 'react';

const blogPosts = [
  {
    title: 'Why India Needs an EV Charging Aggregator in 2026',
    excerpt: 'With 60+ charging networks and fragmented apps, Indian EV drivers deserve a unified platform. Here\'s why aggregation is the future.',
    category: 'Industry',
    date: 'June 10, 2026',
    readTime: '5 min read',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrkM-PDLy8Ldfmhzm-RMCa_FOKPO0-fpTFpw5soi0D0Adckcqa2fByqQlz01zPI2U5FtNwaV6m2rWqWcMtkXC7nrMwWhCk52vYObF0Hys8AQI1AUPxW6mTqPCE4VaSOqRyNiSnyRZLx5h7a2TD8kZgzUP8dmWRsTbKOb9AYkVqtedrVjyBJmpMt4xrPX7Pof-3MgDjiksa7j6tvqilpWH9-kSCYTU-8SauuCwHFq5_mHRN2o0wIPsvlgISELQDdGC1gR5DL0POXw',
    featured: true,
  },
  {
    title: 'How NextCharge Solves India\'s Fragmented EV Charging Problem',
    excerpt: 'One app, every charger, live status — here\'s how we\'re building a better EV charging experience for Indian drivers.',
    category: 'Product',
    date: 'June 5, 2026',
    readTime: '4 min read',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6PG_QOrsFYoeaCz5TaDVpmlq4GOtVKl68AoIorgYmsibvuBY0rtCaM-_MtLall8itgCdUsifhQmPP7yLuVvWdZ5hmrucLVbPAX7KzXtsXU1Hheg-_Hu3acD-ox7GssduOrWgNoUQn0VWgk09_uuKTHqgdZw687Qosw6O025Y9Db9P_htU_XTBFaz9GdOzGp_y8zIRNSTUsDwmL8cIC3QUxvzQUPYV5UbQqli1Q_Uw86xdmpDbWnpRsXS8uSQaCc0jWdH_oO8rMQ',
  },
  {
    title: 'EV Charging 101: A Complete Guide for Indian EV Owners',
    excerpt: 'From connector types to billing — everything a new EV owner in India needs to know about charging their electric vehicle.',
    category: 'Guide',
    date: 'June 1, 2026',
    readTime: '6 min read',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKgX1gKgEXDdmvAfrEBq2XKhOybnCsaWQkSQ3_zgNuZpwsOxd7IytMlKs5LEeCRVuer-87vD7e_qyyzLg_EtNwRH7qPnU8bOXHHsqYXllqV2-wr02JYq3tfB42ELr097b9i-EI6IgMdnFLwVx8LFY3vZYUKwOFKa8XEHnDJq8Tdrzu9m7__-GRqCSmQ1Tr_5axfr5-WKZh6-3721UBZD7L8LR-0QnijBJCytLEEyom9mzlyjxORD3RA9AFtRwWFpOjZgAyHmNCNA',
  },
  {
    title: 'DC Fast Charging vs AC Charging: What Every Indian EV Owner Should Know',
    excerpt: 'Understanding the two main types of EV charging, their costs, and when to use each for maximum efficiency.',
    category: 'Guide',
    date: 'May 28, 2026',
    readTime: '5 min read',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrkM-PDLy8Ldfmhzm-RMCa_FOKPO0-fpTFpw5soi0D0Adckcqa2fByqQlz01zPI2U5FtNwaV6m2rWqWcMtkXC7nrMwWhCk52vYObF0Hys8AQI1AUPxW6mTqPCE4VaSOqRyNiSnyRZLx5h7a2TD8kZgzUP8dmWRsTbKOb9AYkVqtedrVjyBJmpMt4xrPX7Pof-3MgDjiksa7j6tvqilpWH9-kSCYTU-8SauuCwHFq5_mHRN2o0wIPsvlgISELQDdGC1gR5DL0POXw',
  },
  {
    title: 'Top 10 EV-Friendly Road Trips in Maharashtra for 2026',
    excerpt: 'From Mumbai to Lonavala, Pune to Mahabaleshwar — the best EV road trip routes in Maharashtra with charging stops.',
    category: 'Lifestyle',
    date: 'May 22, 2026',
    readTime: '7 min read',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6PG_QOrsFYoeaCz5TaDVpmlq4GOtVKl68AoIorgYmsibvuBY0rtCaM-_MtLall8itgCdUsifhQmPP7yLuVvWdZ5hmrucLVbPAX7KzXtsXU1Hheg-_Hu3acD-ox7GssduOrWgNoUQn0VWgk09_uuKTHqgdZw687Qosw6O025Y9Db9P_htU_XTBFaz9GdOzGp_y8zIRNSTUsDwmL8cIC3QUxvzQUPYV5UbQqli1Q_Uw86xdmpDbWnpRsXS8uSQaCc0jWdH_oO8rMQ',
  },
  {
    title: 'The PM E-DRIVE Scheme: What It Means for India\'s EV Charging Infrastructure',
    excerpt: 'How India\'s latest government initiative is accelerating public charging infrastructure and what it means for EV owners.',
    category: 'Industry',
    date: 'May 15, 2026',
    readTime: '5 min read',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKgX1gKgEXDdmvAfrEBq2XKhOybnCsaWQkSQ3_zgNuZpwsOxd7IytMlKs5LEeCRVuer-87vD7e_qyyzLg_EtNwRH7qPnU8bOXHHsqYXllqV2-wr02JYq3tfB42ELr097b9i-EI6IgMdnFLwVx8LFY3vZYUKwOFKa8XEHnDJq8Tdrzu9m7__-GRqCSmQ1Tr_5axfr5-WKZh6-3721UBZD7L8LR-0QnijBJCytLEEyom9mzlyjxORD3RA9AFtRwWFpOjZgAyHmNCNA',
  },
];

const categories = ['All', 'Industry', 'Product', 'Guide', 'Lifestyle'];

export const Blog: React.FC = () => {
  useEffect(() => { document.title = 'Blog — NextCharge | EV Charging Insights & News India'; }, []);
  const [activeCategory, setActiveCategory] = useState('All');

  const featured = blogPosts.find(p => p.featured);
  const filtered = activeCategory === 'All'
    ? blogPosts.filter(p => !p.featured)
    : blogPosts.filter(p => p.category === activeCategory && !p.featured);

  return (
    <main>
      {/* Hero */}
      <section className="page-hero page-hero--centered">
        <div className="container">
          <p className="page-hero__eyebrow">📝 Blog</p>
          <h1 className="page-hero__title">
            Insights, updates <span>& more</span>
          </h1>
          <p className="page-hero__subtitle">
            Stay informed about EV charging in India, industry trends, and the future of electric mobility.
          </p>
        </div>
      </section>

      {/* Featured Article */}
      {featured && (
        <section className="page-section page-section--white" style={{ paddingBottom: 0 }}>
          <div className="container">
            <div className="blog-hero-card">
              <img className="blog-hero-card__image" src={featured.image} alt={featured.title} />
              <div className="blog-hero-card__content">
                <span className="blog-hero-card__category">{featured.category}</span>
                <h2 className="blog-hero-card__title">{featured.title}</h2>
                <p className="blog-hero-card__excerpt">{featured.excerpt}</p>
                <div className="blog-hero-card__meta">
                  <span>{featured.date}</span>
                  <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-text-tertiary)' }}></span>
                  <span>{featured.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="page-section page-section--white">
        <div className="container">
          <div className="filter-tabs">
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-tab ${activeCategory === cat ? 'filter-tab--active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid-3">
            {filtered.map((post, i) => (
              <div className="guide-card" key={i} style={{ cursor: 'pointer' }}>
                <img className="guide-card__image" src={post.image} alt={post.title} />
                <div className="guide-card__content">
                  <div className="guide-card__badges">
                    <span className="guide-card__badge guide-card__badge--beginner">{post.category}</span>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: 'var(--text-body-xs)', color: 'var(--color-text-tertiary)' }}>
                    <span>{post.date}</span>
                    <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'var(--color-text-tertiary)' }}></span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="page-cta">
        <div className="container">
          <h2>Never miss an update</h2>
          <p>Subscribe to our newsletter for the latest EV charging insights and NextCharge news.</p>
          <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '480px', margin: '0 auto' }}>
            <input
              type="email"
              placeholder="Enter your email"
              required
              style={{
                flex: 1,
                minWidth: '240px',
                padding: '14px 20px',
                borderRadius: 'var(--radius-button)',
                border: '1.5px solid rgba(255,255,255,0.15)',
                background: 'rgba(255,255,255,0.05)',
                color: '#fff',
                fontSize: 'var(--text-body-sm)',
                fontFamily: 'var(--font-primary)',
              }}
            />
            <button className="form-submit">Subscribe</button>
          </form>
        </div>
      </section>
    </main>
  );
};
