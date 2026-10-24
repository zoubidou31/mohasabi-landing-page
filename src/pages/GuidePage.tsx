import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowLeft,
  Boxes,
  Building2,
  Database,
  Download,
  FileText,
  Languages,
  LifeBuoy,
  PieChart,
  ShieldCheck,
  Wallet,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { usePageTitle } from '../i18n/usePageTitle';
import { PageHeader } from '../components/ui/PageHeader';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { TutorialVideo } from '../components/sections/TutorialVideo';
import { SystemRequirements } from '../components/sections/SystemRequirements';
import { getDownloadState, siteConfig } from '../config/siteConfig';
import type { TranslationKey } from '../i18n/translations';

interface Step {
  titleKey: TranslationKey;
  descKey: TranslationKey;
}

// Ordered exactly as a real installation runs, so the numbers are meaningful.
const steps: readonly Step[] = [
  { titleKey: 'guide.step.req.title', descKey: 'guide.step.req.desc' },
  { titleKey: 'guide.step1.title', descKey: 'guide.step1.desc' },
  { titleKey: 'guide.step.fileCheck.title', descKey: 'guide.step.fileCheck.desc' },
  { titleKey: 'guide.step.shaCheck.title', descKey: 'guide.step.shaCheck.desc' },
  { titleKey: 'guide.step2.title', descKey: 'guide.step2.desc' },
  { titleKey: 'guide.step.setupFinish.title', descKey: 'guide.step.setupFinish.desc' },
  { titleKey: 'guide.step3.title', descKey: 'guide.step3.desc' },
  { titleKey: 'guide.step.activation.title', descKey: 'guide.step.activation.desc' },
  { titleKey: 'guide.step.firstInvoice.title', descKey: 'guide.step.firstInvoice.desc' },
  { titleKey: 'guide.step.partners.title', descKey: 'guide.step.partners.desc' },
  { titleKey: 'guide.step.stock.title', descKey: 'guide.step.stock.desc' },
  { titleKey: 'guide.step.backup.title', descKey: 'guide.step.backup.desc' },
  { titleKey: 'guide.step.troubleshooting.title', descKey: 'guide.step.troubleshooting.desc' },
  { titleKey: 'guide.step.contact.title', descKey: 'guide.step.contact.desc' },
];

const coreFunctions: readonly { icon: React.ComponentType<{ className?: string }>; titleKey: TranslationKey }[] = [
  { icon: FileText, titleKey: 'features.documents.title' },
  { icon: Building2, titleKey: 'features.partners.title' },
  { icon: Wallet, titleKey: 'features.debts.title' },
  { icon: Boxes, titleKey: 'features.stock.title' },
  { icon: PieChart, titleKey: 'features.reports.title' },
  { icon: Languages, titleKey: 'features.languages.title' },
  { icon: Database, titleKey: 'features.localData.title' },
];

const smartChecks: readonly TranslationKey[] = [
  'guide.smart.check1',
  'guide.smart.check2',
  'guide.smart.check3',
];

