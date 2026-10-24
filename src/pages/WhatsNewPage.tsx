import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CalendarDays, Download, FileCheck2, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useSeo } from '../i18n/useSeo';
import { PageHeader } from '../components/ui/PageHeader';
import { Button } from '../components/ui/Button';
import { releases, formatBytes, type ReleaseRecord } from '../content/releases';

const useDateFormat = () => {
  const { locale } = useLanguage();
  return (isoDate: string): string =>
    new Intl.DateTimeFormat(locale === 'ar' ? 'ar-DZ' : locale === 'fr' ? 'fr-DZ' : 'en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(`${isoDate}T00:00:00Z`));
};

export const ReleaseCard: React.FC<{ release: ReleaseRecord; detailLabel: string }> = ({
  release,
  detailLabel,
}) => {
  const { t, locale } = useLanguage();
  const formatDate = useDateFormat();
  const notes = release.notes[locale];

  return (
    <motion.article
      className="card p-6 md:p-7"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <span className="badge bg-primary/10 text-primary font-semibold">
          {release.version}
        </span>
        <span className="badge bg-neutral-100 text-neutral-700">
          <CalendarDays className="w-3.5 h-3.5" aria-hidden="true" />
          {formatDate(release.publishedAt)}
        </span>
        <span className="badge bg-plan-pro-light text-plan-pro">
          <FileCheck2 className="w-3.5 h-3.5" aria-hidden="true" />
          {t('whatsNew.publishedBadge')}
        </span>
      </div>

      <h2 className="text-xl font-bold text-neutral-900 mb-2 text-balance">{notes.headline}</h2>
      <p className="text-neutral-600 leading-relaxed mb-5">{notes.summary}</p>

      <dl className="grid sm:grid-cols-2 gap-3 text-sm mb-6">
        <div className="rounded-xl bg-surface-muted border border-neutral-200 px-4 py-3">
          <dt className="text-neutral-500 mb-1">{t('whatsNew.sizeLabel')}</dt>
          <dd className="font-medium text-neutral-900">
            {formatBytes(release.assetSizeBytes, locale)}
          </dd>
        </div>
        <div className="rounded-xl bg-surface-muted border border-neutral-200 px-4 py-3">
          <dt className="text-neutral-500 mb-1">{t('whatsNew.assetLabel')}</dt>
          <dd className="font-medium text-neutral-900 break-all">{release.assetName}</dd>
        </div>
      </dl>

      <div className="flex flex-wrap items-center gap-3">
        <Button href={release.downloadUrl} target="_blank" variant="primary">
          <Download className="w-4 h-4" aria-hidden="true" />
          {t('whatsNew.downloadBtn')}
        </Button>
        <Button to={`/whats-new/${release.version}`} variant="secondary">
          {detailLabel}
        </Button>
      </div>
    </motion.article>
  );
};

export const WhatsNewPage: React.FC = () => {
  const { t } = useLanguage();
  useSeo('seo.page.whatsNew', 'seo.desc.whatsNew');
  const [latest] = releases;

  return (
    <>
      <PageHeader
        badge={t('whatsNew.badge')}
        title={t('whatsNew.title')}
        subtitle={t('whatsNew.subtitle')}
        titleId="whats-new-title"
      />

      <section className="section bg-surface">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              {latest ? (
                <div className="rounded-card border border-primary/20 bg-primary-light p-5 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5 text-primary" aria-hidden="true" />
                  <p className="text-sm text-neutral-700 leading-relaxed">
                    {t('whatsNew.latestNote').replace('{version}', latest.version)}
                  </p>
                </div>
              ) : null}

              <div className="space-y-6">
                {releases.map((release) => (
                  <ReleaseCard
                    key={release.version}
                    release={release}
                    detailLabel={t('whatsNew.detailsBtn')}
                  />
                ))}
              </div>
            </div>

            <aside className="lg:col-span-4 space-y-6">
              <div className="card p-6">
                <h2 className="font-semibold text-neutral-900 mb-3">
                  {t('whatsNew.sourceTitle')}
                </h2>
                <p className="text-sm text-neutral-600 leading-relaxed mb-4">
                  {t('whatsNew.sourceBody')}
                </p>
                <Button
                  href="https://github.com/zoubidou31/mohasabi-releases/releases"
                  target="_blank"
                  variant="secondary"
                >
                  {t('whatsNew.releasesLink')}
                </Button>
              </div>

              <div className="card p-6">
                <h2 className="font-semibold text-neutral-900 mb-3">{t('whatsNew.roadmapTitle')}</h2>
                <p className="text-sm text-neutral-600 leading-relaxed">{t('whatsNew.roadmapBody')}</p>
              </div>

              <div className="card p-6">
                <h2 className="font-semibold text-neutral-900 mb-3">
                  {t('whatsNew.autoUpdateTitle')}
                </h2>
                <p className="text-sm text-neutral-600 leading-relaxed mb-4">
                  {t('whatsNew.autoUpdateBody')}
                </p>
                <Link
                  to="/guide"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-md"
                >
                  <ArrowLeft className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
                  {t('whatsNew.guideLink')}
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};
