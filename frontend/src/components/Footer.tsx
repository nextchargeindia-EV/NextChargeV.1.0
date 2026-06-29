import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000); // hide message after 5 seconds
    }
  };

  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <img src="/assets/logo.png" className="footer__logo-icon" alt="NextCharge Logo" style={{ width: 'auto', height: '24px' }} />
              <span className="footer__logo-text">NextCharge</span>
            </Link>
            <p className="footer__tagline">Making EV charging simple, reliable and accessible for everyone.</p>
            <div className="footer__social">
              <a href="#" className="footer__social-link" aria-label="Facebook">
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>public</span>
              </a>
              <a href="#" className="footer__social-link" aria-label="Instagram">
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>photo_camera</span>
              </a>
              <a href="#" className="footer__social-link" aria-label="Twitter">
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>chat</span>
              </a>
              <a href="#" className="footer__social-link" aria-label="LinkedIn">
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>business_center</span>
              </a>
            </div>
          </div>

          <div className="footer__column">
            <h4 className="footer__column-title">Company</h4>
            <nav className="footer__links">
              <Link to="/about" className="footer__link">About Us</Link>
              <Link to="/careers" className="footer__link">Careers</Link>
              <Link to="/press" className="footer__link">Press</Link>
              <Link to="/contact" className="footer__link">Contact Us</Link>
            </nav>
          </div>

          <div className="footer__column">
            <h4 className="footer__column-title">Support</h4>
            <nav className="footer__links">
              <Link to="/help" className="footer__link">Help Center</Link>
              <Link to="/faqs" className="footer__link">FAQs</Link>
              <Link to="/help#live-chat" className="footer__link">Live Chat</Link>
              <Link to="/report-issue" className="footer__link">Report an Issue</Link>
            </nav>
          </div>

          <div className="footer__column">
            <h4 className="footer__column-title">Legal</h4>
            <nav className="footer__links">
              <Link to="/terms" className="footer__link">Terms of Service</Link>
              <Link to="/privacy" className="footer__link">Privacy Policy</Link>
              <Link to="/refund-policy" className="footer__link">Refund Policy</Link>
            </nav>
          </div>

          <div className="footer__column">
            <h4 className="footer__column-title">Resources</h4>
            <nav className="footer__links">
              <Link to="/blog" className="footer__link">Blog</Link>
              <Link to="/guides" className="footer__link">Guides</Link>
              <Link to="/business" className="footer__link">For Business</Link>
              <Link to="/api-docs" className="footer__link">API Docs</Link>
            </nav>
          </div>

          <div className="footer__newsletter">
            <h4 className="footer__newsletter-title">Stay Updated</h4>
            <p className="footer__newsletter-text">Subscribe to our newsletter for the latest updates and offers.</p>
            {subscribed ? (
              <div style={{ color: 'var(--color-success)', fontSize: '12px', fontWeight: 'bold', margin: '10px 0' }}>
                🎉 Successfully subscribed to the newsletter!
              </div>
            ) : (
              <form className="footer__newsletter-form" onSubmit={handleSubscribeSubmit}>
                <input
                  type="email"
                  className="footer__newsletter-input"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="footer__newsletter-btn">Subscribe</button>
              </form>
            )}
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">© {new Date().getFullYear()} NextCharge Technologies Pvt. Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
