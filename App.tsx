import React from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import BlogList from './pages/BlogList';
import BlogPostPage from './pages/BlogPost';
import { AboutPage, ContactPage, PrivacyPage, TermsPage, NotFoundPage } from './pages/StaticPages';
import ThankYouPage from './pages/ThankYou';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';

// Protected Route Wrapper
const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const isAuthenticated = localStorage.getItem('isAdmin') === 'true';
  return isAuthenticated ? children : <Navigate to="/editor/login" />;
};

import ScrollToTop from './components/ScrollToTop';
import AnalyticsTracker from './components/AnalyticsTracker';

const App: React.FC = () => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey="6Lci2yMsAAAAAPHG-vdGZd1H1zWsyBI2LWdNazoT">
      <Router>
        <ScrollToTop />
        <AnalyticsTracker />
        <Routes>
          {/* Public Routes wrapped in Layout */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/blog" element={<Layout><BlogList /></Layout>} />
          <Route path="/category/:category" element={<Layout><BlogList /></Layout>} />
          <Route path="/blog/:slug" element={<Layout><BlogPostPage /></Layout>} />

          <Route path="/about" element={<Layout><AboutPage /></Layout>} />
          <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
          <Route path="/privacy" element={<Layout><PrivacyPage /></Layout>} />
          <Route path="/terms" element={<Layout><TermsPage /></Layout>} />
          <Route path="/thank-you" element={<Layout><ThankYouPage /></Layout>} />

          {/* Admin Routes (No Layout or custom Layout) */}
          <Route path="/editor/login" element={<Login />} />
          <Route
            path="/editor"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Layout><NotFoundPage /></Layout>} />
        </Routes>
      </Router>
    </GoogleReCaptchaProvider>
  );
};

export default App;