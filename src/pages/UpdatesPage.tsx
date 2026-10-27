import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Download,
  FileCheck2,
  HardDrive,
  ShieldCheck,
  Sparkles,
  Wrench,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { usePageTitle } from '../i18n/usePageTitle';
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

export const ReleaseCard: React.FC<{ release: ReleaseRecord; defaultExpanded?: boolean }> = ({
  release,
  defaultExpanded = false,
}) => {
  const { t, locale } = useLanguage();
  const formatDate = useDateFormat();
  const notes = release.notes[locale];
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <motion.article
      id={`v${release.version}`}
      className="card p-6 md:p-7"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <span className="badge bg-primary/10 text-primary font-bold text-sm">
          v{release.version}
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

      <h2 className="text-xl md:text-2xl font-bold text-neutral-900 mb-2 text-balance">
        {notes.headline}
      </h2>
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

      {/* SHA-256 fingerprint removed from public UI per owner request */}

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <Button href={release.downloadUrl} target="_blank" variant="primary">
          <Download className="w-4 h-4" aria-hidden="true" />
          {t('whatsNew.downloadBtn')}
        </Button>
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-neutral-300 bg-white text-neutral-700 text-sm font-medium hover:bg-neutral-50 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          aria-expanded={expanded}
        >
          <span>{expanded ? t('whatsNew.hideDetails') : t('whatsNew.showDetails')}</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>
        <a
          href={release.releaseUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-neutral-500 hover:text-primary transition-colors ms-auto underline-offset-4 hover:underline"
        >
          GitHub Release
        </a>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden pt-4 border-t border-neutral-200 space-y-5"
          >
            {notes.added.length > 0 && (
              <div>
                <h3 className="flex items-center gap-2 text-sm font-bold text-neutral-900 mb-2">
                  <Sparkles className="w-4 h-4 text-primary" aria-hidden="true" />
                  {t('whatsNew.groupAdded')}
                </h3>
                <ul className="space-y-1.5 ps-5 list-disc text-sm text-neutral-700 leading-relaxed">
                  {notes.added.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {notes.improved.length > 0 && (
              <div>
                <h3 className="flex items-center gap-2 text-sm font-bold text-neutral-900 mb-2">
                  <Wrench className="w-4 h-4 text-primary" aria-hidden="true" />
                  {t('whatsNew.groupImproved')}
                </h3>
                <ul className="space-y-1.5 ps-5 list-disc text-sm text-neutral-700 leading-relaxed">
                  {notes.improved.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {notes.fixed.length > 0 && (
              <div>
                <h3 className="flex items-center gap-2 text-sm font-bold text-neutral-900 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" aria-hidden="true" />
                  {t('whatsNew.groupFixed')}
                </h3>
                <ul className="space-y-1.5 ps-5 list-disc text-sm text-neutral-700 leading-relaxed">
                  {notes.fixed.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {notes.caution && (
              <div className="rounded-xl bg-amber-50 border border-amber-300 p-4 flex gap-3 text-sm text-amber-900">
                <AlertTriangle className="w-5 h-5 shrink-0 text-amber-700 mt-0.5" aria-hidden="true" />
                <p className="leading-relaxed">{notes.caution}</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
};

export const UpdatesPage: React.FC = () => {
  const { t } = useLanguage();
  usePageTitle('seo.page.whatsNew');
  const [latest] = releases;

  return (
    <>
      <PageHeader
        badge={t('whatsNew.badge')}
        title={t('whatsNew.title')}
        subtitle={t('whatsNew.subtitle')}
        titleId="updates-title"
      />

      <section className="section bg-surface">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              {latest ? (
                <div className="rounded-2xl border border-primary/20 bg-primary-light p-5 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5 text-primary" aria-hidden="true" />
                  <p className="text-sm text-neutral-700 leading-relaxed">
                    {t('whatsNew.latestNote').replace('{version}', latest.version)}
                  </p>
                </div>
              ) : null}

              <div className="space-y-6">
                {releases.map((release, index) => (
                  <ReleaseCard
                    key={release.version}
                    release={release}
                    defaultExpanded={index === 0}
                  />
                ))}
              </div>
            </div>

            <aside className="lg:col-span-4 space-y-6">
              <div className="card p-6">
                <h2 className="font-semibold text-neutral-900 mb-3 flex items-center gap-2">
                  <HardDrive className="w-4 h-4 text-primary" aria-hidden="true" />
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
                  to="/installation"
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

