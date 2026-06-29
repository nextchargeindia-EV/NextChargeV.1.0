import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { useEffect } from 'react';

import { Home } from './pages/Home';
import { FindChargers } from './pages/FindChargers';
import { TripPlanner } from './pages/TripPlanner';
import { Pricing } from './pages/Pricing';
import { Business } from './pages/Business';
import { About } from './pages/About';
import { Careers } from './pages/Careers';
import { Press } from './pages/Press';
import { Contact } from './pages/Contact';
import { HelpCenter } from './pages/HelpCenter';
import { FAQs } from './pages/FAQs';
import { ReportIssue } from './pages/ReportIssue';
import { Terms } from './pages/Terms';
import { Privacy } from './pages/Privacy';
import { RefundPolicy } from './pages/RefundPolicy';
import { Blog } from './pages/Blog';
import { Guides } from './pages/Guides';
import { ApiDocs } from './pages/ApiDocs';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/find-chargers" element={<FindChargers />} />
          <Route path="/trip-planner" element={<TripPlanner />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/business" element={<Business />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/press" element={<Press />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/report-issue" element={<ReportIssue />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/api-docs" element={<ApiDocs />} />
        </Routes>
        <Footer />
      </Router>
    </AppProvider>
  );
};

export default App;
