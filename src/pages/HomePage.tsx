import { Hero } from '../components/sections/Hero';
import { Challenges } from '../components/sections/Challenges';
import { Features } from '../components/sections/Features';
import { ScreenshotGallery } from '../components/sections/ScreenshotGallery';
import { HowItWorks } from '../components/sections/HowItWorks';
import { OfflineWork } from '../components/sections/OfflineWork';
import { DataSecurity } from '../components/sections/DataSecurity';
import { Audience } from '../components/sections/Audience';
import { PricingPreview } from '../components/sections/PricingPreview';
import { FAQ } from '../components/sections/FAQ';
import { DownloadCTA } from '../components/sections/DownloadCTA';
import { usePageTitle } from '../i18n/usePageTitle';

export const HomePage: React.FC = () => {
  usePageTitle('seo.page.home');

  return (
    <>
      <Hero />
      <Challenges />
      <Features />
      <ScreenshotGallery />
      <HowItWorks />
      <OfflineWork />
      <DataSecurity />
      <Audience />
      <PricingPreview />
      <FAQ />
      <DownloadCTA />
    </>
  );
};
