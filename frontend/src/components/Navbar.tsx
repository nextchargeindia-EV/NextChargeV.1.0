import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const isHome = location.pathname === '/';

    if (!isHome) {
      setScrolled(true);
      return;
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === '/';
  const isFind = location.pathname === '/find-chargers';
  const isTrip = location.pathname === '/trip-planner';
  const isPricing = location.pathname === '/pricing';
  const isBusiness = location.pathname === '/business';
  const isAbout = location.pathname === '/about';

  return (
    <>
      <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} id="navbar">
        <Link className="logo" to="/">
          <img src="/assets/logo.png" alt="NextCharge Logo" style={{ height: '24px', width: 'auto' }} />
          <span>
            <span style={{ color: '#fff' }}>Next</span>
            <span style={{ color: '#F97316' }}>Charge</span>
          </span>
        </Link>

        <ul className="nav-links">
          <li><Link to="/" className={isHome ? 'active' : ''}>Home</Link></li>
          <li><Link to="/find-chargers" className={isFind ? 'active' : ''}>Find Chargers</Link></li>
          <li><Link to="/trip-planner" className={isTrip ? 'active' : ''}>Trip Planner</Link></li>
          <li><Link to="/pricing" className={isPricing ? 'active' : ''}>Pricing</Link></li>
          <li><Link to="/business" className={isBusiness ? 'active' : ''}>Business</Link></li>
          <li><Link to="/about" className={isAbout ? 'active' : ''}>About Us</Link></li>
        </ul>

        <button
          className="navbar__mobile-toggle"
          aria-label="Menu"
          onClick={() => setDrawerOpen(!drawerOpen)}
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>

      <div className={`navbar__drawer ${drawerOpen ? 'is-open' : ''}`}>
        <div className="navbar__drawer-header">
          <Link className="logo" to="/" onClick={() => setDrawerOpen(false)}>
            <img src="/assets/logo.png" alt="NextCharge Logo" style={{ height: '24px', width: 'auto' }} />
            <span>
              <span style={{ color: 'var(--color-navy-900)' }}>Next</span>
              <span style={{ color: 'var(--color-orange-500)' }}>Charge</span>
            </span>
          </Link>
          <button className="navbar__drawer-close" onClick={() => setDrawerOpen(false)} aria-label="Close menu">
            <span className="material-symbols-outlined" style={{ color: 'var(--color-navy-900)' }}>close</span>
          </button>
        </div>

        <ul className="navbar__drawer-links">
          <li><Link to="/" className={isHome ? 'active' : ''} onClick={() => setDrawerOpen(false)}>Home</Link></li>
          <li><Link to="/find-chargers" className={isFind ? 'active' : ''} onClick={() => setDrawerOpen(false)}>Find Chargers</Link></li>
          <li><Link to="/trip-planner" className={isTrip ? 'active' : ''} onClick={() => setDrawerOpen(false)}>Trip Planner</Link></li>
          <li><Link to="/pricing" className={isPricing ? 'active' : ''} onClick={() => setDrawerOpen(false)}>Pricing</Link></li>
          <li><Link to="/business" className={isBusiness ? 'active' : ''} onClick={() => setDrawerOpen(false)}>Business</Link></li>
          <li><Link to="/about" className={isAbout ? 'active' : ''} onClick={() => setDrawerOpen(false)}>About Us</Link></li>
        </ul>
      </div>

      {drawerOpen && (
        <div className="navbar__drawer-overlay" onClick={() => setDrawerOpen(false)}></div>
      )}
    </>
  );
};
