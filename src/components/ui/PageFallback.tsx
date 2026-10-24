import { Loader2 } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

/** Shown only while a lazily loaded page chunk is fetched. */
export const PageFallback: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="section bg-surface" role="status" aria-busy="true">
      <div className="container mx-auto px-4 md:px-6 flex items-center gap-3 text-neutral-600">
        <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
        <span className="sr-only">{t('common.loading')}</span>
      </div>
    </div>
  );
};
