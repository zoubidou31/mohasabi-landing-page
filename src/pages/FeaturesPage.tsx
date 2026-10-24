import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Boxes,
  FileSpreadsheet,
  FileText,
  HardDrive,
  KeyRound,
  Languages,
  Moon,
  PieChart,
  Users,
  Wallet,
  WifiOff,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { usePageTitle } from '../i18n/usePageTitle';
import { PageHeader } from '../components/ui/PageHeader';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import type { TranslationKey } from '../i18n/translations';

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  titleKey: TranslationKey;
  descKey: TranslationKey;
  benefitKey: TranslationKey;
}

interface FeatureGroup {
  id: string;
  titleKey: TranslationKey;
  features: readonly Feature[];
}

// Every entry below describes a capability present in the published release.
const groups: readonly FeatureGroup[] = [
  {
    id: 'documents',
    titleKey: 'feat.group.documents',
    features: [
      {
        icon: FileText,
        titleKey: 'features.documents.title',
        descKey: 'features.documents.desc',
        benefitKey: 'feat.documents.benefit',
      },
      {
        icon: PieChart,
        titleKey: 'features.reports.title',
        descKey: 'features.reports.desc',
        benefitKey: 'feat.reports.benefit',
      },
      {
        icon: FileSpreadsheet,
        titleKey: 'feat.import.title',
        descKey: 'feat.import.desc',
        benefitKey: 'feat.import.benefit',
      },
    ],
  },
  {
    id: 'people',
    titleKey: 'feat.group.people',
    features: [
      {
        icon: Users,
        titleKey: 'features.partners.title',
        descKey: 'features.partners.desc',
        benefitKey: 'feat.partners.benefit',
      },
      {
        icon: Wallet,
        titleKey: 'features.debts.title',
        descKey: 'features.debts.desc',
        benefitKey: 'feat.debts.benefit',
      },
    ],
  },
  {
    id: 'inventory',
    titleKey: 'feat.group.inventory',
    features: [
      {
        icon: Boxes,
        titleKey: 'features.stock.title',
        descKey: 'features.stock.desc',
        benefitKey: 'feat.stock.benefit',
      },
    ],
  },
  {
    id: 'trust',
    titleKey: 'feat.group.trust',
    features: [
      {
        icon: HardDrive,
        titleKey: 'features.localData.title',
        descKey: 'features.localData.desc',
        benefitKey: 'feat.localData.benefit',
      },
      {
        icon: KeyRound,
        titleKey: 'feat.licence.title',
        descKey: 'feat.licence.desc',
        benefitKey: 'feat.licence.benefit',
      },
      {
        icon: WifiOff,
        titleKey: 'feat.offline.title',
        descKey: 'feat.offline.desc',
        benefitKey: 'feat.offline.benefit',
      },
      {
        icon: Languages,
        titleKey: 'features.languages.title',
        descKey: 'features.languages.desc',
        benefitKey: 'feat.languages.benefit',
      },
      {
        icon: Moon,
        titleKey: 'feat.theme.title',
        descKey: 'feat.theme.desc',
        benefitKey: 'feat.theme.benefit',
      },
    ],
  },
];

export const FeaturesPage: React.FC = () => {
  const { t } = useLanguage();
  usePageTitle('seo.page.features');

  return (
    <>
      <PageHeader
        badge={t('featuresPage.badge')}
        title={t('featuresPage.title')}
        subtitle={t('featuresPage.subtitle')}
        titleId="features-page-title"
      />

      <div className="bg-surface">
        {groups.map((group, groupIndex) => (
          <section
            key={group.id}
            id={group.id}
            aria-labelledby={`${group.id}-title`}
            className={`section ${groupIndex % 2 === 1 ? 'bg-surface-muted' : 'bg-surface'}`}
          >
            <div className="container mx-auto px-4 md:px-6">
              <SectionHeading
                title={t(group.titleKey)}
                titleId={`${group.id}-title`}
                align="start"
              />

              <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {group.features.map((feature, index) => (
                  <motion.li
                    key={feature.titleKey}
                    className="card card-hover p-6 flex flex-col gap-3"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 text-primary">
                      <feature.icon className="w-5 h-5" aria-hidden="true" />
                    </span>
                    <h3 className="font-semibold text-neutral-900">{t(feature.titleKey)}</h3>
                    <p className="text-sm text-neutral-600 leading-relaxed">{t(feature.descKey)}</p>
                    <p className="mt-auto pt-3 text-sm text-neutral-700 border-t border-neutral-100">
                      <span className="font-semibold text-primary">
                        {t('feat.benefitLabel')}
                      </span>{' '}
                      {t(feature.benefitKey)}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </div>
          </section>
        ))}

        <section className="section bg-primary-light border-t border-primary/10">
          <div className="container mx-auto px-4 md:px-6 flex flex-col items-center gap-5 text-center">
            <h2 className="text-section font-bold text-neutral-900 text-balance">
              {t('featuresPage.ctaTitle')}
            </h2>
            <p className="max-w-2xl text-lead text-neutral-600">{t('featuresPage.ctaBody')}</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button to="/guide" variant="primary" size="lg">
                {t('featuresPage.guideCta')}
              </Button>
              <Button to="/pricing" variant="secondary" size="lg">
                {t('featuresPage.pricingCta')}
              </Button>
              <Link
                to="/whats-new"
                className="text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {t('featuresPage.updatesCta')}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
