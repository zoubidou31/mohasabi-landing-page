import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { isRTL } from '../i18n/translations';

export const NotFoundPage: React.FC = () => {
  const { t, locale } = useLanguage();

  // A 404 must stay non-indexable and must not advertise a canonical or
  // hreflang set for a path that does not exist.
  useEffect(() => {
    document.title = t('notFound.title');
    document.documentElement.lang = locale;
    document.documentElement.dir = isRTL(locale) ? 'rtl' : 'ltr';

    let description = document.head.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!description) {
      description = document.createElement('meta');
      description.name = 'description';
      document.head.appendChild(description);
    }
    description.content = t('notFound.body');

    let robots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement('meta');
      robots.name = 'robots';
      document.head.appendChild(robots);
    }
    robots.content = 'noindex, nofollow';

    document.head
      .querySelectorAll('link[rel="canonical"], link[rel="alternate"][hreflang]')
      .forEach((element) => element.remove());
  }, [t, locale]);

  return (
    <section className="section bg-surface pt-24">
      <div className="container mx-auto px-4 md:px-6 max-w-2xl text-center">
        <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-5">
          <Compass className="w-7 h-7" aria-hidden="true" />
        </span>
        <p className="text-sm font-semibold text-neutral-500 mb-2">404</p>
        <h1 className="text-section font-bold text-neutral-900 mb-3">{t('notFound.title')}</h1>
        <p className="text-neutral-600 leading-relaxed mb-7">{t('notFound.body')}</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center font-semibold rounded-xl bg-primary text-white px-6 py-3 hover:bg-primary-dark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {t('notFound.home')}
          </Link>
          <Link
            to="/support"
            className="inline-flex items-center justify-center font-semibold rounded-xl bg-surface text-primary border border-primary/30 px-6 py-3 hover:bg-primary-light transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {t('notFound.support')}
          </Link>
        </div>
      </div>
    </section>
  );
};
