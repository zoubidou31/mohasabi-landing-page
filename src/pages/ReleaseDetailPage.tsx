import { Link, useParams } from 'react-router-dom';
import { AlertTriangle, ArrowLeft, Check, Download, Copy } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useSeo } from '../i18n/useSeo';
import { Button } from '../components/ui/Button';
import { releases, formatBytes } from '../content/releases';

const Section: React.FC<{ title: string; items: readonly string[] }> = ({ title, items }) => {
  if (items.length === 0) return null;
  return (
    <section aria-label={title} className="mb-8">
      <h2 className="font-semibold text-neutral-900 mb-3">{title}</h2>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm text-neutral-700 leading-relaxed">
            <Check className="w-4 h-4 shrink-0 mt-1 text-primary" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export const ReleaseDetailPage: React.FC = () => {
  const { version } = useParams<{ version: string }>();
  const { t, locale } = useLanguage();
  const [copied, setCopied] = useState(false);
  const release = releases.find((entry) => entry.version === version);
  useSeo(
    'seo.page.whatsNew',
    'seo.desc.whatsNew',
    release ? `Mohasabi ${release.version} — ${t('seo.page.whatsNew')}` : undefined,
  );

  if (!release) {
    return (
      <section className="section bg-surface">
        <div className="container mx-auto px-4 md:px-6 max-w-2xl">
          <h1 className="text-section font-bold text-neutral-900 mb-4">
            {t('whatsNew.notFoundTitle')}
          </h1>
          <p className="text-neutral-600 mb-6">{t('whatsNew.notFoundBody')}</p>
          <Button to="/whats-new" variant="secondary">
            {t('whatsNew.backToList')}
          </Button>
        </div>
      </section>
    );
  }

  const notes = release.notes[locale];

  const copySha = async () => {
    try {
      await navigator.clipboard.writeText(release.sha256);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="section bg-surface">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            <Link
              to="/whats-new"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline mb-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-md"
            >
              <ArrowLeft className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
              {t('whatsNew.backToList')}
            </Link>

            <p className="badge bg-primary/10 text-primary font-semibold mb-4">
              Mohasabi {release.version}
            </p>
            <h1 className="text-display font-bold text-neutral-900 mb-4 text-balance">
              {notes.headline}
            </h1>
            <p className="text-lead text-neutral-600 leading-relaxed mb-8">{notes.summary}</p>

            <Section title={t('whatsNew.groupAdded')} items={notes.added} />
            <Section title={t('whatsNew.groupFixed')} items={notes.fixed} />
            <Section title={t('whatsNew.groupImproved')} items={notes.improved} />

            {notes.caution ? (
              <div className="rounded-card border border-amber-300 bg-amber-50 p-5 flex gap-3">
                <AlertTriangle className="w-5 h-5 shrink-0 text-amber-700" aria-hidden="true" />
                <div>
                  <h2 className="font-semibold text-neutral-900 mb-1.5">
                    {t('whatsNew.cautionTitle')}
                  </h2>
                  <p className="text-sm text-neutral-700 leading-relaxed">{notes.caution}</p>
                </div>
              </div>
            ) : null}
          </div>

          <aside className="lg:col-span-4">
            <div className="card p-6 lg:sticky lg:top-24 space-y-5">
              <div>
                <h2 className="font-semibold text-neutral-900 mb-2">
                  {t('whatsNew.downloadTitle')}
                </h2>
                <p className="text-sm text-neutral-600 mb-4 break-all">{release.assetName}</p>
                <Button href={release.downloadUrl} target="_blank" variant="primary">
                  <Download className="w-4 h-4" aria-hidden="true" />
                  {t('whatsNew.downloadBtn')}
                </Button>
              </div>

              <div className="border-t border-neutral-200 pt-4">
                <p className="text-sm text-neutral-500 mb-1">{t('whatsNew.sizeLabel')}</p>
                <p className="font-medium text-neutral-900">
                  {formatBytes(release.assetSizeBytes, locale)}
                </p>
              </div>

              <div className="border-t border-neutral-200 pt-4">
                <p className="text-sm text-neutral-500 mb-1">{t('whatsNew.shaTitle')}</p>
                <code className="block text-[11px] font-mono text-neutral-700 break-all leading-relaxed mb-2">
                  {release.sha256}
                </code>
                <button
                  type="button"
                  onClick={copySha}
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-md"
                >
                  {copied ? (
                    <Check className="w-4 h-4" aria-hidden="true" />
                  ) : (
                    <Copy className="w-4 h-4" aria-hidden="true" />
                  )}
                  {copied ? t('whatsNew.shaCopied') : t('whatsNew.shaCopy')}
                </button>
                <p className="text-xs text-neutral-500 leading-relaxed mt-3">
                  {t('whatsNew.shaHint')}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};
