import { MotionConfig } from 'framer-motion';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LanguageProvider } from './i18n/LanguageContext';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { FeaturesPage } from './pages/FeaturesPage';
import { GuidePage } from './pages/GuidePage';
import { PricingPage } from './pages/PricingPage';
import { SupportPage } from './pages/SupportPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { WhatsNewPage } from './pages/WhatsNewPage';
import { ReleaseDetailPage } from './pages/ReleaseDetailPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { AdminPage } from './pages/AdminPage';

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <LanguageProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="features" element={<FeaturesPage />} />
              <Route path="guide" element={<GuidePage />} />
              <Route path="pricing" element={<PricingPage />} />
              <Route path="support" element={<SupportPage />} />
              <Route path="reviews" element={<ReviewsPage />} />
              <Route path="whats-new" element={<WhatsNewPage />} />
              <Route path="whats-new/:version" element={<ReleaseDetailPage />} />
              <Route path="privacy" element={<PrivacyPage />} />
              <Route path="terms" element={<TermsPage />} />
              <Route path="admin" element={<AdminPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </MotionConfig>
  );
}

export default App;
