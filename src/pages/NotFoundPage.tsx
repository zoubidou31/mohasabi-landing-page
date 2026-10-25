import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, HelpCircle, Home, Tag } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { usePageTitle } from '../i18n/usePageTitle';
import { Button } from '../components/ui/Button';

export const NotFoundPage: React.FC = () => {
  const { t } = useLanguage();
  usePageTitle('notFound.title');

  return (
    <section className="section bg-surface min-h-[70vh] flex items-center justify-center pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6 max-w-2xl text-center">
        <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary font-bold rounded-full text-sm mb-4">
          404
        </span>
        <h1 className="text-3xl md:text-5xl font-bold text-neutral-900 mb-4 tracking-tight">
          {t('notFound.heading')}
        </h1>
        <p className="text-neutral-600 text-lg leading-relaxed mb-8 max-w-xl mx-auto">
          {t('notFound.body')}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <Button to="/" variant="primary" size="lg">
            <Home className="w-4 h-4" aria-hidden="true" />
            {t('notFound.homeBtn')}
          </Button>
          <Button to="/support" variant="secondary" size="lg">
            <HelpCircle className="w-4 h-4" aria-hidden="true" />
            {t('notFound.supportBtn')}
          </Button>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-surface-muted p-6 text-start">
          <h2 className="text-sm font-semibold text-neutral-900 mb-3">{t('notFound.suggestedTitle')}</h2>
          <ul className="grid sm:grid-cols-2 gap-2 text-sm">
            <li>
              <Link
                to="/installation"
                className="inline-flex items-center gap-2 text-primary hover:underline p-1.5"
              >
                <BookOpen className="w-4 h-4" aria-hidden="true" />
                {t('nav.guide')}
              </Link>
            </li>
            <li>
              <Link
                to="/pricing"
                className="inline-flex items-center gap-2 text-primary hover:underline p-1.5"
              >
                <Tag className="w-4 h-4" aria-hidden="true" />
                {t('nav.pricing')}
              </Link>
            </li>
            <li>
              <Link
                to="/updates"
                className="inline-flex items-center gap-2 text-primary hover:underline p-1.5"
              >
                <ArrowLeft className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
                {t('nav.whatsNew')}
              </Link>
            </li>
            <li>
              <Link
                to="/reviews"
                className="inline-flex items-center gap-2 text-primary hover:underline p-1.5"
              >
                <ArrowLeft className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
                {t('nav.reviews')}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
