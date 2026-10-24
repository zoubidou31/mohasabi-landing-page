import { lazy } from 'react';
import { MotionConfig } from 'framer-motion';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LanguageProvider } from './i18n/LanguageContext';
import { Layout } from './components/layout/Layout';

const HomePage = lazy(() => import('./pages/HomePage').then((module) => ({ default: module.HomePage })));
const FeaturesPage = lazy(() => import('./pages/FeaturesPage').then((module) => ({ default: module.FeaturesPage })));
const GuidePage = lazy(() => import('./pages/GuidePage').then((module) => ({ default: module.GuidePage })));
const PricingPage = lazy(() => import('./pages/PricingPage').then((module) => ({ default: module.PricingPage })));
const SupportPage = lazy(() => import('./pages/SupportPage').then((module) => ({ default: module.SupportPage })));
const ReviewsPage = lazy(() => import('./pages/ReviewsPage').then((module) => ({ default: module.ReviewsPage })));
const WhatsNewPage = lazy(() => import('./pages/WhatsNewPage').then((module) => ({ default: module.WhatsNewPage })));
const ReleaseDetailPage = lazy(() =>
  import('./pages/ReleaseDetailPage').then((module) => ({ default: module.ReleaseDetailPage })),
);
const PrivacyPage = lazy(() => import('./pages/PrivacyPage').then((module) => ({ default: module.PrivacyPage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then((module) => ({ default: module.TermsPage })));
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage').then((module) => ({ default: module.NotFoundPage })),
);
const AdminPage = lazy(() => import('./pages/AdminPage').then((module) => ({ default: module.AdminPage })));

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
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </MotionConfig>
  );
}

export default App;
