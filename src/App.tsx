import { lazy, Suspense } from 'react';
import { MotionConfig } from 'framer-motion';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LanguageProvider } from './i18n/LanguageContext';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { Loader2 } from 'lucide-react';

const PricingPage = lazy(() => import('./pages/PricingPage').then((m) => ({ default: m.PricingPage })));
const InstallationPage = lazy(() => import('./pages/InstallationPage').then((m) => ({ default: m.InstallationPage })));
const SupportPage = lazy(() => import('./pages/SupportPage').then((m) => ({ default: m.SupportPage })));
const ReviewsPage = lazy(() => import('./pages/ReviewsPage').then((m) => ({ default: m.ReviewsPage })));
const UpdatesPage = lazy(() => import('./pages/UpdatesPage').then((m) => ({ default: m.UpdatesPage })));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage').then((m) => ({ default: m.PrivacyPage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then((m) => ({ default: m.TermsPage })));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));

const PageFallback = () => (
  <div className="min-h-[50vh] flex items-center justify-center py-20" role="status">
    <Loader2 className="w-8 h-8 animate-spin text-primary" aria-label="Loading page" />
  </div>
);

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <LanguageProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route
                path="pricing"
                element={
                  <Suspense fallback={<PageFallback />}>
                    <PricingPage />
                  </Suspense>
                }
              />
              <Route
                path="installation"
                element={
                  <Suspense fallback={<PageFallback />}>
                    <InstallationPage />
                  </Suspense>
                }
              />
              <Route
                path="support"
                element={
                  <Suspense fallback={<PageFallback />}>
                    <SupportPage />
                  </Suspense>
                }
              />
              <Route
                path="reviews"
                element={
                  <Suspense fallback={<PageFallback />}>
                    <ReviewsPage />
                  </Suspense>
                }
              />
              <Route
                path="updates"
                element={
                  <Suspense fallback={<PageFallback />}>
                    <UpdatesPage />
                  </Suspense>
                }
              />
              <Route
                path="privacy"
                element={
                  <Suspense fallback={<PageFallback />}>
                    <PrivacyPage />
                  </Suspense>
                }
              />
              <Route
                path="terms"
                element={
                  <Suspense fallback={<PageFallback />}>
                    <TermsPage />
                  </Suspense>
                }
              />
              <Route
                path="admin"
                element={
                  <Suspense fallback={<PageFallback />}>
                    <AdminPage />
                  </Suspense>
                }
              />

              {/* Backward compatibility redirects */}
              <Route path="guide" element={<Navigate to="/installation" replace />} />
              <Route path="whats-new" element={<Navigate to="/updates" replace />} />
              <Route path="whats-new/:version" element={<Navigate to="/updates" replace />} />
              <Route path="updates/:version" element={<Navigate to="/updates" replace />} />
              <Route path="features" element={<Navigate to="/#features" replace />} />

              {/* Dedicated accessible 404 page */}
              <Route
                path="*"
                element={
                  <Suspense fallback={<PageFallback />}>
                    <NotFoundPage />
                  </Suspense>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </MotionConfig>
  );
}

export default App;
