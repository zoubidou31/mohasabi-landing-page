import { Link } from 'react-router-dom';
import { Scale } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { usePageTitle } from '../i18n/usePageTitle';
import { PageHeader } from '../components/ui/PageHeader';
import { siteConfig } from '../config/siteConfig';
import type { TranslationKey } from '../i18n/translations';

const sections: readonly { id: string; titleKey: TranslationKey; bodyKey: TranslationKey }[] = [
  { id: 'acceptance', titleKey: 'terms.acceptance.title', bodyKey: 'terms.acceptance.body' },
  { id: 'licence', titleKey: 'terms.licence.title', bodyKey: 'terms.licence.body' },
  { id: 'warranty', titleKey: 'terms.warranty.title', bodyKey: 'terms.warranty.body' },
  { id: 'data', titleKey: 'terms.data.title', bodyKey: 'terms.data.body' },
  { id: 'pricing', titleKey: 'terms.pricing.title', bodyKey: 'terms.pricing.body' },
  { id: 'updates', titleKey: 'terms.updates.title', bodyKey: 'terms.updates.body' },
  { id: 'property', titleKey: 'terms.property.title', bodyKey: 'terms.property.body' },
  { id: 'liability', titleKey: 'terms.liability.title', bodyKey: 'terms.liability.body' },
  { id: 'changes', titleKey: 'terms.changes.title', bodyKey: 'terms.changes.body' },
];

export const TermsPage: React.FC = () => {
  const { t } = useLanguage();
  usePageTitle('seo.page.terms');

  return (
    <>
      <PageHeader
        badge={t('terms.badge')}
        title={t('terms.title')}
        subtitle={t('terms.subtitle')}
        titleId="terms-title"
        tone="light"
      />

      <section className="section bg-neutral-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-5">
              {sections.map((section) => (
                <article
                  key={section.id}
                  id={section.id}
                  className="bg-white rounded-card border border-neutral-200 p-6 md:p-7 shadow-[var(--shadow-card)]"
                  aria-labelledby={`terms-${section.id}-title`}
                >
                  <h2
                    id={`terms-${section.id}-title`}
                    className="font-semibold text-neutral-900 mb-2.5"
                  >
                    {t(section.titleKey)}
                  </h2>
                  <p className="text-sm text-neutral-600 leading-relaxed">{t(section.bodyKey)}</p>
                </article>
              ))}

              <div className="bg-white rounded-card border border-neutral-200 p-6 md:p-7 shadow-[var(--shadow-card)]">
                <h2 id="terms-contact-title" className="font-semibold text-neutral-900 mb-2.5">
                  {t('terms.contact.title')}
                </h2>
                <p className="text-sm text-neutral-600 leading-relaxed mb-4">
                  {t('terms.contact.body')}
                </p>
                <div className="flex flex-wrap gap-3 text-sm">
                  <a
                    href={siteConfig.contact.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary hover:underline rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    {t('contact.whatsapp')}
                  </a>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="font-medium text-primary hover:underline rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    {t('contact.email')}
                  </a>
                </div>
              </div>
            </div>

            <aside className="lg:col-span-4">
              <nav
                className="lg:sticky lg:top-24 bg-white rounded-card border border-neutral-200 p-6 shadow-[var(--shadow-card)]"
                aria-label={t('terms.contentsAria')}
              >
                <h2 className="flex items-center gap-2 font-semibold text-neutral-900 mb-4">
                  <Scale className="w-4 h-4 text-primary" aria-hidden="true" />
                  {t('terms.contentsTitle')}
                </h2>
                <ol className="space-y-2 text-sm">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="text-neutral-600 hover:text-primary rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                      >
                        {t(section.titleKey)}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a
                      href="#contact"
                      className="text-neutral-600 hover:text-primary rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      {t('terms.contact.title')}
                    </a>
                  </li>
                </ol>
                <p className="mt-5 pt-4 border-t border-neutral-200 text-xs text-neutral-500 leading-relaxed">
                  {t('terms.privacyNote')}{' '}
                  <Link
                    to="/privacy"
                    className="text-primary underline underline-offset-4 rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    {t('footer.links.privacy')}
                  </Link>
                </p>
              </nav>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};