export const GuidePage: React.FC = () => {
  const { t } = useLanguage();
  usePageTitle('seo.page.guide');
  const download = getDownloadState();
  const isReady = download.status === 'ready';

  return (
    <>
      <PageHeader
        badge={t('guide.badge')}
        title={t('guide.title')}
        subtitle={t('guide.subtitle')}
        titleId="guide-title"
      />

      <TutorialVideo />

      <section className="section bg-primary-light" aria-labelledby="guide-steps-title">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading
            eyebrow={t('guide.badge')}
            title={t('guide.stepsTitle')}
            titleId="guide-steps-title"
            subtitle={t('guide.stepNote')}
            align="start"
          />

          <ol className="grid md:grid-cols-2 gap-4 list-none">
            {steps.map((step, index) => (
              <li
                key={step.titleKey}
                className="card flex gap-4 p-5 items-start"
              >
                <span
                  className="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-full bg-primary text-white text-sm font-bold"
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-1">{t(step.titleKey)}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">{t(step.descKey)}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              variant="primary"
              size="lg"
              onClick={() => isReady && window.open(download.url, '_blank', 'noopener,noreferrer')}
              disabled={!isReady}
            >
              <Download className="w-5 h-5" aria-hidden="true" />
              {t(isReady ? 'hero.downloadBtn' : 'hero.downloadPendingBtn')}
            </Button>
            <span className="text-sm text-neutral-600">
              {siteConfig.release.version} · {siteConfig.release.setupAssetName}
            </span>
            <Link
              to="/whats-new"
              className="text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded"
            >
              {t('guide.smart.hashLink')}
            </Link>
          </div>
        </div>
      </section>

      <section
        id="smartscreen"
        className="section bg-surface border-y border-neutral-200"
        aria-labelledby="smartscreen-title"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="card p-6 md:p-8 border-amber-300">
            <div className="flex items-start gap-4 mb-5">
              <span className="shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-xl bg-amber-100 text-amber-700">
                <AlertTriangle className="w-5 h-5" aria-hidden="true" />
              </span>
              <div>
                <h2 id="smartscreen-title" className="text-section font-bold text-neutral-900 mb-2 text-balance">
                  {t('guide.smart.title')}
                </h2>
                <p className="text-neutral-600 leading-relaxed">{t('guide.smart.body')}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="flex items-center gap-2 font-semibold text-neutral-900 mb-3">
                  <ShieldCheck className="w-4 h-4 text-primary" aria-hidden="true" />
                  {t('guide.smart.checkTitle')}
                </h3>
                <ul className="space-y-2.5">
                  {smartChecks.map((key) => (
                    <li key={key} className="flex gap-3 text-sm text-neutral-700 leading-relaxed">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden="true" />
                      {t(key)}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-neutral-900 mb-3">{t('guide.smart.stepsTitle')}</h3>
                <p className="text-sm text-neutral-700 leading-relaxed mb-4">{t('guide.smart.steps')}</p>
                <p className="text-sm text-neutral-600 leading-relaxed">{t('guide.smart.recentBuild')}</p>
              </div>
            </div>

            <p className="mt-6 rounded-xl bg-amber-50 border border-amber-300 p-4 text-sm text-neutral-800 leading-relaxed">
              {t('guide.smart.warn')}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Button href={siteConfig.release.releasesUrl} target="_blank" variant="secondary">
                {t('guide.smart.releasesCta')}
              </Button>
              <Button to="/whats-new" variant="ghost">
                {t('guide.smart.hashLink')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-surface" aria-labelledby="guide-functions-title">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading
            title={t('guide.functionsTitle')}
            titleId="guide-functions-title"
            subtitle={t('guide.functionsIntro')}
            align="start"
          />
          <ul className="grid sm:grid-cols-2 gap-4 max-w-3xl">
            {coreFunctions.map((fn) => (
              <li
                key={fn.titleKey}
                className="flex items-start gap-3 rounded-xl border border-neutral-200 bg-surface-muted px-5 py-4"
              >
                <fn.icon className="w-5 h-5 mt-0.5 text-primary shrink-0" aria-hidden="true" />
                <span className="font-medium text-neutral-800">{t(fn.titleKey)}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SystemRequirements />

      <section className="section bg-neutral-900 text-white" aria-labelledby="guide-help-title">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 id="guide-help-title" className="text-section font-bold mb-3">
            {t('guide.helpTitle')}
          </h2>
          <p className="text-neutral-300 mb-8 max-w-xl mx-auto leading-relaxed">{t('guide.helpBody')}</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/support"
              className="inline-flex items-center gap-2 bg-white text-neutral-900 font-medium px-6 py-3 rounded-xl hover:bg-neutral-100 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <LifeBuoy className="w-5 h-5" aria-hidden="true" />
              {t('guide.supportCta')}
            </Link>
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 border border-white/40 font-medium px-6 py-3 rounded-xl hover:bg-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {t('guide.pricingCta')}
              <ArrowLeft className="w-5 h-5 rtl:rotate-180" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
