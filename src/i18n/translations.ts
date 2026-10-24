export type Locale = 'ar' | 'fr' | 'en';

export type TranslationKey =
  | 'nav.home'
  | 'nav.download'
  | 'hero.title'
  | 'hero.subtitle'
  | 'hero.downloadBtn'
  | 'hero.downloadPendingBtn'
  | 'hero.version'
  | 'hero.windowsOnly'
  | 'hero.pendingNote'
  | 'hero.releasesLink'
  | 'hero.illustrationAlt'
  | 'hero.illustrationCaption'
  | 'features.badge'
  | 'features.title'
  | 'features.subtitle'
  | 'features.localData.title'
  | 'features.localData.desc'
  | 'features.documents.title'
  | 'features.documents.desc'
  | 'features.partners.title'
  | 'features.partners.desc'
  | 'features.debts.title'
  | 'features.debts.desc'
  | 'features.stock.title'
  | 'features.stock.desc'
  | 'features.reports.title'
  | 'features.reports.desc'
  | 'features.languages.title'
  | 'features.languages.desc'
  | 'screenshots.badge'
  | 'screenshots.title'
  | 'screenshots.subtitle'
  | 'screenshots.pendingTitle'
  | 'screenshots.pendingSubtitle'
  | 'screenshots.zoomHint'
  | 'screenshots.closeAria'
  | 'screenshots.prevAria'
  | 'screenshots.nextAria'
  | 'screenshots.alt.main'
  | 'screenshots.alt.dashboard'
  | 'screenshots.alt.invoices'
  | 'screenshots.alt.clients'
  | 'screenshots.alt.products'
  | 'requirements.badge'
  | 'requirements.title'
  | 'requirements.colComponent'
  | 'requirements.colSpec'
  | 'requirements.colStatus'
  | 'requirements.statusSupported'
  | 'requirements.statusRecommended'
  | 'requirements.statusMinimum'
  | 'requirements.statusConditional'
  | 'requirements.notesTitle'
  | 'requirements.note1'
  | 'requirements.note2'
  | 'requirements.note3'
  | 'requirements.note4'
  | 'requirements.viewReleases'
  | 'requirements.os'
  | 'requirements.architecture'
  | 'requirements.processor'
  | 'requirements.ram'
  | 'requirements.diskSpace'
  | 'requirements.internet'
  | 'requirements.internet.desc'
  | 'faq.badge'
  | 'faq.title'
  | 'faq.intro'
  | 'faq.offline.q'
  | 'faq.offline.a'
  | 'faq.latest.q'
  | 'faq.latest.a'
  | 'faq.data.q'
  | 'faq.data.a'
  | 'faq.support.q'
  | 'faq.support.a'
  | 'faq.moreHelp'
  | 'faq.requirements.q'
  | 'faq.requirements.a'
  | 'faq.backup.q'
  | 'faq.backup.a'
  | 'faq.free.q'
  | 'faq.free.a'
  | 'faq.openTicket'
  | 'cta.title'
  | 'cta.subtitle'
  | 'cta.downloadBtn'
  | 'cta.note'
  | 'footer.description'
  | 'footer.pagesTitle'
  | 'footer.sectionsTitle'
  | 'footer.resourcesTitle'
  | 'footer.links.home'
  | 'footer.links.features'
  | 'footer.links.requirements'
  | 'footer.links.faq'
  | 'footer.links.releases'
  | 'footer.links.repository'
  | 'footer.copyright'
  | 'footer.versionLabel'
  | 'language.label'
  | 'contact.whatsapp'
  | 'contact.email'
  | 'seo.title'
  | 'seo.description'
  | 'a11y.mainNav'
  | 'a11y.mobileNav'
  | 'a11y.toggleMenu'
  | 'a11y.skipToContent'
  | 'nav.guide'
  | 'nav.pricing'
  | 'nav.support'
  | 'nav.features'
  | 'nav.screenshots'
  | 'nav.how'
  | 'a11y.logoAlt'
  | 'seo.page.home'
  | 'seo.page.guide'
  | 'seo.page.pricing'
  | 'seo.page.support'
  | 'footer.links.guide'
  | 'footer.links.pricing'
  | 'footer.links.support'
  | 'plan.standard.name'
  | 'plan.pro.name'
  | 'plan.enterprise.name'
  | 'duration.month'
  | 'duration.quarter'
  | 'duration.halfYear'
  | 'duration.year'
  | 'pricing.badge'
  | 'pricing.currency'
  | 'pricing.title'
  | 'pricing.subtitle'
  | 'pricing.recommended'
  | 'pricing.durationLabel'
  | 'pricing.priceLabel'
  | 'pricing.planCol'
  | 'pricing.selectPlan'
  | 'pricing.askPlan'
  | 'pricing.whatsappIntro'
  | 'pricing.inquiryIntro'
  | 'pricing.orEmail'
  | 'pricing.contactTitle'
  | 'pricing.contactBody'
  | 'pricing.indicativeTitle'
  | 'pricing.indicativeBody'
  | 'pricing.paymentTitle'
  | 'pricing.paymentBody'
  | 'pricing.termsTitle'
  | 'pricing.termsBody'
  | 'guide.badge'
  | 'guide.title'
  | 'guide.subtitle'
  | 'guide.videoTitle'
  | 'guide.videoPendingTitle'
  | 'guide.videoPendingBody'
  | 'guide.videoAria'
  | 'guide.stepsTitle'
  | 'guide.step1.title'
  | 'guide.step1.desc'
  | 'guide.step2.title'
  | 'guide.step2.desc'
  | 'guide.step3.title'
  | 'guide.step3.desc'
  | 'guide.stepNote'
  | 'guide.functionsTitle'
  | 'guide.functionsIntro'
  | 'guide.helpTitle'
  | 'guide.helpBody'
  | 'guide.supportCta'
  | 'guide.pricingCta'
  | 'support.badge'
  | 'support.title'
  | 'support.subtitle'
  | 'support.whatsappTitle'
  | 'support.whatsappBody'
  | 'support.emailTitle'
  | 'support.emailBody'
  | 'support.issuesTitle'
  | 'support.issuesBody'
  | 'support.requestTitle'
  | 'support.requestBody'
  | 'support.reqIntro'
  | 'support.req.install'
  | 'support.req.activation'
  | 'support.req.duration'
  | 'support.req.renewal'
  | 'support.req.purchase'
  | 'support.req.other'
  | 'support.infoTitle'
  | 'support.info1'
  | 'support.info2'
  | 'support.info3'
  | 'support.info4'
  | 'support.info5'
  | 'support.avoidTitle'
  | 'support.avoid1'
  | 'support.avoid2'
  | 'support.avoid3'
  | 'support.faq1.q'
  | 'support.faq1.a'
  | 'support.faq2.q'
  | 'support.faq2.a'
  | 'hero.tagline'
  | 'hero.specLine'
  | 'hero.footnote'
  | 'hero.featuresBtn'
  | 'challenges.title'
  | 'challenges.body1'
  | 'challenges.body2'
  | 'challenges.b1.title'
  | 'challenges.b1.desc'
  | 'challenges.b2.title'
  | 'challenges.b2.desc'
  | 'challenges.b3.title'
  | 'challenges.b3.desc'
  | 'screenshots.closing'
  | 'screenshots.pending'
  | 'how.title'
  | 'how.step1.title'
  | 'how.step1.desc'
  | 'how.step1.cta'
  | 'how.step2.title'
  | 'how.step2.desc'
  | 'how.step2.cta'
  | 'how.step3.title'
  | 'how.step3.desc'
  | 'how.step3.cta'
  | 'offline.title'
  | 'offline.body1'
  | 'offline.body2'
  | 'offline.note'
  | 'security.title'
  | 'security.body'
  | 'security.s1.title'
  | 'security.s1.desc'
  | 'security.s2.title'
  | 'security.s2.desc'
  | 'security.s3.title'
  | 'security.s3.desc'
  | 'security.disclaimer'
  | 'audience.title'
  | 'audience.merchants.title'
  | 'audience.merchants.desc'
  | 'audience.craft.title'
  | 'audience.craft.desc'
  | 'audience.small.title'
  | 'audience.small.desc'
  | 'audience.teams.title'
  | 'audience.teams.desc'
  | 'preview.title'
  | 'preview.subtitle'
  | 'preview.from'
  | 'preview.ask'
  | 'preview.compare'
  | 'preview.note'
  | 'preview.tag.standard'
  | 'preview.tag.pro'
  | 'preview.tag.enterprise'
  | 'cta.pricingBtn'
  | 'cta.supportLink'
  | 'footer.links.privacy'
  | 'footer.trademark'
  | 'privacy.title'
  | 'privacy.subtitle'
  | 'privacy.local.title'
  | 'privacy.local.body'
  | 'privacy.site.title'
  | 'privacy.site.body'
  | 'privacy.contact.title'
  | 'privacy.contact.body'
  | 'privacy.forms.title'
  | 'privacy.forms.body'
  | 'privacy.backup.title'
  | 'privacy.backup.body'
  | 'seo.ogTitle'
  | 'seo.ogDescription'
  | 'footer.links.whatsNew'
  | 'footer.links.reviews'
  | 'footer.links.terms'
  | 'seo.page.privacy'
  | 'nav.whatsNew'
  | 'nav.reviews'
  | 'nav.terms'
  | 'settings.ariaLabel'
  | 'settings.languageTitle'
  | 'seo.page.features'
  | 'seo.page.whatsNew'
  | 'seo.page.reviews'
  | 'seo.page.terms'
  | 'seo.desc.home'
  | 'seo.desc.features'
  | 'seo.desc.guide'
  | 'seo.desc.pricing'
  | 'seo.desc.support'
  | 'seo.desc.reviews'
  | 'seo.desc.whatsNew'
  | 'seo.desc.privacy'
  | 'seo.desc.terms'
  | 'notFound.title'
  | 'notFound.body'
  | 'notFound.home'
  | 'notFound.support'
  | 'common.loading'
  | 'featuresPage.badge'
  | 'featuresPage.title'
  | 'featuresPage.subtitle'
  | 'feat.group.documents'
  | 'feat.group.people'
  | 'feat.group.inventory'
  | 'feat.group.trust'
  | 'feat.benefitLabel'
  | 'feat.documents.benefit'
  | 'feat.reports.benefit'
  | 'feat.import.title'
  | 'feat.import.desc'
  | 'feat.import.benefit'
  | 'feat.partners.benefit'
  | 'feat.debts.benefit'
  | 'feat.stock.benefit'
  | 'feat.localData.benefit'
  | 'feat.licence.title'
  | 'feat.licence.desc'
  | 'feat.licence.benefit'
  | 'feat.offline.title'
  | 'feat.offline.desc'
  | 'feat.offline.benefit'
  | 'feat.languages.benefit'
  | 'feat.theme.title'
  | 'feat.theme.desc'
  | 'feat.theme.benefit'
  | 'featuresPage.ctaTitle'
  | 'featuresPage.ctaBody'
  | 'featuresPage.guideCta'
  | 'featuresPage.pricingCta'
  | 'featuresPage.updatesCta'
  | 'whatsNew.badge'
  | 'whatsNew.title'
  | 'whatsNew.subtitle'
  | 'whatsNew.publishedBadge'
  | 'whatsNew.sizeLabel'
  | 'whatsNew.assetLabel'
  | 'whatsNew.downloadBtn'
  | 'whatsNew.detailsBtn'
  | 'whatsNew.latestNote'
  | 'whatsNew.sourceTitle'
  | 'whatsNew.sourceBody'
  | 'whatsNew.releasesLink'
  | 'whatsNew.roadmapTitle'
  | 'whatsNew.roadmapBody'
  | 'whatsNew.autoUpdateTitle'
  | 'whatsNew.autoUpdateBody'
  | 'whatsNew.guideLink'
  | 'whatsNew.groupAdded'
  | 'whatsNew.groupFixed'
  | 'whatsNew.groupImproved'
  | 'whatsNew.cautionTitle'
  | 'whatsNew.notFoundTitle'
  | 'whatsNew.notFoundBody'
  | 'whatsNew.backToList'
  | 'whatsNew.downloadTitle'
  | 'whatsNew.shaTitle'
  | 'whatsNew.shaCopy'
  | 'whatsNew.shaCopied'
  | 'whatsNew.shaHint'
  | 'guide.step.req.title'
  | 'guide.step.req.desc'
  | 'guide.step.fileCheck.title'
  | 'guide.step.fileCheck.desc'
  | 'guide.step.shaCheck.title'
  | 'guide.step.shaCheck.desc'
  | 'guide.step.setupFinish.title'
  | 'guide.step.setupFinish.desc'
  | 'guide.step.activation.title'
  | 'guide.step.activation.desc'
  | 'guide.step.firstInvoice.title'
  | 'guide.step.firstInvoice.desc'
  | 'guide.step.partners.title'
  | 'guide.step.partners.desc'
  | 'guide.step.stock.title'
  | 'guide.step.stock.desc'
  | 'guide.step.backup.title'
  | 'guide.step.backup.desc'
  | 'guide.step.troubleshooting.title'
  | 'guide.step.troubleshooting.desc'
  | 'guide.step.contact.title'
  | 'guide.step.contact.desc'
  | 'guide.smart.title'
  | 'guide.smart.body'
  | 'guide.smart.checkTitle'
  | 'guide.smart.check1'
  | 'guide.smart.check2'
  | 'guide.smart.check3'
  | 'guide.smart.stepsTitle'
  | 'guide.smart.steps'
  | 'guide.smart.warn'
  | 'guide.smart.hashLink'
  | 'guide.smart.releasesCta'
  | 'guide.smart.recentBuild'
  | 'reviews.badge'
  | 'reviews.title'
  | 'reviews.subtitle'
  | 'reviews.listTitle'
  | 'reviews.serviceDown'
  | 'reviews.emptyTitle'
  | 'reviews.emptyBody'
  | 'reviews.starsAria'
  | 'reviews.formTitle'
  | 'reviews.formSubtitle'
  | 'reviews.rule1.label'
  | 'reviews.rule1.body'
  | 'reviews.rule2.label'
  | 'reviews.rule2.body'
  | 'reviews.rule3.label'
  | 'reviews.rule3.body'
  | 'reviews.privacyLink'
  | 'reviews.emailLabel'
  | 'reviews.emailHint'
  | 'reviews.nameLabel'
  | 'reviews.namePlaceholder'
  | 'reviews.nameHint'
  | 'reviews.ratingLabel'
  | 'reviews.starOption'
  | 'reviews.titleLabel'
  | 'reviews.bodyLabel'
  | 'reviews.bodyHint'
  | 'reviews.consent'
  | 'reviews.submit'
  | 'reviews.sending'
  | 'reviews.queued'
  | 'reviews.unavailable'
  | 'reviews.whatsappFallback'
  | 'reviews.whatsappIntro'
  | 'reviews.duplicate'
  | 'reviews.rateLimited'
  | 'reviews.rejected'
  | 'reviews.contactInstead'
  | 'reviews.error.email'
  | 'reviews.error.rating'
  | 'reviews.error.title'
  | 'reviews.error.body'
  | 'reviews.error.bodyLong'
  | 'reviews.error.consent'
  | 'terms.badge'
  | 'terms.title'
  | 'terms.subtitle'
  | 'terms.updatedLabel'
  | 'terms.updatedValue'
  | 'terms.contentsTitle'
  | 'terms.contentsAria'
  | 'terms.privacyNote'
  | 'terms.acceptance.title'
  | 'terms.acceptance.body'
  | 'terms.licence.title'
  | 'terms.licence.body'
  | 'terms.warranty.title'
  | 'terms.warranty.body'
  | 'terms.data.title'
  | 'terms.data.body'
  | 'terms.pricing.title'
  | 'terms.pricing.body'
  | 'terms.updates.title'
  | 'terms.updates.body'
  | 'terms.property.title'
  | 'terms.property.body'
  | 'terms.liability.title'
  | 'terms.liability.body'
  | 'terms.changes.title'
  | 'terms.changes.body'
  | 'terms.contact.title'
  | 'terms.contact.body'
  | 'support.form.title'
  | 'support.form.subtitle'
  | 'support.form.name'
  | 'support.form.email'
  | 'support.form.topic'
  | 'support.form.version'
  | 'support.form.message'
  | 'support.form.submit'
  | 'support.form.sending'
  | 'support.form.queued'
  | 'support.form.errorName'
  | 'support.form.errorEmail'
  | 'support.form.errorMessage'
  | 'support.form.unavailable'
  | 'support.form.rateLimited'
  | 'support.form.rejected'
  | 'admin.title'
  | 'admin.checking'
  | 'admin.notDeployedTitle'
  | 'admin.notDeployedBody'
  | 'admin.navAria'
  | 'admin.nav.dashboard'
  | 'admin.nav.reviews'
  | 'admin.nav.pricing'
  | 'admin.nav.messages'
  | 'admin.nav.activity'
  | 'admin.signOut'
  | 'admin.loginTitle'
  | 'admin.loginBody'
  | 'admin.passwordLabel'
  | 'admin.signIn'
  | 'admin.badCredentials'
  | 'admin.rateLimited'
  | 'admin.backendMissing'
  | 'admin.loading'
  | 'admin.stats.pendingReviews'
  | 'admin.stats.approvedReviews'
  | 'admin.stats.unreadMessages'
  | 'admin.stats.pricingUpdated'
  | 'admin.dashboardNote'
  | 'admin.filter.pending'
  | 'admin.filter.approved'
  | 'admin.filter.rejected'
  | 'admin.noReviews'
  | 'admin.approve'
  | 'admin.reject'
  | 'admin.pricingNote'
  | 'admin.pricingCaption'
  | 'admin.col.plan'
  | 'admin.pricingReason'
  | 'admin.pricingSaved'
  | 'admin.pricingInvalid'
  | 'admin.saveFailed'
  | 'admin.save'
  | 'admin.noMessages'
  | 'admin.read'
  | 'admin.unread'
  | 'admin.markRead'
  | 'admin.noActivity'
;

export const translations: Record<Locale, Record<TranslationKey, string>> = {
  ar: {
    'footer.links.whatsNew': 'آخر التحديثات',
    'footer.links.reviews': 'آراء المستخدمين',
    'footer.links.terms': 'الشروط والأحكام',
    'nav.whatsNew': 'الجديد',
    'nav.reviews': 'الآراء',
    'nav.terms': 'الشروط',
    'settings.ariaLabel': 'الإعدادات',
    'settings.languageTitle': 'اللغة',
    'seo.page.features': 'المميزات — Mohasabi',
    'seo.page.whatsNew': 'آخر التحديثات — Mohasabi',
    'seo.page.reviews': 'آراء المستخدمين — Mohasabi',
    'seo.page.terms': 'الشروط والأحكام — Mohasabi',
    'seo.desc.home':
      'Mohasabi برنامج محاسبة وفواتير مكتبي لنظام Windows: فواتير وعروض أسعار وزبائن وموردون ومخزون، مع عمل محلي وثلاث لغات.',
    'seo.desc.features':
      'تعرّف على قدرات Mohasabi المنشورة فعليًا: المستندات، والزبائن والموردون، والمخزون، والتقارير، واللغات الثلاث.',
    'seo.desc.guide':
      'خطوات تنزيل Mohasabi v1.0.3 والتحقق من الملف وتثبيته على Windows، مع توضيح تحذير SmartScreen والتحقق من SHA-256.',
    'seo.desc.pricing':
      'أسعار تراخيص Mohasabi بالدينار الجزائري: Standard وPro وEnterprise لفترات شهر و3 و6 و12 شهرًا، والطلب عبر واتساب أو البريد.',
    'seo.desc.support':
      'تواصل مع دعم Mohasabi عبر واتساب أو البريد، وأرسل تفاصيل مشكلتك دون مشاركة كلمات المرور أو بيانات العملاء.',
    'seo.desc.reviews':
      'آراء مستخدمي Mohasabi المنشورة بعد المراجعة، ونموذج لإرسال تجربتك دون عرض بريدك الإلكتروني علنًا.',
    'seo.desc.whatsNew':
      'سجل إصدارات Mohasabi المنشورة على GitHub Releases، مع ملاحظات الإصدار وحجم الملف وبصمة SHA-256.',
    'seo.desc.privacy':
      'سياسة خصوصية موقع Mohasabi: البيانات المرسلة عبر نماذج الدعم والتقييمات، وأين تُخزَّن، وكيف تطلب حذفها.',
    'seo.desc.terms':
      'شروط استخدام موقع Mohasabi وتراخيص البرنامج: النطاق، والتحديثات، والملكية، والمسؤولية.',
    'notFound.title': 'الصفحة غير موجودة — Mohasabi',
    'notFound.body':
      'الرابط الذي فتحته غير موجود أو تغيّر. يمكنك العودة إلى الصفحة الرئيسية أو التواصل مع الدعم.',
    'notFound.home': 'العودة إلى الرئيسية',
    'notFound.support': 'الدعم والتواصل',
    'common.loading': 'جارٍ التحميل…',
    'featuresPage.badge': 'المميزات',
    'featuresPage.title': 'قدرات Mohasabi في الإصدار المنشور',
    'featuresPage.subtitle': 'كل ما يلي متاح فعلًا في نسخة Windows المنشورة، بلا ميزات تجريبية ولا وعود لم تُنفَّذ.',
    'feat.group.documents': 'المستندات والمبيعات',
    'feat.group.people': 'الأطراف والمستحقات',
    'feat.group.inventory': 'المنتجات والمخزون',
    'feat.group.trust': 'الثقة والاستمرارية',
    'feat.benefitLabel': 'الفائدة:',
    'feat.documents.benefit': 'تخرج المستندات جاهزة للمشاركة أو الأرشفة بدل إعادة كتابتها في ملف منفصل.',
    'feat.reports.benefit': 'اعرف مبيعاتك ومبالغك المستحقة في نهاية الشهر دون جداول يدوية.',
    'feat.import.title': 'استيراد من ملف CSV',
    'feat.import.desc': 'يمكن إدخال بيانات العملاء والمنتجات دفعة واحدة عبر ملف CSV، مع نموذج استيراد يعرض بحسب حالة الترخيص.',
    'feat.import.benefit': 'تبدأ العمل ببياناتك الحالية بدل إعادة إدخالها سطرًا سطرًا.',
    'feat.partners.benefit': 'ملف واحد لكل زبون أو مورد يظل مرتبطًا بفواتيره ومستحقاته.',
    'feat.debts.benefit': 'عرف من متأخر عنك ومن انتظرت، وتابع التحصيل قبل تراكم المبالغ.',
    'feat.stock.benefit': 'تفادَ البيع دون رصيد لأن الكميات مطابقة لما في المخزن.',
    'feat.localData.benefit': 'لا اشتراك سحابي إجباري ولا بيانات مرسلة إلى جهة خارجية.',
    'feat.licence.title': 'ترخيص مرتبط بالجهاز',
    'feat.licence.desc': 'منذ الإصدار 1.0.3 يعرض البرنامج معرّفًا ماديًا (المعالج واللوحة الأم وBIOS) ويُستخدم لربط الترخيص بجهازك مع استعادة مشفرة بعد التحديث.',
    'feat.licence.benefit': 'ترخيص لكل جهاز، وتحديث لا يفقدك التفعيل.',
    'feat.offline.title': 'العمل دون اتصال',
    'feat.offline.desc': 'تتم الفوترة والمتابعة محليًا، والاتصال مطلوب للتنزيل والتفعيل والتحديث فقط.',
    'feat.offline.benefit': 'استمر في العمل عند انقطاع الشبكة أو في موقع بلا إنترنت.',
    'feat.languages.benefit': 'واجهة عربية كاملة مع RTL، وفرنسية وإنجليزية لفريقك وزبائنك.',
    'feat.theme.title': 'موضوع داكن',
    'feat.theme.desc': 'يوفر الإصدار المنشور موضوعًا داكنًا منقحًا إلى جانب الموضوع الفاتح.',
    'feat.theme.benefit': 'راحة بصرية عند العمل المسائي الطويل.',
    'featuresPage.ctaTitle': 'جاهز لتجربة هذا عمليًا؟',
    'featuresPage.ctaBody': 'ابدأ بدليل التثبيت، ثم اختر خطة التفعيل التي تناسب حجم نشاطك.',
    'featuresPage.guideCta': 'دليل التثبيت',
    'featuresPage.pricingCta': 'عروض التفعيل',
    'featuresPage.updatesCta': 'اقرأ آخر التحديثات',
    'whatsNew.badge': 'آخر التحديثات',
    'whatsNew.title': 'الإصدارات المنشورة فعلًا',
    'whatsNew.subtitle': 'تواريخ حقيقية وروابط تنزيل رسمية وبصمات SHA-256 معلنة، مأخوذة من قناة الإصدارات الرسمية.',
    'whatsNew.publishedBadge': 'منشور',
    'whatsNew.sizeLabel': 'حجم الملف',
    'whatsNew.assetLabel': 'ملف التثبيت',
    'whatsNew.downloadBtn': 'تنزيل الملف',
    'whatsNew.detailsBtn': 'تفاصيل الإصدار',
    'whatsNew.latestNote': 'أحدث إصدار منشور حاليًا هو {version}.',
    'whatsNew.sourceTitle': 'مصدر المعلومات',
    'whatsNew.sourceBody': 'تؤخذ الأرقام والتواريخ والبصمات من ملف version.json المنشور مع كل إصدار في مستودع الإصدارات الرسمي، لا من نصوص تسويقية.',
    'whatsNew.releasesLink': 'صفحة الإصدارات الرسمية',
    'whatsNew.roadmapTitle': 'التحديثات المخطط لها',
    'whatsNew.roadmapBody': 'لا توجد خارطة طريق معلنة رسميًا حتى الآن، لذلك لا تعرض هذه الصفحة أي تحديث لم يُنشر بعد.',
    'whatsNew.autoUpdateTitle': 'التحديث داخل التطبيق',
    'whatsNew.autoUpdateBody': 'يفحص Mohasabi قناة الإصدارات ويعرض التحديث المتاح، ويتحقق من بصمة SHA-256 قبل تشغيل ملف التحديث.',
    'whatsNew.guideLink': 'طريقة التحديث خطوة بخطوة',
    'whatsNew.groupAdded': 'ميزات جديدة',
    'whatsNew.groupFixed': 'إصلاحات',
    'whatsNew.groupImproved': 'تحسينات',
    'whatsNew.cautionTitle': 'انتبه',
    'whatsNew.notFoundTitle': 'لم نعثر على هذا الإصدار',
    'whatsNew.notFoundBody': 'هذا الإصدار غير موجود في قائمة التحديثات المنشورة.',
    'whatsNew.backToList': 'العودة إلى التحديثات',
    'whatsNew.downloadTitle': 'ملف التثبيت',
    'whatsNew.shaTitle': 'بصمة SHA-256',
    'whatsNew.shaCopy': 'نسخ البصمة',
    'whatsNew.shaCopied': 'تم النسخ',
    'whatsNew.shaHint': 'قارن البصمة مع الملف المحمّل قبل تشغيله؛ تختلف طريقة العرض بحسب أداة التجزئة وإصدار Windows.',
    'guide.step.req.title': 'تأكد من متطلبات التشغيل',
    'guide.step.req.desc': 'Mohasabi يعمل على Windows 10 أو 11 بعمارة 64-bit، مع 4 غيغابايت ذاكرة على الأقل و500 ميغابايت مساحة.',
    'guide.step.fileCheck.title': 'تحقق من اسم الملف ومصدره',
    'guide.step.fileCheck.desc': 'يجب أن يأتي الملف من قناة الإصدارات الرسمية وأن يحمل اسم الإصدار تمامًا كما هو مذكور؛ لا تشغل نسخة من مصدر آخر.',
    'guide.step.shaCheck.title': 'تحقق من بصمة SHA-256',
    'guide.step.shaCheck.desc': 'قارن بصمة الملف المحمّل مع البصمة المنشورة في صفحة آخر التحديثات؛ أي اختلاف يعني أن الملف ليس الأصلي.',
    'guide.step.setupFinish.title': 'أكمل خطوات التثبيت',
    'guide.step.setupFinish.desc': 'اتبع معالج الإعداد حتى نهايته ودع البرنامج ينشئ اختصاره؛ لا تلغِ العملية أثناء نسخ الملفات.',
    'guide.step.activation.title': 'فعّل الترخيص',
    'guide.step.activation.desc': 'افتح شاشة الترخيص داخل البرنامج وانسخ معرّف الجهاز المادي ثم أرسله عبر قناة الدعم الرسمية للحصول على الترخيص.',
    'guide.step.firstInvoice.title': 'أنشئ أول فاتورة',
    'guide.step.firstInvoice.desc': 'من قائمة المستندات أضف فاتورة واختر الزبون أو أنشئه، ثم أضف البنود وتحقق من الإجمالي قبل الحفظ.',
    'guide.step.partners.title': 'أضف عملاءك ومورديك',
    'guide.step.partners.desc': 'سجّل الأطراف مع بيانات التواصل والأرصدة، مع منع تكرار الاسم أو البريد نفسه.',
    'guide.step.stock.title': 'نظّم المنتجات والمخزون',
    'guide.step.stock.desc': 'أنشئ المنتجات بأسعارها وكمياتها، أو استوردها دفعة واحدة من ملف CSV.',
    'guide.step.backup.title': 'انسخ بياناتك احتياطيًا',
    'guide.step.backup.desc': 'تُحفظ البيانات محليًا على جهازك؛ أنشئ نسخة احتياطية دورية واحتفظ بها خارج الجهاز.',
    'guide.step.troubleshooting.title': 'حل المشكلات الشائعة',
    'guide.step.troubleshooting.desc': 'عند ظهور تحذير أو فشل التشغيل، راجع اسم الملف والبصمة، ثم أعد التثبيت وتحقق من مساحة القرص.',
    'guide.step.contact.title': 'تواصل مع الدعم',
    'guide.step.contact.desc': 'راسل الدعم عبر واتساب أو البريد مع ذكر رقم الإصدار ومعرّف الجهاز عند الحاجة.',
    'guide.smart.title': 'ظهرت رسالة Windows SmartScreen أثناء التثبيت؟',
    'guide.smart.body': 'يعرض Windows هذا التحذير عندما لا يكون التطبيق معروفًا بعد لدى خدمات السمعة أو عندما لا يكون موقّعًا بشهادة موثوقة، وهو لا يعني بالضرورة أن الملف خطر.',
    'guide.smart.checkTitle': 'قبل أي إجراء، تحقّق',
    'guide.smart.check1': 'أن الملف نزّلته من هذا الموقع أو من قناة الإصدارات الرسمية على GitHub.',
    'guide.smart.check2': 'أن اسم الملف مطابق تمامًا لاسم الإصدار المنشور.',
    'guide.smart.check3': 'أن بصمة SHA-256 مطابقة للبصمة المعلنة؛ عند الاختلاف لا تشغّل الملف واحذفه.',
    'guide.smart.stepsTitle': 'إذا تأكدت من المصدر',
    'guide.smart.steps': 'في نافذة التحذير اضغط More info، وقد يظهر خيار Run anyway بعده. تختلف هذه الخيارات وتسمياتها بحسب إصدار Windows وسياسات المؤسسة.',
    'guide.smart.warn': 'لا نطلب منك تعطيل Windows Defender أو SmartScreen على مستوى النظام، ولا تعتبر كل تحذير آمنًا تلقائيًا.',
    'guide.smart.hashLink': 'البصمة المنشورة لهذا الإصدار',
    'guide.smart.releasesCta': 'صفحة الإصدارات الرسمية',
    'guide.smart.recentBuild': 'قد لا يظهر التحذير على أجهزة أخرى، لأنه يعتمد على سمعة الملف لدى خدمات Windows وحجم تنزيلاته.',
    'reviews.badge': 'آراء المستخدمين',
    'reviews.title': 'تجارب حقيقية مع Mohasabi',
    'reviews.subtitle': 'لا تعرض هذه الصفحة إلا الآراء الموافق عليها من فريق Mohasabi. لا تقييمات تلقائية ولا آراء تجريبية.',
    'reviews.listTitle': 'الآراء المنشورة',
    'reviews.serviceDown': 'خدمة التقييمات غير متاحة حاليًا، لذلك لا يمكن عرض الآراء المنشورة أو استقبال الجديد منها.',
    'reviews.emptyTitle': 'لا توجد آراء منشورة بعد',
    'reviews.emptyBody': 'لم تتم الموافقة على أي تقييم للنشر حتى الآن. شارك تجربتك الفعلية بعد استخدام البرنامج.',
    'reviews.starsAria': 'تقييم {rating} من 5',
    'reviews.formTitle': 'شارك رأيك',
    'reviews.formSubtitle': 'اكتب تجربتك الفعلية. يصل الرأي إلى المدير للمراجعة ولا يظهر للعامة قبل الموافقة عليه.',
    'reviews.rule1.label': 'مراجعة بشرية.',
    'reviews.rule1.body': 'يبقى كل رأي غير منشور حتى يوافق عليه المدير.',
    'reviews.rule2.label': 'بريد غير منشور.',
    'reviews.rule2.body': 'يُستخدم بريدك لمنع التكرار والرجوع إليك بشأن المراجعة فقط، ولا يظهر للعامة.',
    'reviews.rule3.label': 'تجربة حقيقية.',
    'reviews.rule3.body': 'الآراء الدعائية أو المكررة أو مجهولة المصدر تُرفض.',
    'reviews.privacyLink': 'كيف نتعامل مع بياناتك؟',
    'reviews.emailLabel': 'بريدك الإلكتروني',
    'reviews.emailHint': 'لمنع التكرار والتواصل بشأن المراجعة، ولا يظهر للعامة.',
    'reviews.nameLabel': 'الاسم المعروض (اختياري)',
    'reviews.namePlaceholder': 'اسمك أو اسم نشاطك',
    'reviews.nameHint': 'هذا ما يراه الزوار؛ اتركه فارغًا ليظهر «Mohasabi».',
    'reviews.ratingLabel': 'التقييم',
    'reviews.starOption': '{value} من 5 نجوم',
    'reviews.titleLabel': 'عنوان مختصر',
    'reviews.bodyLabel': 'تفاصيل تجربتك',
    'reviews.bodyHint': 'اكتب 15 حرفًا على الأقل ({count} حرفًا حاليًا).',
    'reviews.consent': 'أوافق على نشر نص رأيي والاسم المعروض بعد مراجعتهما والموافقة عليهما من فريق Mohasabi.',
    'reviews.submit': 'إرسال الرأي',
    'reviews.sending': 'جارٍ الإرسال…',
    'reviews.queued': 'وصل رأيك وهو الآن قيد المراجعة، ولن يظهر قبل موافقة المدير.',
    'reviews.unavailable': 'تعذّر الوصول إلى خدمة التقييمات من هذا الجهاز، لذلك لم يُرسل رأيك.',
    'reviews.whatsappFallback': 'أرسل رأيك عبر واتساب',
    'reviews.whatsappIntro': 'أرغب في مشاركة رأيي في Mohasabi:',
    'reviews.duplicate': 'سبق أن أرسلت رأيًا مشابهًا من هذا البريد.',
    'reviews.rateLimited': 'عدد الطلبات كبير حاليًا؛ أعد المحاولة بعد قليل.',
    'reviews.rejected': 'لم يُقبل الرأي؛ تحقق من الحقول ثم أعد المحاولة.',
    'reviews.contactInstead': 'أو راسلنا مباشرة',
    'reviews.error.email': 'بريد إلكتروني غير صالح.',
    'reviews.error.rating': 'اختر تقييمًا من 1 إلى 5.',
    'reviews.error.title': 'العنوان قصير جدًا (3 أحرف على الأقل).',
    'reviews.error.body': 'النص قصير جدًا (15 حرفًا على الأقل).',
    'reviews.error.bodyLong': 'النص طويل جدًا (1200 حرف كحد أقصى).',
    'reviews.error.consent': 'يجب الموافقة على النشر بعد المراجعة.',
    'terms.badge': 'الشروط والأحكام',
    'terms.title': 'شروط استخدام الموقع والبرنامج',
    'terms.subtitle': 'نص يوضح ما يلتزم به المستخدم وما يلتزم به الناشر، بلغة مباشرة.',
    'terms.updatedLabel': 'آخر تحديث',
    'terms.updatedValue': '24 أكتوبر 2026',
    'terms.contentsTitle': 'المحتويات',
    'terms.contentsAria': 'فهرس الشروط',
    'terms.privacyNote': 'لبياناتك الشخصية، راجع',
    'terms.acceptance.title': 'الموافقة على الشروط',
    'terms.acceptance.body': 'باستخدامك هذا الموقع أو بتنزيلك Mohasabi فإنك توافق على هذه الشروط. إذا كنت لا توافق عليها، فتوقف عن استخدام الموقع ولا تنزيل البرنامج.',
    'terms.licence.title': 'نطاق الترخيص',
    'terms.licence.body': 'يُمنح ترخيص استخدام Mohasabi لجهاز واحد وفق الخطة والمدة المختارة، ويرتبط بمعرّف الجهاز المادي. التراخيص الصادرة سابقًا تبقى سارية، ولا يشمل الترخيص إعادة البيع أو توزيع البرنامج أو تعديله.',
    'terms.warranty.title': 'البرنامج كما هو',
    'terms.warranty.body': 'يبذل الناشر جهدًا لتوفير نسخة مستقرة، لكن البرنامج يُقدَّم كما هو دون ضمان مطلق لغياب الأخطاء أو لملاءمته لكل استخدام. يبقى التحقق من صحة بياناتك ومحاسباتك مسؤوليتك.',
    'terms.data.title': 'البيانات والنسخ الاحتياطي',
    'terms.data.body': 'تُخزَّن بياناتك المحلية على جهازك، ولا نطلب الوصول إليها ولا نتحكم في خوادم تحملها. أنت مسؤول عن عمل النسخ الاحتياطية الدورية وحماية جهازك.',
    'terms.pricing.title': 'الأسعار والطلبات',
    'terms.pricing.body': 'الأسعار معروضة بالدينار الجزائري وهي إرشادية وقابلة للتغيير دون إشعار مسبق. لا يوجد دفع إلكتروني عبر هذا الموقع، وتتم الطلبات والتفعيلات عبر قنوات الدعم الرسمية المذكورة.',
    'terms.updates.title': 'التحديثات',
    'terms.updates.body': 'تنشر التحديثات في مستودع الإصدارات الرسمي، ويحمّل التطبيق التحديثات من هذا المصدر مع التحقق من بصمة SHA-256 قبل التشغيل، وقد تُطبَّق التحديثات المؤجلة عند إغلاق التطبيق.',
    'terms.property.title': 'الملكية الفكرية',
    'terms.property.body': 'اسم Mohasabi وشعاره ومحتوى هذا الموقع تعود إلى الناشر ولا يجوز استخدامها دون إذن مسبق. الأسماء والعلامات الأخرى المذكورة ملك لأصحابها.',
    'terms.liability.title': 'حدود المسؤولية',
    'terms.liability.body': 'في حدود ما يسمح به القانون المطبق، لا يتحمّل الناشر مسؤولية الأضرار غير المباشرة أو فقدان البيانات الناتج عن عدم إجراء نسخة احتياطية.',
    'terms.changes.title': 'تعديل الشروط',
    'terms.changes.body': 'قد تُحدَّث هذه الشروط عند الحاجة؛ تُطبَّق النسخة المنشورة على هذه الصفحة بتاريخها المذكور، ويُنصح بمراجعتها قبل كل طلب ترخيص.',
    'terms.contact.title': 'استفسارات حول الشروط',
    'terms.contact.body': 'لأي سؤال عن الترخيص أو هذه الشروط، استخدم إحدى قنوات الدعم الرسمية.',
    'support.form.title': 'أرسل طلب دعم',
    'support.form.subtitle': 'املأ النموذج وسيصل طلبك إلى قائمة الدعم. إن تعذّر الإرسال، استخدم واتساب أو البريد.',
    'support.form.name': 'الاسم',
    'support.form.email': 'البريد الإلكتروني',
    'support.form.topic': 'نوع المشكلة',
    'support.form.version': 'رقم الإصدار (اختياري)',
    'support.form.message': 'وصف المشكلة',
    'support.form.submit': 'إرسال الطلب',
    'support.form.sending': 'جارٍ الإرسال…',
    'support.form.queued': 'وصل طلبك وسيرد الدعم على بريدك.',
    'support.form.errorName': 'الاسم قصير جدًا.',
    'support.form.errorEmail': 'بريد إلكتروني غير صالح.',
    'support.form.errorMessage': 'اكتب وصفًا لا يقل عن 20 حرفًا.',
    'support.form.unavailable': 'تعذّر الوصول إلى خدمة الرسائل، لذلك لم يُرسل طلبك. استخدم واتساب أو البريد.',
    'support.form.rateLimited': 'عدد الطلبات كبير حاليًا؛ أعد المحاولة بعد قليل.',
    'support.form.rejected': 'لم يُقبل الطلب؛ تحقق من البيانات وأعد المحاولة.',
    'admin.title': 'لوحة إدارة Mohasabi',
    'admin.checking': 'جارٍ التحقق من الجلسة…',
    'admin.notDeployedTitle': 'خدمة الإدارة غير منشورة على هذه الاستضافة',
    'admin.notDeployedBody': 'تتطلب اللوحة مصادقة وصلاحيات تُطبَّق على الخادم. ما لم يُنشر هذا الخادم، تبقى إدارة المحتوى مغلة عموميًا ولا يمكن تعديل شيء من هنا.',
    'admin.navAria': 'تنقل لوحة الإدارة',
    'admin.nav.dashboard': 'اللوحة العامة',
    'admin.nav.reviews': 'مراجعة التقييمات',
    'admin.nav.pricing': 'الأسعار والخطط',
    'admin.nav.messages': 'رسائل الدعم',
    'admin.nav.activity': 'سجل التغييرات',
    'admin.signOut': 'تسجيل الخروج',
    'admin.loginTitle': 'دخول المدير',
    'admin.loginBody': 'هذه اللوحة خاصة وتتطلب مصادقة على الخادم. لا يكفي إخفاء رابطها، ولا تُخزَّن كلمة المرور في ملفات الواجهة.',
    'admin.passwordLabel': 'كلمة المرور',
    'admin.signIn': 'دخول',
    'admin.badCredentials': 'بيانات الدخول غير صحيحة.',
    'admin.rateLimited': 'محاولات كثيرة؛ انتظر قليلًا ثم أعد المحاولة.',
    'admin.backendMissing': 'خدمة الإدارة غير متصلة بهذه البيئة؛ أعد نشر الخادم ثم حاول مجددًا.',
    'admin.loading': 'جارٍ التحميل…',
    'admin.stats.pendingReviews': 'تقييمات بانتظار المراجعة',
    'admin.stats.approvedReviews': 'تقييمات منشورة',
    'admin.stats.unreadMessages': 'رسائل غير مقروءة',
    'admin.stats.pricingUpdated': 'آخر تحديث للأسعار',
    'admin.dashboardNote': 'تُؤخذ كل الأرقام من قاعدة بيانات الموقع، وتُسجَّل عمليات النشر في سجل التغييرات.',
    'admin.filter.pending': 'قيد المراجعة',
    'admin.filter.approved': 'منشورة',
    'admin.filter.rejected': 'مرفوضة',
    'admin.noReviews': 'لا توجد عناصر في هذه الحالة حاليًا.',
    'admin.approve': 'نشر',
    'admin.reject': 'رفض',
    'admin.pricingNote': 'ينعكس أي حفظ هنا على صفحة العروض، ويُسجَّل التغيير مع سببه في سجل النشاطات.',
    'admin.pricingCaption': 'جدول أسعار خطط الترخيص',
    'admin.col.plan': 'الخطة',
    'admin.pricingReason': 'سبب التعديل (يظهر في سجل النشاطات)',
    'admin.pricingSaved': 'حُفظت الأسعار وسُجِّل التغيير.',
    'admin.pricingInvalid': 'قيمة غير صالحة: يجب أن تكون الأسعار أرقامًا صحيحة غير سالبة.',
    'admin.saveFailed': 'لم يُحفظ التغيير. أعد المحاولة.',
    'admin.save': 'حفظ',
    'admin.noMessages': 'لا توجد رسائل.',
    'admin.read': 'مقروءة',
    'admin.unread': 'غير مقروءة',
    'admin.markRead': 'تعليم كمقروءة',
    'admin.noActivity': 'لا تغييرات مسجلة بعد.',
    'nav.home': 'الرئيسية',
    'nav.download': 'تحميل Mohasabi',
    'hero.title': 'أعمالك أوضح. حساباتك أسهل.',
    'hero.subtitle':
      'أنشئ فواتيرك وعروض أسعارك ومستنداتك التجارية، وتابع زبائنك ومخزونك ومستحقاتك من مكان واحد. مع Mohasabi تنظّم أعمالك اليومية على حاسوبك وتواصل العمل حتى عند غياب اتصال دائم بالإنترنت.',
    'hero.downloadBtn': 'تنزيل البرنامج',
    'hero.downloadPendingBtn': 'التحميل قيد التجهيز',
    'hero.version': 'الإصدار',
    'hero.windowsOnly': 'لنظام Windows',
    'hero.pendingNote': 'ملف التثبيت لهذا الإصدار قيد الرفع على قناة الإصدارات الرسمية.',
    'hero.releasesLink': 'صفحة الإصدارات',
    'hero.illustrationAlt': 'رسم توضيحي لواجهة البرنامج، وليس لقطة شاشة حقيقية',
    'hero.illustrationCaption': 'واجهة واحدة لمتابعة الفواتير والزبائن والمخزون.',
    'features.badge': 'المميزات',
    'features.title': 'كل ما تحتاجه لإدارة يوم عملك',
    'features.subtitle': 'القدرات الأساسية المتوفرة فعليًا في الإصدار الحالي.',
    'features.localData.title': 'بيانات محلية ونسخ احتياطي',
    'features.localData.desc':
      'تُحفظ بيانات عملك على جهازك، مع نسخ احتياطي ZIP مؤرَّخة وتحقق SHA-256 واستعادة تنسخ بياناتك الحالية أولًا.',
    'features.documents.title': 'الفواتير وعروض الأسعار',
    'features.documents.desc':
      'أنشئ الفواتير وعروض الأسعار وطلبات الشراء ومستندات التسليم وأوامر المهمة، ونظّم معاملاتك التجارية في مكان واحد.',
    'features.partners.title': 'إدارة الزبائن والموردين',
    'features.partners.desc':
      'احتفظ بملفات زبائنك مع أرصدتهم وطلباتهم الجارية، وتابع طلبات الشراء من الموردين وعمليات الاستلام.',
    'features.debts.title': 'متابعة الديون والمستحقات',
    'features.debts.desc':
      'راجع رصيد كل زبون والمبالغ المسجلة له أو عليه، مع تقرير المبالغ غير المحصّلة لتمييز ما حُصّل عمّا لا يزال مستحقًا.',
    'features.stock.title': 'إدارة المخزون والمنتجات',
    'features.stock.desc':
      'نظّم كتالوج المنتجات والخدمات وكميات المخزون، مع حدّ إعادة الطلب ولوحة تعرض المنتجات التي انخفض مخزونها.',
    'features.reports.title': 'التقارير والتصدير',
    'features.reports.desc':
      'لوحة قيادة وتقارير شهرية وبيان الضريبة على القيمة المضافة حسب النسبة وأفضل الزبائن، مع تصدير إلى PDF وExcel وWord وCSV.',
    'features.languages.title': 'واجهة عربية وفرنسية وإنجليزية',
    'features.languages.desc':
      'انتقل بين اللغات الثلاث مع دعم اتجاه العرض من اليمين أو اليسار، واختيار المظهر الفاتح أو الداكن أو التابع للنظام.',
    'screenshots.badge': 'لقطات الشاشة',
    'screenshots.title': 'شاهد Mohasabi كما هو',
    'screenshots.subtitle': 'استكشف واجهة البرنامج الفعلية وتعرّف على طريقة عرض المعلومات وإدارة أعمالك اليومية.',
    'screenshots.pendingTitle': 'لقطات الشاشة غير متوفرة بعد',
    'screenshots.pendingSubtitle': 'لا نعرض على هذا الموقع صورًا لواجهة غير حقيقية.',
    'screenshots.zoomHint': 'اضغط على أي لقطة لتكبيرها • التنقل بلوحة المفاتيح متاح',
    'screenshots.closeAria': 'إغلاق العارض',
    'screenshots.prevAria': 'اللقطة السابقة',
    'screenshots.nextAria': 'اللقطة التالية',
    'screenshots.alt.main': 'واجهة برنامج Mohasabi لإدارة الفواتير والأعمال',
    'screenshots.alt.dashboard': 'لوحة التحكم',
    'screenshots.alt.invoices': 'الفواتير وعروض الأسعار',
    'screenshots.alt.clients': 'الزبائن والموردون',
    'screenshots.alt.products': 'المنتجات والمخزون',
    'requirements.badge': 'المتطلبات',
    'requirements.title': 'متطلبات تشغيل Mohasabi',
    'requirements.colComponent': 'المكوّن',
    'requirements.colSpec': 'المواصفة',
    'requirements.colStatus': 'الحالة',
    'requirements.statusSupported': 'مدعوم',
    'requirements.statusRecommended': 'موصى به',
    'requirements.statusMinimum': 'الحد الأدنى',
    'requirements.statusConditional': 'حسب الحالة',
    'requirements.notesTitle': 'ملاحظات مهمة',
    'requirements.note1': 'القيم المذكورة أعلاه تخص إصدار البرنامج المعروض في هذه الصفحة.',
    'requirements.note2': 'يعمل البرنامج محليًا بعد إكمال التفعيل الأولي.',
    'requirements.note3': 'يلزم اتصال بالإنترنت للتنزيل والتفعيل وتحديث البرنامج.',
    'requirements.note4': 'راجع صفحة الإصدارات للتأكد من ملاحظات كل إصدار.',
    'requirements.viewReleases': 'عرض تفاصيل الإصدارات على GitHub',
    'requirements.os': 'نظام التشغيل',
    'requirements.architecture': 'نوع النظام',
    'requirements.processor': 'المعالج',
    'requirements.ram': 'الذاكرة (RAM)',
    'requirements.diskSpace': 'مساحة القرص',
    'requirements.internet': 'الاتصال بالإنترنت',
    'requirements.internet.desc': 'مطلوب للتنزيل والتفعيل والتحديث؛ العمل اليومي دون اتصال',
    'faq.badge': 'أسئلة شائعة',
    'faq.title': 'أسئلة قبل التحميل',
    'faq.intro': 'إجابات عن العمل دون إنترنت، والأمان، والمتطلبات، والنسخ الاحتياطي، والترخيص، والدعم.',
    'faq.offline.q': 'هل يعمل Mohasabi دون إنترنت؟',
    'faq.offline.a': 'نعم في الاستخدام اليومي. الاتصال يلزم للتنزيل والتفعيل والتحديث فقط.',
    'faq.latest.q': 'كيف أحصل على أحدث إصدار؟',
    'faq.latest.a':
      'استخدم زر التحميل في الموقع للحصول على ملف التثبيت من قناة GitHub Releases الرسمية، أو افتح صفحة الإصدارات إذا تعذر تنزيل الملف مباشرة.',
    'faq.data.q': 'هل بياناتي مخزنة على خادم سحابي؟',
    'faq.data.a':
      'يعتمد Mohasabi على التخزين المحلي للبيانات على جهازك. لا توجد مزامنة سحابية أو نسخ احتياطي خارجي تلقائي.',
    'faq.support.q': 'كيف أحصل على المساعدة؟',
    'faq.support.a':
      'تواصل معنا عبر WhatsApp أو البريد الإلكتروني عن التثبيت أو الخطط أو الاستخدام، مع ذكر الإصدار ووصف المشكلة دون إرسال بيانات محاسبية حساسة.',
    'faq.moreHelp': 'هل تحتاج إلى مزيد من المساعدة؟',
    'faq.openTicket': 'افتح تذكرة على GitHub',
    'cta.title': 'ابدأ بتنظيم أعمالك مع Mohasabi',
    'cta.subtitle': 'نزّل البرنامج، تعرّف على طريقة عمله، واختر الترخيص المناسب لاحتياجاتك.',
    'cta.downloadBtn': 'تحميل Mohasabi الآن',
    'cta.note': 'راجع متطلبات التشغيل الكاملة في دليل الاستخدام.',
    'footer.description': 'برنامج مكتبي لإدارة الفواتير والزبائن والموردين والمخزون على Windows.',
    'footer.links.home': 'الرئيسية',
    'footer.links.features': 'المميزات',
    'footer.links.requirements': 'متطلبات التشغيل',
    'footer.links.faq': 'الأسئلة الشائعة',
    'footer.links.releases': 'الإصدارات الرسمية',
    'footer.links.repository': 'المستودع الرسمي',
    'footer.pagesTitle': 'الأقسام',
    'footer.sectionsTitle': 'أقسام الصفحة الرئيسية',
    'footer.resourcesTitle': 'روابط رسمية',
    'hero.tagline': 'برنامج محاسبة وإدارة أعمال لنظام Windows',
    'hero.specLine': 'Windows 10 وWindows 11 · إصدار 64-bit',
    'hero.footnote': 'برنامج مكتبي ببيانات محلية، مع خيارات الترخيص حسب احتياجاتك.',
    'hero.featuresBtn': 'اكتشف المميزات',
    'challenges.title': 'رتّب التفاصيل، وركّز على عملك',
    'challenges.body1':
      'بين الفواتير المتعددة والديون المستحقة وحركة المخزون، تصبح متابعة التفاصيل مرهقة عندما تتوزّع المعلومات بين دفاتر وملفات مختلفة.',
    'challenges.body2':
      'يجمع Mohasabi أدوات إدارة أعمالك اليومية في برنامج واحد، لتجد معلوماتك بصورة أوضح وتتابع عملياتك بسهولة أكبر.',
    'challenges.b1.title': 'تنظيم أفضل',
    'challenges.b1.desc': 'اجمع الفواتير والزبائن والمنتجات في مكان واحد.',
    'challenges.b2.title': 'متابعة أوضح',
    'challenges.b2.desc': 'راجع المستحقات وحركة المنتجات بدل الاعتماد على التذكّر.',
    'challenges.b3.title': 'عمل دون اتصال دائم',
    'challenges.b3.desc': 'استخدم البرنامج محليًا حتى عند انقطاع الإنترنت.',
    'screenshots.closing': 'صور من البرنامج الحقيقي، حتى تتعرّف على الواجهة قبل تنزيله.',
    'screenshots.pending':
      'لم تُضف بعد لقطات حقيقية من الإصدار المنشور. إلى أن تتوفر، يشرح دليل الاستخدام طريقة العمل خطوة بخطوة.',
    'how.title': 'ابدأ في ثلاث خطوات',
    'how.step1.title': 'نزّل البرنامج',
    'how.step1.desc': 'نزّل ملف تثبيت Mohasabi المتوافق مع Windows 10 أو Windows 11 بنسخة 64-bit.',
    'how.step1.cta': 'تنزيل Mohasabi',
    'how.step2.title': 'ثبّته على حاسوبك',
    'how.step2.desc': 'شغّل ملف التثبيت واتبع التعليمات الظاهرة على الشاشة، واستعن بدليل التثبيت عند الحاجة.',
    'how.step2.cta': 'اقرأ دليل التثبيت',
    'how.step3.title': 'ابدأ بتنظيم أعمالك',
    'how.step3.desc': 'بعد إتمام التثبيت والإعداد المطلوب، أضف المنتجات والزبائن ثم أنشئ أول فاتورة وسجّل معاملاتك.',
    'how.step3.cta': 'تعرّف على طريقة الاستخدام',
    'offline.title': 'أعمالك لا تتوقف بسبب انقطاع الإنترنت',
    'offline.body1':
      'Mohasabi تطبيق مكتبي صُمّم للعمل محليًا على حاسوب Windows، لذلك الاستخدام المحلي المعتاد لا يحتاج إلى اتصال دائم بالإنترنت.',
    'offline.body2':
      'نظّم بياناتك وأدر عملياتك من جهازك، مع مراعاة أن تنزيل البرنامج وملفات التحديث والتواصل مع الدعم تحتاج إلى اتصال.',
    'offline.note': 'احتفظ بنسخة احتياطية حديثة من بياناتك، حتى إذا كنت تستخدم البرنامج دون اتصال.',
    'security.title': 'بيانات أعمالك تستحق العناية',
    'security.body':
      'بياناتك المحاسبية جزء مهم من عملك. لذلك يعتمد Mohasabi على التخزين المحلي ويوفّر نسخًا احتياطية واستعادة وفق الوظائف المتاحة في الإصدار.',
    'security.s1.title': 'تخزين محلي',
    'security.s1.desc': 'تُحفظ بيانات العمل على الحاسوب الذي تستخدمه، وفق إعداد البرنامج.',
    'security.s2.title': 'نسخ احتياطي تلقائي',
    'security.s2.desc':
      'نسخ احتياطية ZIP مؤرَّخة مع تحقق SHA-256 ومدة احتفاظ قابلة للضبط، وزر «نسخ الآن» وفتح مجلد النسخ.',
    'security.s3.title': 'استعادة مضبوطة',
    'security.s3.desc':
      'قائمة نسخ مع التاريخ والحجم والحالة، وتحقق كامل قبل الاستعادة، ونسخة طوارئ لبياناتك الحالية وإمكانية التراجع.',
    'security.disclaimer':
      'لا يوجد نظام يمكن وصفه بأنه آمن بنسبة 100%. احمِ حاسوبك وكلمات مرورك، واحتفظ بنسخة احتياطية منفصلة عن الجهاز عند الإمكان، وتحقّق دوريًا من إمكانية استعادتها.',
    'audience.title': 'مصمَّم لاحتياجات الأعمال اليومية',
    'audience.merchants.title': 'التجار وأصحاب المحلات',
    'audience.merchants.desc': 'تابع المنتجات والمبيعات والفواتير وحسابات الزبائن.',
    'audience.craft.title': 'الحرفيون ومقدمو الخدمات',
    'audience.craft.desc': 'نظّم عروض الأسعار والفواتير وسجلات معاملات العملاء.',
    'audience.small.title': 'المؤسسات الصغيرة والناشئة',
    'audience.small.desc': 'اجمع معلومات الزبائن والمنتجات والطلبات في أداة مكتبية واحدة.',
    'audience.teams.title': 'فرق العمل والإدارات الصغيرة',
    'audience.teams.desc': 'استخدم البرنامج ضمن بيئة العمل المحلية المناسبة لطبيعة مؤسستك وإعداداتك.',
    'preview.title': 'اختر الترخيص المناسب لعملك',
    'preview.subtitle': 'اختر الخطة والمدة التي تناسب احتياجاتك، وراجع تفاصيل كل خطة قبل الطلب.',
    'preview.from': 'من',
    'preview.ask': 'استفسر عن',
    'preview.compare': 'مقارنة الخطط والأسعار',
    'preview.note':
      'الأسعار بالدينار الجزائري وإرشادية. تواصل معنا لتأكيد السعر الحالي وتفاصيل الخطة وطريقة الحصول على الترخيص قبل إتمام الطلب.',
    'preview.tag.standard': 'للأعمال اليومية والاحتياجات الأساسية.',
    'preview.tag.pro': 'للأعمال التي تحتاج إلى إمكانات أوسع وفق المميزات المضمنة في الخطة.',
    'preview.tag.enterprise': 'للأنشطة التي تحتاج إلى الخطة الأعلى ضمن عروض Mohasabi.',
    'faq.requirements.q': 'ما متطلبات تشغيل البرنامج؟',
    'faq.requirements.a':
      'يستهدف الإصدار الحالي Windows 10 وWindows 11 بنسخة 64-bit. راجع دليل الاستخدام لمعرفة متطلبات المعالجة والذاكرة والتخزين المؤكدة قبل التثبيت.',
    'faq.backup.q': 'كيف أسترجع بياناتي أو أستخدم النسخ الاحتياطي؟',
    'faq.backup.a':
      'احتفظ بنسخة احتياطية حديثة في مكان آمن، واتبع خطوات النسخ والاستعادة الواردة في دليل الإصدار الذي تستخدمه. قبل استعادة نسخة قديمة، تحقّق من أنها تخص البيانات الصحيحة وأنها متوافقة مع إصدار البرنامج.',
    'faq.free.q': 'هل تنزيل البرنامج يعني أن جميع المميزات مجانية؟',
    'faq.free.a':
      'تنزيل ملف التثبيت لا يعني أن استخدام البرنامج أو كل الخطط مجاني. تختلف شروط الاستخدام وفق الترخيص الذي تختاره؛ تواصل معنا لتأكيد التفاصيل قبل الشراء.',
    'cta.pricingBtn': 'عرض الأسعار',
    'cta.supportLink': 'تحتاج إلى مساعدة؟ تواصل مع الدعم',
    'footer.links.privacy': 'سياسة الخصوصية',
    'footer.trademark': 'Windows علامة تجارية لشركة Microsoft. Mohasabi برنامج مستقل.',
    'privacy.title': 'سياسة الخصوصية',
    'privacy.subtitle': 'ما يجمعه هذا الموقع، وأين تعيش بيانات عملك فعليًا.',
    'privacy.local.title': 'بيانات عملك تبقى على جهازك',
    'privacy.local.body':
      'يخزّن Mohasabi بيانات الفواتير والزبائن والمنتجات محليًا على الحاسوب الذي تستخدمه، ضمن ملفات البرنامج ومجلد البيانات الذي تحدده. لا تُرفع إلى خادم ولا تُرسل إلى جهة خارجية.',
    'privacy.site.title': 'هذا الموقع لا يتتبعك',
    'privacy.site.body':
      'صفحات التعريف والأسعار والدليل ثابتة: لا تحليلات، ولا ملفات تعريف إعلانية، ولا نوافذ تتبع. لا نطلب بريدك ولا رقمك للاطلاع على المحتوى. أما النماذج التي ترسلها بنفسك فهي موضحة أدناه.',
    'privacy.contact.title': 'عندما تتواصل معنا',
    'privacy.contact.body':
      'تفتح أزرار WhatsApp والبريد رسالة على جهازك بما اخترته من خطة أو مدة أو نوع طلب. نطّلع فقط على ما ترسله بنفسك، ونستخدمه للرد على استفسارك أو طلب الترخيص.',
    'privacy.forms.title': 'نماذج الدعم والتقييمات',
    'privacy.forms.body':
      'عند إرسال نموذج الدعم نستلم الاسم والبريد ونوع الطلب ورقم الإصدار والرسالة؛ وعند إرسال تقييم نستلم البريد والاسم المعروض والتقييم والعنوان والنص. تُخزَّن هذه البيانات في قاعدة بيانات الموقع، ولا يطّلع عليها إلا مدير الموقع، ويُستخدم البريد لمنع التكرار والرجوع إليك بشأن الطلب. بعد الموافقة يُعرض نص التقييم والاسم المعروض فقط، ولا يُعرض البريد علنًا. لا توجد مدة حذف تلقائي محددة حاليًا، ويمكنك طلب حذف بياناتك عبر قناة الدعم.',
    'privacy.backup.title': 'النسخ الاحتياطي مسؤوليتك',
    'privacy.backup.body':
      'تُحفظ بياناتك محليًا على جهازك. قد ينتج فقدان البيانات عن تلف القرص أو حذف المجلد أو اختراق الحاسوب، لذلك احتفظ بنسخة منفصلة خارج الجهاز وتحقّق من استعادتها.',
    'seo.ogTitle': 'Mohasabi — نظّم أعمالك من مكان واحد',
    'seo.ogDescription':
      'تعرّف على Mohasabi، ونظّم الفواتير والزبائن والموردين والمخزون من خلال برنامج مكتبي لنظام Windows.',
    'seo.page.privacy': 'سياسة الخصوصية — Mohasabi',
    'footer.copyright': 'جميع الحقوق محفوظة.',
    'footer.versionLabel': 'الإصدار',
    'language.label': 'لغة الواجهة',
    'contact.whatsapp': 'واتساب',
    'contact.email': 'البريد الإلكتروني',
    'seo.title': 'Mohasabi | برنامج محاسبة وفواتير لنظام Windows',
    'seo.description':
      'نظّم فواتيرك وعروض الأسعار وحسابات الزبائن والموردين والمخزون باستخدام Mohasabi، برنامج مكتبي لنظام Windows يدعم العربية والفرنسية والعمل المحلي دون اتصال دائم بالإنترنت.',
    'a11y.mainNav': 'التنقل الرئيسي',
    'a11y.mobileNav': 'تنقل الهاتف',
    'a11y.toggleMenu': 'فتح القائمة أو إغلاقها',
    'a11y.skipToContent': 'الانتقال إلى المحتوى الرئيسي',
    'nav.guide': 'طريقة التشغيل',
    'nav.pricing': 'العروض والترخيص',
    'nav.support': 'الدعم والتواصل',
    'nav.features': 'المميزات',
    'nav.screenshots': 'لقطات الشاشة',
    'nav.how': 'كيفية العمل',
    'a11y.logoAlt': 'شعار Mohasabi',
    'seo.page.home': 'Mohasabi | برنامج محاسبة وفواتير لنظام Windows',
    'seo.page.guide': 'طريقة التشغيل — Mohasabi',
    'seo.page.pricing': 'العروض والترخيص — Mohasabi',
    'seo.page.support': 'الدعم والتواصل — Mohasabi',
    'footer.links.guide': 'طريقة التشغيل',
    'footer.links.pricing': 'العروض والترخيص',
    'footer.links.support': 'الدعم والتواصل',
    'plan.standard.name': 'Standard',
    'plan.pro.name': 'Pro',
    'plan.enterprise.name': 'Enterprise',
    'duration.month': 'شهر واحد',
    'duration.quarter': '3 أشهر',
    'duration.halfYear': '6 أشهر',
    'duration.year': '12 شهرًا',
    'pricing.badge': 'التراخيص',
    'pricing.currency': 'دج',
    'pricing.title': 'اختر الترخيص المناسب لعملك',
    'pricing.subtitle': 'الأسعار المعروضة إرشادية وقابلة للتغيير وفق الشروط التجارية المتفق عليها عند الطلب.',
    'pricing.recommended': 'الأكثر اختيارًا',
    'pricing.durationLabel': 'المدة',
    'pricing.priceLabel': 'السعر',
    'pricing.planCol': 'الخطة',
    'pricing.selectPlan': 'طلب هذا الترخيص',
    'pricing.askPlan': 'استفسار عن الخطة',
    'pricing.whatsappIntro': 'مرحبًا، أرغب في طلب ترخيص Mohasabi:',
    'pricing.inquiryIntro': 'مرحبًا، لدي استفسار حول تراخيص Mohasabi:',
    'pricing.orEmail': 'أو راسلنا بالبريد',
    'pricing.contactTitle': 'لا يوجد دفع داخل الموقع',
    'pricing.contactBody': 'اختيارك للخطة والمدة يفتح رسالة مختصرة إلى WhatsApp أو البريد، ثم تُستكمل التفاصيل والشروط مباشرة.',
    'pricing.indicativeTitle': 'الأسعار إرشادية',
    'pricing.indicativeBody': 'هذه الأرقام مرجعية وقد تتغير وفق العرض التجاري عند الطلب، ولا تُعد عقدًا أو التزامًا بسعر ثابت.',
    'pricing.paymentTitle': 'لا دفع إلكتروني',
    'pricing.paymentBody': 'لا يعرض الموقع بوابة دفع ولا يجمع بيانات بطاقات، ولا يتم تفعيل أي ترخيص تلقائيًا من المتصفح.',
    'pricing.termsTitle': 'الشروط عند الطلب',
    'pricing.termsBody': 'مدة الترخيص وعدد الأجهزة وشروط الدعم تُحدد في الاتفاق المباشر، ولا يعرض الموقع شروطًا غير مؤكدة.',
    'guide.badge': 'دليل البدء',
    'guide.title': 'ابدأ مع Mohasabi',
    'guide.subtitle': 'من تنزيل ملف التثبيت إلى أول عملية يومية، بترتيب مختصر يعتمد على ما هو متاح فعلًا في البرنامج.',
    'guide.videoTitle': 'شرح مصوّر',
    'guide.videoPendingTitle': 'الفيديو التعليمي قيد الإعداد',
    'guide.videoPendingBody': 'لم يُنشر فيديو حقيقي بعد. هذه المساحة مخصّصة له بنسبة 16:9، ولن يُعرض أي رابط فيديو مؤقت أو زر تشغيل لا يعمل.',
    'guide.videoAria': 'مساحة مخصصة للفيديو التعليمي، لم يُوفر المحتوى بعد',
    'guide.stepsTitle': 'خطوات البدء',
    'guide.step1.title': 'حمّل ملف التثبيت',
    'guide.step1.desc': 'احصل على Mohasabi_Setup_v1.0.3.exe من قناة الإصدارات الرسمية على GitHub.',
    'guide.step2.title': 'ثبّت البرنامج على Windows',
    'guide.step2.desc': 'شغّل ملف الإعداد واتبع خطوات التثبيت على جهاز يعمل بنظام Windows 10 أو Windows 11 بعمارة 64-bit.',
    'guide.step3.title': 'شغّل Mohasabi',
    'guide.step3.desc': 'افتح البرنامج من اختصار سطح المكتب أو قائمة البرامج بعد اكتمال التثبيت.',
    'guide.stepNote': 'تحقّق من رقم الإصدار واسم الملف الظاهرين أدناه قبل المتابعة.',
    'guide.functionsTitle': 'الوظائف الأساسية المتوفرة',
    'guide.functionsIntro': 'الشاشات الأساسية التي يفتحها المستخدم بعد اكتمال التثبيت.',
    'guide.helpTitle': 'تعثّر التثبيت أو الترخيص؟',
    'guide.helpBody': 'انتقل إلى صفحة الدعم لاختيار نوع الطلب وفتح رسالة مختصرة بالواتساب أو البريد.',
    'guide.supportCta': 'الدعم والتواصل',
    'guide.pricingCta': 'العروض والترخيص',
    'support.badge': 'الدعم',
    'support.title': 'نحن هنا لمساعدتك',
    'support.subtitle': 'اختر قناة التواصل المناسبة، وحدّد نوع طلبك حتى تصل الرسالة واضحة من البداية.',
    'support.whatsappTitle': 'واتساب',
    'support.whatsappBody': 'أسرع طريقة للاستفسار عن التثبيت أو الترخيص أو الاستخدام اليومي.',
    'support.emailTitle': 'البريد الإلكتروني',
    'support.emailBody': 'مناسب للطلبات التي تحتاج تفاصيل أو ملفات وصف مشكلة مكتوب.',
    'support.issuesTitle': 'الإبلاغ عن خلل في البرنامج',
    'support.issuesBody': 'إذا كان المشكلة قابلة للتكرار، يمكن فتح Issue في المستودع الرسمي مع ذكر الخطوات والإصدار.',
    'support.requestTitle': 'حدّد نوع طلبك',
    'support.requestBody': 'تفتح كل بطاقة رسالة واتساب مختصرة تحتوي على نوع الطلب فقط، دون أي بيانات شخصية أو مالية.',
    'support.reqIntro': 'مرحبًا، أرغب في الدعم بخصوص:',
    'support.req.install': 'مشكلة في التثبيت أو التشغيل',
    'support.req.activation': 'طلب تفعيل ترخيص',
    'support.req.duration': 'استفسار عن مدة الترخيص',
    'support.req.renewal': 'استفسار عن تجديد الترخيص',
    'support.req.purchase': 'طلب شراء ترخيص',
    'support.req.other': 'استفسار عام',
    'support.infoTitle': 'معلومات تساعد على فهم مشكلتك',
    'support.info1': 'إصدار البرنامج: Mohasabi v1.0.3 أو الإصدار الظاهر داخل البرنامج.',
    'support.info2': 'نظام التشغيل: Windows 10 أو 11 ونوع العمارة.',
    'support.info3': 'الخطوات التي أدّت إلى المشكلة بالتفصيل.',
    'support.info4': 'نص رسالة الخطأ كما تظهر، أو لقطة شاشة لها.',
    'support.info5': 'متى بدأت المشكلة وهل سبقتها تحديثات أو تغييرات في الجهاز.',
    'support.avoidTitle': 'لا ترسل هذه البيانات عبر المحادثة',
    'support.avoid1': 'كلمات المرور أو مفاتيح التفعيل أو ملفات الترخيص.',
    'support.avoid2': 'قواعد بيانات العملاء أو الفواتير الحقيقية أو أي ملفات تحتوي بيانات أشخاص.',
    'support.avoid3': 'معلومات مالية حساسة أو بيانات بطاقات دفع.',
    'support.faq1.q': 'كيف أبلغ عن خلل يمكن إعادة حدوثه؟',
    'support.faq1.a': 'اذكر إصدار البرنامج وخطوات إعادة الحدوث ونص الرسالة الظاهرة، ويمكن فتح Issue في المستودع الرسمي بدل ذلك.',
    'support.faq2.q': 'هل تتوفر نسخة تجريبية قبل الشراء؟',
    'support.faq2.a': 'لا يعرض الموقع نسخة تجريبية تلقائية. تُناقش إمكانية التجربة أو العرض التوضيحي عند التواصل المباشر حسب ما يُتفق عليه.',
  },
  fr: {
    'footer.links.whatsNew': 'Nouveautés',
    'footer.links.reviews': 'Avis des utilisateurs',
    'footer.links.terms': 'Conditions générales',
    'nav.whatsNew': 'Nouveautés',
    'nav.reviews': 'Avis',
    'nav.terms': 'Conditions',
    'settings.ariaLabel': 'Paramètres',
    'settings.languageTitle': 'Langue',
    'seo.page.features': 'Fonctionnalités — Mohasabi',
    'seo.page.whatsNew': 'Nouveautés — Mohasabi',
    'seo.page.reviews': 'Avis des utilisateurs — Mohasabi',
    'seo.page.terms': 'Conditions générales — Mohasabi',
    'seo.desc.home':
      'Mohasabi, logiciel de comptabilité et de facturation pour Windows : factures, devis, clients, fournisseurs et stock, en local et en trois langues.',
    'seo.desc.features':
      'Découvrez les fonctions réellement livrées dans Mohasabi : documents, clients et fournisseurs, stock, rapports et trois langues.',
    'seo.desc.guide':
      'Téléchargez Mohasabi v1.0.3, vérifiez le fichier, installez-le sous Windows et comprenez l’avertissement SmartScreen et l’empreinte SHA-256.',
    'seo.desc.pricing':
      'Tarifs des licences Mohasabi en dinars algériens : Standard, Pro et Enterprise, pour 1, 3, 6 ou 12 mois, commande par WhatsApp ou e-mail.',
    'seo.desc.support':
      'Contactez l’assistance Mohasabi par WhatsApp ou e-mail et décrivez votre problème sans envoyer de mots de passe ni de données clients.',
    'seo.desc.reviews':
      'Avis publiés des utilisateurs de Mohasabi après modération, et formulaire pour partager votre expérience sans afficher votre e-mail.',
    'seo.desc.whatsNew':
      'Historique des versions publiées de Mohasabi sur GitHub Releases : notes, taille du fichier et empreinte SHA-256.',
    'seo.desc.privacy':
      'Politique de confidentialité du site Mohasabi : données envoyées via les formulaires, où elles sont stockées et comment demander leur suppression.',
    'seo.desc.terms':
      'Conditions d’utilisation du site Mohasabi et des licences du logiciel : périmètre, mises à jour, propriété et responsabilité.',
    'notFound.title': 'Page introuvable — Mohasabi',
    'notFound.body':
      'Le lien demandé n’existe pas ou a changé. Revenez à l’accueil ou contactez l’assistance.',
    'notFound.home': 'Retour à l’accueil',
    'notFound.support': 'Assistance',
    'common.loading': 'Chargement…',
    'featuresPage.badge': 'Fonctionnalités',
    'featuresPage.title': 'Les capacités réellement livrées dans la version publiée',
    'featuresPage.subtitle': 'Tout ce qui suit est disponible dans la version Windows publiée, sans fonctionnalité bêta ni promesse non tenue.',
    'feat.group.documents': 'Documents et ventes',
    'feat.group.people': 'Tiers et créances',
    'feat.group.inventory': 'Produits et stock',
    'feat.group.trust': 'Confiance et continuité',
    'feat.benefitLabel': 'Intérêt :',
    'feat.documents.benefit': 'Vos documents sortent prêts à envoyer ou à archiver, sans les recopier dans un fichier séparé.',
    'feat.reports.benefit': 'Suivez vos ventes et vos créances en fin de mois sans tableur manuel.',
    'feat.import.title': 'Importation CSV',
    'feat.import.desc': 'Clients et produits peuvent être chargés en une fois via un fichier CSV, avec un modèle affiché selon l’état de la licence.',
    'feat.import.benefit': 'Vous démarrez avec vos données existantes plutôt que de les ressaisir ligne à ligne.',
    'feat.partners.benefit': 'Un dossier par client ou fournisseur, relié à ses factures et à ses soldes.',
    'feat.debts.benefit': 'Sachez qui vous doit et suivez le recouvrement avant l’accumulation.',
    'feat.stock.benefit': 'Évitez de vendre ce que vous n’avez plus : les quantités suivent le magasin.',
    'feat.localData.benefit': 'Pas d’abonnement cloud obligatoire, aucune donnée envoyée à un tiers.',
    'feat.licence.title': 'Licence liée à l’appareil',
    'feat.licence.desc': 'Depuis la 1.0.3, l’application affiche un identifiant matériel (processeur, carte mère, BIOS) qui lie la licence à votre poste, avec restauration chiffrée après mise à jour.',
    'feat.licence.benefit': 'Une licence par machine, et une mise à jour qui ne vous fait pas réactiver.',
    'feat.offline.title': 'Fonctionnement hors ligne',
    'feat.offline.desc': 'Facturation et suivi se font en local ; le réseau sert au téléchargement, à l’activation et aux mises à jour.',
    'feat.offline.benefit': 'Continuez à travailler quand le réseau tombe ou sur un site sans internet.',
    'feat.languages.benefit': 'Interface arabe complète avec RTL, plus français et anglais pour votre équipe et vos clients.',
    'feat.theme.title': 'Thème sombre',
    'feat.theme.desc': 'La version publiée propose un thème sombre retravaillé à côté du thème clair.',
    'feat.theme.benefit': 'Un confort visuel pour le travail de soirée prolongé.',
    'featuresPage.ctaTitle': 'Prêt à l’essayer vraiment ?',
    'featuresPage.ctaBody': 'Commencez par le mode d’emploi, puis choisissez la licence adaptée à votre activité.',
    'featuresPage.guideCta': 'Mode d’emploi',
    'featuresPage.pricingCta': 'Offres de licence',
    'featuresPage.updatesCta': 'Lire les dernières nouveautés',
    'whatsNew.badge': 'Nouveautés',
    'whatsNew.title': 'Les versions réellement publiées',
    'whatsNew.subtitle': 'Dates réelles, liens officiels et empreintes SHA-256 publiées, issus du canal officiel des versions.',
    'whatsNew.publishedBadge': 'Publiée',
    'whatsNew.sizeLabel': 'Taille du fichier',
    'whatsNew.assetLabel': 'Programme d’installation',
    'whatsNew.downloadBtn': 'Télécharger',
    'whatsNew.detailsBtn': 'Détails de la version',
    'whatsNew.latestNote': 'La dernière version publiée est {version}.',
    'whatsNew.sourceTitle': 'Source des informations',
    'whatsNew.sourceBody': 'Numéros, dates et empreintes proviennent du fichier version.json publié avec chaque version dans le dépôt officiel, pas d’un texte marketing.',
    'whatsNew.releasesLink': 'Page des versions officielles',
    'whatsNew.roadmapTitle': 'Mises à jour prévues',
    'whatsNew.roadmapBody': 'Aucune feuille de route officielle n’est publiée : cette page ne montre donc rien qui ne soit déjà sorti.',
    'whatsNew.autoUpdateTitle': 'Mise à jour dans l’application',
    'whatsNew.autoUpdateBody': 'Mohasabi interroge le canal des versions, propose la mise à jour et vérifie l’empreinte SHA-256 avant exécution.',
    'whatsNew.guideLink': 'Mettre à jour étape par étape',
    'whatsNew.groupAdded': 'Nouveautés',
    'whatsNew.groupFixed': 'Corrections',
    'whatsNew.groupImproved': 'Améliorations',
    'whatsNew.cautionTitle': 'Attention',
    'whatsNew.notFoundTitle': 'Version introuvable',
    'whatsNew.notFoundBody': 'Cette version n’apparaît pas dans la liste des versions publiées.',
    'whatsNew.backToList': 'Retour aux nouveautés',
    'whatsNew.downloadTitle': 'Programme d’installation',
    'whatsNew.shaTitle': 'Empreinte SHA-256',
    'whatsNew.shaCopy': 'Copier l’empreinte',
    'whatsNew.shaCopied': 'Copiée',
    'whatsNew.shaHint': 'Comparez l’empreinte au fichier téléchargé avant de l’exécuter ; la méthode dépend de votre outil et de Windows.',
    'guide.step.req.title': 'Vérifiez la configuration requise',
    'guide.step.req.desc': 'Mohasabi fonctionne sur Windows 10/11 64 bits, avec 4 Go de RAM minimum et 500 Mo d’espace disque.',
    'guide.step.fileCheck.title': 'Vérifiez le nom et la source du fichier',
    'guide.step.fileCheck.desc': 'Le fichier doit venir du canal officiel des versions et porter exactement le nom de la version annoncée ; n’exécutez aucune copie d’une autre source.',
    'guide.step.shaCheck.title': 'Vérifiez l’empreinte SHA-256',
    'guide.step.shaCheck.desc': 'Comparez l’empreinte du fichier téléchargé avec celle publiée dans la page des nouveautés ; toute différence signifie que le fichier n’est pas l’original.',
    'guide.step.setupFinish.title': 'Terminez l’installation',
    'guide.step.setupFinish.desc': 'Suivez l’assistant jusqu’au bout et laissez l’application créer son raccourci ; n’annulez pas pendant la copie des fichiers.',
    'guide.step.activation.title': 'Activez la licence',
    'guide.step.activation.desc': 'Ouvrez l’écran de licence, copiez l’identifiant matériel et transmettez-le par le canal d’assistance officiel pour obtenir la licence.',
    'guide.step.firstInvoice.title': 'Créez votre première facture',
    'guide.step.firstInvoice.desc': 'Depuis les documents, ajoutez une facture, choisissez ou créez le client, ajoutez les lignes et contrôlez le total avant enregistrement.',
    'guide.step.partners.title': 'Ajoutez clients et fournisseurs',
    'guide.step.partners.desc': 'Enregistrez les tiers avec leurs coordonnées et leurs soldes, en évitant les doublons de nom ou d’email.',
    'guide.step.stock.title': 'Organisez produits et stock',
    'guide.step.stock.desc': 'Créez vos produits avec prix et quantités, ou importez-les en une fois depuis un CSV.',
    'guide.step.backup.title': 'Sauvegardez vos données',
    'guide.step.backup.desc': 'Les données restent sur votre machine : créez des sauvegardes régulières conservées ailleurs.',
    'guide.step.troubleshooting.title': 'Résoudre les problèmes courants',
    'guide.step.troubleshooting.desc': 'En cas d’alerte ou d’échec, contrôlez nom et empreinte, réinstallez et vérifiez l’espace disque.',
    'guide.step.contact.title': 'Contacter l’assistance',
    'guide.step.contact.desc': 'Écrivez via WhatsApp ou email en indiquant la version et l’identifiant matériel si nécessaire.',
    'guide.smart.title': 'Une alerte Windows SmartScreen s’affiche pendant l’installation ?',
    'guide.smart.body': 'Windows affiche cet avertissement quand l’application n’est pas encore reconnue par les services de réputation ou n’est pas signée par un certificat de confiance ; cela ne signifie pas forcément que le fichier est dangereux.',
    'guide.smart.checkTitle': 'Avant toute action, vérifiez',
    'guide.smart.check1': 'que le fichier vient de ce site ou du canal officiel des versions sur GitHub.',
    'guide.smart.check2': 'que le nom du fichier correspond exactement au nom de la version publiée.',
    'guide.smart.check3': 'que l’empreinte SHA-256 correspond à l’empreinte annoncée ; sinon n’exécutez pas le fichier et supprimez-le.',
    'guide.smart.stepsTitle': 'Si la source est confirmée',
    'guide.smart.steps': 'Dans la fenêtre d’alerte, cliquez sur More info ; l’option Run anyway peut alors apparaître. Ces libellés varient selon l’édition de Windows et les stratégies de l’entreprise.',
    'guide.smart.warn': 'Nous ne demandons jamais de désactiver Windows Defender ou SmartScreen au niveau du système, et un avertissement n’est pas automatiquement sûr.',
    'guide.smart.hashLink': 'L’empreinte publiée de cette version',
    'guide.smart.releasesCta': 'Page des versions officielles',
    'guide.smart.recentBuild': 'Cette alerte peut ne pas apparaître sur un autre poste : elle dépend de la réputation du fichier et de ses téléchargements.',
    'reviews.badge': 'Avis des utilisateurs',
    'reviews.title': 'Des retours réels sur Mohasabi',
    'reviews.subtitle': 'Cette page n’affiche que les avis validés par l’équipe Mohasabi. Aucun avis automatique, aucun contenu de test.',
    'reviews.listTitle': 'Avis publiés',
    'reviews.serviceDown': 'Le service d’avis est indisponible : les avis publiés ne peuvent être affichés et aucun nouvel avis n’est enregistré.',
    'reviews.emptyTitle': 'Aucun avis publié pour l’instant',
    'reviews.emptyBody': 'Aucun avis n’a encore été validé. Partagez votre expérience réelle après avoir utilisé le logiciel.',
    'reviews.starsAria': 'Note {rating} sur 5',
    'reviews.formTitle': 'Donnez votre avis',
    'reviews.formSubtitle': 'Écrivez votre expérience réelle. L’avis part en revue et ne devient public qu’après validation.',
    'reviews.rule1.label': 'Revue humaine.',
    'reviews.rule1.body': 'Chaque avis reste privé jusqu’à validation par l’administrateur.',
    'reviews.rule2.label': 'Email non publié.',
    'reviews.rule2.body': 'Votre e-mail sert uniquement à éviter les doublons et à vous recontacter au sujet de l’avis ; il n’est jamais publié.',
    'reviews.rule3.label': 'Usage réel.',
    'reviews.rule3.body': 'Les avis promotionnels, en double ou anonymes sont refusés.',
    'reviews.privacyLink': 'Comment vos données sont traitées ?',
    'reviews.emailLabel': 'Votre email',
    'reviews.emailHint': 'Pour éviter les doublons et vous recontacter au sujet de l’avis ; jamais publié.',
    'reviews.nameLabel': 'Nom affiché (facultatif)',
    'reviews.namePlaceholder': 'Votre nom ou votre activité',
    'reviews.nameHint': 'C’est ce que verront les visiteurs ; laissez vide pour afficher « Mohasabi ».',
    'reviews.ratingLabel': 'Note',
    'reviews.starOption': '{value} sur 5',
    'reviews.titleLabel': 'Titre court',
    'reviews.bodyLabel': 'Détail de votre expérience',
    'reviews.bodyHint': 'Au moins 15 caractères ({count} actuellement).',
    'reviews.consent': 'J’accepte la publication de mon texte et de mon nom affiché après revue et validation par l’équipe Mohasabi.',
    'reviews.submit': 'Envoyer l’avis',
    'reviews.sending': 'Envoi en cours…',
    'reviews.queued': 'Votre avis est envoyé et en attente de revue ; il ne sera pas publié sans validation.',
    'reviews.unavailable': 'Le service d’avis est injoignable depuis cet appareil : votre avis n’a pas été envoyé.',
    'reviews.whatsappFallback': 'Envoyez votre avis sur WhatsApp',
    'reviews.whatsappIntro': 'Je souhaite partager mon avis sur Mohasabi :',
    'reviews.duplicate': 'Un avis similaire a déjà été envoyé depuis cette adresse.',
    'reviews.rateLimited': 'Trop de demandes pour l’instant ; réessayez dans quelques instants.',
    'reviews.rejected': 'Avis non accepté : vérifiez les champs puis réessayez.',
    'reviews.contactInstead': 'Ou contactez-nous directement',
    'reviews.error.email': 'Adresse email invalide.',
    'reviews.error.rating': 'Choisissez une note de 1 à 5.',
    'reviews.error.title': 'Titre trop court (3 caractères minimum).',
    'reviews.error.body': 'Texte trop court (15 caractères minimum).',
    'reviews.error.bodyLong': 'Texte trop long (1200 caractères maximum).',
    'reviews.error.consent': 'L’acceptation de la publication après revue est requise.',
    'terms.badge': 'Conditions générales',
    'terms.title': 'Conditions d’utilisation du site et du logiciel',
    'terms.subtitle': 'Un texte qui dit clairement ce que s’engage l’utilisateur et ce que s’engage l’éditeur.',
    'terms.updatedLabel': 'Dernière mise à jour',
    'terms.updatedValue': '24 octobre 2026',
    'terms.contentsTitle': 'Sommaire',
    'terms.contentsAria': 'Table des conditions',
    'terms.privacyNote': 'Pour vos données personnelles, consultez',
    'terms.acceptance.title': 'Acceptation',
    'terms.acceptance.body': 'Utiliser ce site ou télécharger Mohasabi vaut acceptation des présentes conditions. Sinon, cessez d’utiliser le site et n’installez pas le logiciel.',
    'terms.licence.title': 'Portée de la licence',
    'terms.licence.body': 'La licence couvre un poste selon la formule et la durée choisies, et est liée à l’identifiant matériel de l’appareil. Les licences déjà émises restent valides. Elle n’inclut ni revente, ni redistribution, ni modification du logiciel.',
    'terms.warranty.title': 'Logiciel « en l’état »',
    'terms.warranty.body': 'L’éditeur travaille à fournir une version stable, mais le logiciel est fourni en l’état, sans garantie absolue d’absence d’erreurs ni d’adéquation à tout usage. La vérification de vos données et calculs vous reste propre.',
    'terms.data.title': 'Données et sauvegarde',
    'terms.data.body': 'Vos données sont stockées sur votre machine ; nous n’en demandons pas l’accès et ne gérons aucun serveur qui les hébergerait. La sauvegarde périodique et la protection de l’appareil vous incombent.',
    'terms.pricing.title': 'Tarifs et demandes',
    'terms.pricing.body': 'Les tarifs sont indiqués en dinar algérien, à titre indicatif et susceptibles de changer sans préavis. Aucun paiement en ligne n’est possible via ce site ; les demandes et activations passent par les canaux d’assistance officiels.',
    'terms.updates.title': 'Mises à jour',
    'terms.updates.body': 'Les mises à jour sont publiées dans le dépôt officiel des versions ; l’application les télécharge depuis cette source, vérifie l’empreinte SHA-256 avant exécution, et applique les mises à jour différées à la fermeture.',
    'terms.property.title': 'Propriété intellectuelle',
    'terms.property.body': 'Le nom Mohasabi, son logo et le contenu de ce site appartiennent à l’éditeur et ne peuvent être réutilisés sans autorisation. Les autres marques citées appartiennent à leurs titulaires.',
    'terms.liability.title': 'Limites de responsabilité',
    'terms.liability.body': 'Dans les limites permises par le droit applicable, l’éditeur ne répond pas des dommages indirects ni de la perte de données résultant d’une absence de sauvegarde.',
    'terms.changes.title': 'Évolution des conditions',
    'terms.changes.body': 'Ces conditions peuvent être mises à jour ; la version publiée sur cette page à la date indiquée s’applique, et il est conseillé de la relire avant toute demande de licence.',
    'terms.contact.title': 'Questions sur les conditions',
    'terms.contact.body': 'Pour toute question sur la licence ou ces conditions, utilisez l’un des canaux d’assistance officiels.',
    'support.form.title': 'Envoyer une demande',
    'support.form.subtitle': 'Remplissez le formulaire ; votre demande arrive dans la file d’assistance. En cas d’échec, utilisez WhatsApp ou l’email.',
    'support.form.name': 'Nom',
    'support.form.email': 'Email',
    'support.form.topic': 'Type de problème',
    'support.form.version': 'Numéro de version (facultatif)',
    'support.form.message': 'Description du problème',
    'support.form.submit': 'Envoyer la demande',
    'support.form.sending': 'Envoi en cours…',
    'support.form.queued': 'Votre demande est enregistrée ; l’assistance répondra à votre email.',
    'support.form.errorName': 'Nom trop court.',
    'support.form.errorEmail': 'Adresse email invalide.',
    'support.form.errorMessage': 'Décrivez en au moins 20 caractères.',
    'support.form.unavailable': 'Le service de messages est injoignable : votre demande n’a pas été envoyée. Utilisez WhatsApp ou l’email.',
    'support.form.rateLimited': 'Trop de demandes ; réessayez dans quelques instants.',
    'support.form.rejected': 'La demande a été refusée ; vérifiez les informations et réessayez.',
    'admin.title': 'Administration Mohasabi',
    'admin.checking': 'Vérification de la session…',
    'admin.notDeployedTitle': 'Le service d’administration n’est pas déployé sur cet hébergement',
    'admin.notDeployedBody': 'Le tableau de bord exige authentification et droits appliqués côté serveur. Tant que ce service n’est pas déployé, la gestion du contenu reste fermée et rien ne peut être modifié ici.',
    'admin.navAria': 'Navigation du tableau de bord',
    'admin.nav.dashboard': 'Tableau de bord',
    'admin.nav.reviews': 'Modération des avis',
    'admin.nav.pricing': 'Tarifs et formules',
    'admin.nav.messages': 'Messages d’assistance',
    'admin.nav.activity': 'Journal des modifications',
    'admin.signOut': 'Se déconnecter',
    'admin.loginTitle': 'Connexion administrateur',
    'admin.loginBody': 'Ce tableau de bord est privé et exige une authentification serveur. Masquer son adresse ne suffit pas, et le mot de passe n’est jamais stocké dans le code de l’interface.',
    'admin.passwordLabel': 'Mot de passe',
    'admin.signIn': 'Se connecter',
    'admin.badCredentials': 'Identifiants incorrects.',
    'admin.rateLimited': 'Trop de tentatives ; patientez avant de réessayer.',
    'admin.backendMissing': 'Le service d’administration n’est pas relié à cet environnement ; redéployez le serveur puis réessayez.',
    'admin.loading': 'Chargement…',
    'admin.stats.pendingReviews': 'Avis en attente',
    'admin.stats.approvedReviews': 'Avis publiés',
    'admin.stats.unreadMessages': 'Messages non lus',
    'admin.stats.pricingUpdated': 'Dernière mise à jour des tarifs',
    'admin.dashboardNote': 'Tous les chiffres proviennent de la base du site ; les publications sont tracées dans le journal des modifications.',
    'admin.filter.pending': 'En attente',
    'admin.filter.approved': 'Publiés',
    'admin.filter.rejected': 'Refusés',
    'admin.noReviews': 'Aucun élément dans cet état.',
    'admin.approve': 'Publier',
    'admin.reject': 'Refuser',
    'admin.pricingNote': 'Toute enregistrmodification ici se répercute sur la page des offres et est tracée avec son motif dans le journal.',
    'admin.pricingCaption': 'Grille tarifière des licences',
    'admin.col.plan': 'Formule',
    'admin.pricingReason': 'Motif du changement (visible dans le journal)',
    'admin.pricingSaved': 'Tarifs enregistrés et modification tracée.',
    'admin.pricingInvalid': 'Valeur invalide : les prix doivent être des entiers positifs.',
    'admin.saveFailed': 'Enregistrement échoué ; réessayez.',
    'admin.save': 'Enregistrer',
    'admin.noMessages': 'Aucun message.',
    'admin.read': 'Lue',
    'admin.unread': 'Non lue',
    'admin.markRead': 'Marquer comme lu',
    'admin.noActivity': 'Aucune modification enregistrée.',
    'nav.home': 'Accueil',
    'nav.download': 'Télécharger Mohasabi',
    'hero.title': 'Votre activité, plus claire. Vos comptes, plus simples.',
    'hero.subtitle':
      'Créez vos factures, devis et documents commerciaux, et suivez clients, stock et créances depuis un seul endroit. Avec Mohasabi, organisez votre quotidien sur votre ordinateur et travaillez même sans connexion permanente à Internet.',
    'hero.downloadBtn': 'Télécharger le programme',
    'hero.downloadPendingBtn': 'Téléchargement en préparation',
    'hero.version': 'Version',
    'hero.windowsOnly': 'pour Windows',
    'hero.pendingNote':
      'Le fichier d\'installation de cette version est en cours de publication sur le canal officiel.',
    'hero.releasesLink': 'Page des versions',
    'hero.illustrationAlt': 'Illustration de l\'interface du logiciel, et non une capture réelle',
    'hero.illustrationCaption': 'Une seule interface pour suivre factures, clients et stock.',
    'features.badge': 'Fonctionnalités',
    'features.title': 'Tout pour gérer votre journée de travail',
    'features.subtitle': 'Les capacités réellement disponibles dans la version actuelle.',
    'features.localData.title': 'Données locales et sauvegarde',
    'features.localData.desc':
      'Vos données professionnelles restent sur votre machine, avec des archives ZIP horodatées, une vérification SHA-256 et une restauration qui copie d\'abord vos données actuelles.',
    'features.documents.title': 'Factures et devis',
    'features.documents.desc':
      'Créez factures, devis, commandes, bons de livraison et ordres de mission, et centralisez vos documents commerciaux.',
    'features.partners.title': 'Clients et fournisseurs',
    'features.partners.desc':
      'Conservez les fiches clients avec soldes et commandes en cours, et suivez les commandes fournisseurs et les réceptions.',
    'features.debts.title': 'Créances et soldes',
    'features.debts.desc':
      'Consultez le solde de chaque client et le report des impayés pour distinguer ce qui est encaissé de ce qui reste dû.',
    'features.stock.title': 'Stock et produits',
    'features.stock.desc':
      'Gérez le catalogue produits et services et les quantités, avec point de réapprovisionnement et vue des stocks bas.',
    'features.reports.title': 'Rapports et exports',
    'features.reports.desc':
      'Tableau de bord, rapports mensuels, déclaration TVA par taux et meilleurs clients, avec export PDF, Excel, Word et CSV.',
    'features.languages.title': 'Interface arabe, française et anglaise',
    'features.languages.desc':
      'Basculez entre les trois langues avec support RTL ou LTR, et choisissez le thème clair, sombre ou système.',
    'screenshots.badge': 'Captures d\'écran',
    'screenshots.title': 'Découvrez Mohasabi tel qu\'il est',
    'screenshots.subtitle': 'Explorez l\'interface réelle et voyez comment les informations sont présentées.',
    'screenshots.pendingTitle': 'Captures d\'écran pas encore disponibles',
    'screenshots.pendingSubtitle': 'Ce site n\'affiche aucune image d\'interface qui n\'existe pas.',
    'screenshots.zoomHint': 'Cliquez sur une capture pour l\'agrandir • Navigation au clavier disponible',
    'screenshots.closeAria': 'Fermer la visionneuse',
    'screenshots.prevAria': 'Capture précédente',
    'screenshots.nextAria': 'Capture suivante',
    'screenshots.alt.main': 'Interface de Mohasabi pour gérer factures et activité',
    'screenshots.alt.dashboard': 'Tableau de bord',
    'screenshots.alt.invoices': 'Factures et devis',
    'screenshots.alt.clients': 'Clients et fournisseurs',
    'screenshots.alt.products': 'Produits et stock',
    'requirements.badge': 'Configuration',
    'requirements.title': 'Configuration requise pour Mohasabi',
    'requirements.colComponent': 'Composant',
    'requirements.colSpec': 'Spécification',
    'requirements.colStatus': 'Statut',
    'requirements.statusSupported': 'Pris en charge',
    'requirements.statusRecommended': 'Recommandé',
    'requirements.statusMinimum': 'Minimum',
    'requirements.statusConditional': 'Conditionnel',
    'requirements.notesTitle': 'Notes importantes',
    'requirements.note1': 'Les valeurs ci-dessus correspondent à la version affichée sur cette page.',
    'requirements.note2': 'L\'application fonctionne hors ligne après l\'activation initiale.',
    'requirements.note3':
      'Une connexion Internet est requise pour le téléchargement, l\'activation et les mises à jour.',
    'requirements.note4': 'Consultez la page des versions pour les notes de détail.',
    'requirements.viewReleases': 'Voir les détails sur GitHub Releases',
    'requirements.os': 'Système d\'exploitation',
    'requirements.architecture': 'Architecture',
    'requirements.processor': 'Processeur',
    'requirements.ram': 'Mémoire (RAM)',
    'requirements.diskSpace': 'Espace disque',
    'requirements.internet': 'Connexion Internet',
    'requirements.internet.desc':
      'Requise pour le téléchargement, l\'activation et les mises à jour ; travail quotidien hors ligne',
    'faq.badge': 'Questions fréquentes',
    'faq.title': 'Questions avant le téléchargement',
    'faq.intro':
      'Réponses sur le travail hors ligne, la sécurité, les prérequis, la sauvegarde, la licence et le support.',
    'faq.offline.q': 'Mohasabi fonctionne-t-il sans Internet ?',
    'faq.offline.a': "Oui pour l'usage quotidien. Une connexion est nécessaire uniquement pour le téléchargement, l'activation et les mises à jour.",
    'faq.latest.q': 'Comment obtenir la dernière version ?',
    'faq.latest.a':
      'Utilisez le bouton de téléchargement pour obtenir le fichier depuis le canal GitHub Releases officiel, ou ouvrez la page des versions si le téléchargement direct échoue.',
    'faq.data.q': 'Mes données sont-elles stockées sur un serveur cloud ?',
    'faq.data.a':
      'Mohasabi stocke les données localement sur votre appareil. Il n\'y a pas de synchronisation cloud ni de sauvegarde externe automatique.',
    'faq.support.q': 'Comment obtenir de l\'aide ?',
    'faq.support.a':
      "Écrivez-nous via WhatsApp ou l'adresse e-mail indiquée sur la page d'assistance pour l'installation, les plans ou l'usage, en précisant la version et le problème, sans envoyer de données comptables sensibles.",
    'faq.moreHelp': 'Besoin de plus d\'aide ?',
    'faq.openTicket': 'Ouvrir un ticket sur GitHub',
    'cta.title': 'Organisez votre activité avec Mohasabi',
    'cta.subtitle': 'Téléchargez le logiciel, découvrez son fonctionnement et choisissez la licence adaptée.',
    'cta.downloadBtn': 'Télécharger Mohasabi maintenant',
    'cta.note': "Consultez la configuration requise dans le mode d'emploi.",
    'footer.description': 'Une application de bureau pour gérer factures, clients, fournisseurs et stock sur Windows.',
    'footer.links.home': 'Accueil',
    'footer.links.features': 'Fonctionnalités',
    'footer.links.requirements': 'Configuration requise',
    'footer.links.faq': 'Questions fréquentes',
    'footer.links.releases': 'Versions officielles',
    'footer.links.repository': 'Dépôt officiel',
    'footer.pagesTitle': 'Pages',
    'footer.sectionsTitle': 'Sections',
    'footer.resourcesTitle': 'Liens officiels',
    'hero.tagline': 'Logiciel de comptabilité et de gestion pour Windows',
    'hero.specLine': 'Windows 10 et Windows 11 · 64 bits',
    'hero.footnote': 'Une application de bureau avec données locales et des licences selon vos besoins.',
    'hero.featuresBtn': 'Découvrir les fonctionnalités',
    'challenges.title': 'Rangez les détails, concentrez-vous sur votre activité',
    'challenges.body1':
      'Entre les factures multiples, les créances en cours et les mouvements de stock, suivre les détails devient épuisant quand l\'information est dispersée entre carnets et fichiers.',
    'challenges.body2':
      'Mohasabi réunit les outils de gestion quotidienne dans un seul logiciel : vous retrouvez vos informations plus clairement et suivez vos opérations plus facilement.',
    'challenges.b1.title': 'Mieux organisé',
    'challenges.b1.desc': 'Réunissez factures, clients et produits au même endroit.',
    'challenges.b2.title': 'Suivi plus clair',
    'challenges.b2.desc': 'Consultez les créances et les mouvements de stock au lieu de compter sur la mémoire.',
    'challenges.b3.title': 'Sans connexion permanente',
    'challenges.b3.desc': 'Utilisez le logiciel en local même quand Internet est coupé.',
    'screenshots.closing': 'Des images du logiciel réel, pour découvrir l\'interface avant de le télécharger.',
    'screenshots.pending':
      "Aucune capture réelle de la version publiée n'a encore été ajoutée. En attendant, le mode d'emploi explique chaque étape.",
    'how.title': 'Débutez en trois étapes',
    'how.step1.title': 'Téléchargez le programme',
    'how.step1.desc': 'Téléchargez le fichier d\'installation Mohasabi pour Windows 10 ou 11 en 64 bits.',
    'how.step1.cta': 'Télécharger Mohasabi',
    'how.step2.title': 'Installez-le sur votre ordinateur',
    'how.step2.desc':
      'Lancez le fichier d\'installation et suivez les instructions à l\'écran. Consultez le guide d\'installation si besoin.',
    'how.step2.cta': 'Lire le guide d\'installation',
    'how.step3.title': 'Organisez votre activité',
    'how.step3.desc':
      'Après l\'installation et la configuration, ajoutez produits et clients, créez votre première facture et enregistrez vos opérations.',
    'how.step3.cta': 'Voir comment l\'utiliser',
    'offline.title': 'Votre activité ne s\'arrête pas avec Internet',
    'offline.body1':
      'Mohasabi est une application de bureau pensée pour un usage local sur Windows : l\'usage courant ne demande pas de connexion permanente.',
    'offline.body2':
      'Organisez vos données et gérez vos opérations depuis votre machine, en gardant à l\'esprit que le téléchargement, les mises à jour et le support demandent une connexion.',
    'offline.note': 'Gardez une sauvegarde récente de vos données, même si vous utilisez le logiciel hors connexion.',
    'security.title': 'Vos données professionnelles méritent des soins',
    'security.body':
      'Vos données comptables font partie de votre activité. Mohasabi les stocke localement et fournit sauvegarde et restauration selon les fonctions de la version.',
    'security.s1.title': 'Stockage local',
    'security.s1.desc': 'Les données de travail restent sur l\'ordinateur que vous utilisez, selon la configuration.',
    'security.s2.title': 'Sauvegarde automatique',
    'security.s2.desc':
      'Archives ZIP horodatées avec vérification SHA-256, rétention réglable, bouton « Sauvegarder maintenant » et ouverture du dossier.',
    'security.s3.title': 'Restauration contrôlée',
    'security.s3.desc':
      'Liste des sauvegardes (date, taille, statut), validation complète préalable, sauvegarde d\'urgence automatique et retour arrière.',
    'security.disclaimer':
      'Aucun système n\'est sûr à 100 %. Protégez votre ordinateur et vos mots de passe, gardez une sauvegarde séparée quand c\'est possible et vérifiez régulièrement la restauration.',
    'audience.title': 'Pensé pour les besoins du quotidien',
    'audience.merchants.title': 'Commerçants et gérants de magasin',
    'audience.merchants.desc': 'Suivez produits, ventes, factures et comptes clients.',
    'audience.craft.title': 'Artisans et prestataires',
    'audience.craft.desc': 'Organisez devis, factures et historique des clients.',
    'audience.small.title': 'Petites structures et startups',
    'audience.small.desc': 'Réunissez clients, produits et commandes dans un seul outil de bureau.',
    'audience.teams.title': 'Équipes et petits services',
    'audience.teams.desc': 'Utilisez le logiciel dans votre environnement local, selon votre organisation.',
    'preview.title': 'Choisissez la licence adaptée',
    'preview.subtitle': 'Sélectionnez le plan et la durée qui conviennent, et vérifiez le détail de chaque plan avant toute demande.',
    'preview.from': 'à partir de',
    'preview.ask': 'Demander',
    'preview.compare': 'Comparer les plans et les prix',
    'preview.note':
      'Prix en dinars algériens, donnés à titre indicatif. Contactez-nous pour confirmer le prix actuel, les détails du plan et la remise de la licence avant toute demande.',
    'preview.tag.standard': 'Pour l\'activité quotidienne et les besoins essentiels.',
    'preview.tag.pro': 'Pour une activité qui demande plus de capacités, selon les fonctions incluses dans le plan.',
    'preview.tag.enterprise': 'Pour les activités qui ont besoin du niveau le plus élevé des offres Mohasabi.',
    'faq.requirements.q': 'Quelles sont les conditions d\'exécution ?',
    'faq.requirements.a':
      'La version actuelle cible Windows 10 et Windows 11 en 64 bits. Consultez le guide pour connaître les exigences vérifiées en processeur, mémoire et disque avant l\'installation.',
    'faq.backup.q': 'Comment restaurer mes données ou utiliser une sauvegarde ?',
    'faq.backup.a':
      'Gardez une sauvegarde récente dans un endroit sûr et suivez les étapes du guide pour la version utilisée. Avant de restaurer une archive ancienne, vérifiez qu\'elle correspond aux bonnes données et à la version du logiciel.',
    'faq.free.q': 'Télécharger le programme signifie-t-il que tout est gratuit ?',
    'faq.free.a':
      'Télécharger le fichier d\'installation ne rend pas l\'usage ni tous les plans gratuits. Les conditions dépendent de la licence choisie ; contactez-nous pour confirmer les détails avant l\'achat.',
    'cta.pricingBtn': 'Voir les tarifs',
    'cta.supportLink': 'Besoin d\'aide ? Contactez le support',
    'footer.links.privacy': 'Politique de confidentialité',
    'footer.trademark': 'Windows est une marque de Microsoft. Mohasabi est un logiciel indépendant.',
    'privacy.title': 'Politique de confidentialité',
    'privacy.subtitle': 'Ce que ce site collecte, et où vivent réellement vos données professionnelles.',
    'privacy.local.title': 'Vos données restent sur votre machine',
    'privacy.local.body':
      'Mohasabi enregistre factures, clients et produits en local sur l\'ordinateur que vous utilisez, dans les fichiers du programme et le dossier de données choisi. Rien n\'est envoyé à un serveur ni à un tiers.',
    'privacy.site.title': 'Ce site ne vous suit pas',
    'privacy.site.body':
      'Les pages de présentation, tarifs, guide et support sont statiques : aucune analyse d\'audience, aucun cookie publicitaire, aucun traqueur. Nous ne demandons ni e-mail ni téléphone pour consulter le contenu. Les formulaires que vous envoyez vous-même sont décrits ci-dessous.',
    'privacy.contact.title': 'Quand vous nous contactez',
    'privacy.contact.body':
      'Les boutons WhatsApp et e-mail ouvrent un message sur votre appareil, prérempli avec le plan, la durée ou le type de demande choisi. Nous ne prenons connaissance que de ce que vous envoyez vous-même, pour répondre à votre question ou à votre demande de licence.',
    'privacy.forms.title': 'Formulaires d\'assistance et d\'avis',
    'privacy.forms.body':
      'Une demande d\'assistance nous transmet nom, e-mail, type de demande, version et message ; un avis nous transmet e-mail, nom affiché, note, titre et texte. Ces données sont stockées dans la base du site, accessibles uniquement à l\'administrateur, et l\'e-mail sert à éviter les doublons et à vous recontacter au sujet de la demande. Après validation, seuls le texte et le nom affiché sont publiés ; l\'e-mail n\'est jamais public. Aucune durée de suppression automatique n\'est définie à ce jour ; vous pouvez demander la suppression de vos données via le canal d\'assistance.',
    'privacy.backup.title': 'La sauvegarde vous revient',
    'privacy.backup.body':
      'Vos données sont conservées localement sur votre machine. Une perte peut venir d\'un disque défaillant, d\'un dossier supprimé ou d\'un ordinateur compromis : gardez une copie hors de l\'appareil et testez sa restauration.',
    'seo.ogTitle': 'Mohasabi — organisez votre activité depuis un seul endroit',
    'seo.ogDescription':
      'Découvrez Mohasabi et gérez factures, clients, fournisseurs et stock avec une application de bureau pour Windows.',
    'seo.page.privacy': 'Politique de confidentialité — Mohasabi',
    'footer.copyright': 'Tous droits réservés.',
    'footer.versionLabel': 'Version',
    'language.label': 'Langue de l\'interface',
    'contact.whatsapp': 'WhatsApp',
    'contact.email': 'E-mail',
    'seo.title': 'Mohasabi | Comptabilité et facturation pour Windows',
    'seo.description':
      'Organisez factures, devis, comptes clients, fournisseurs et stock avec Mohasabi, une application de bureau Windows en arabe, français et anglais, fonctionnant en local sans connexion permanente.',
    'a11y.mainNav': 'Navigation principale',
    'a11y.mobileNav': 'Navigation mobile',
    'a11y.toggleMenu': 'Ouvrir ou fermer le menu',
    'a11y.skipToContent': 'Aller au contenu principal',
    'nav.guide': "Mode d'emploi",
    'nav.pricing': 'Offres et licence',
    'nav.support': 'Assistance',
    'nav.features': 'Fonctionnalités',
    'nav.screenshots': "Captures d'écran",
    'nav.how': 'Comment ça marche',
    'a11y.logoAlt': 'Logo Mohasabi',
    'seo.page.home': 'Mohasabi | Comptabilité et facturation pour Windows',
    'seo.page.guide': "Mode d'emploi — Mohasabi",
    'seo.page.pricing': 'Offres et licence — Mohasabi',
    'seo.page.support': 'Assistance — Mohasabi',
    'footer.links.guide': "Mode d'emploi",
    'footer.links.pricing': 'Offres et licence',
    'footer.links.support': 'Assistance',
    'plan.standard.name': 'Standard',
    'plan.pro.name': 'Pro',
    'plan.enterprise.name': 'Enterprise',
    'duration.month': '1 mois',
    'duration.quarter': '3 mois',
    'duration.halfYear': '6 mois',
    'duration.year': '12 mois',
    'pricing.badge': 'Licences',
    'pricing.currency': 'DA',
    'pricing.title': 'Choisissez la licence adaptée à votre activité',
    'pricing.subtitle': "Les tarifs affichés sont indicatifs et peuvent évoluer selon les conditions commerciales convenues à la commande.",
    'pricing.recommended': 'Le plus choisi',
    'pricing.durationLabel': 'Durée',
    'pricing.priceLabel': 'Tarif',
    'pricing.planCol': 'Offre',
    'pricing.selectPlan': 'Demander cette licence',
    'pricing.askPlan': "Poser une question sur l'offre",
    'pricing.whatsappIntro': 'Bonjour, je souhaite demander une licence Mohasabi :',
    'pricing.inquiryIntro': 'Bonjour, j\'ai une question sur les licences Mohasabi :',
    'pricing.orEmail': 'ou écrivez-nous par e-mail',
    'pricing.contactTitle': 'Aucun paiement sur le site',
    'pricing.contactBody': "Le choix de l'offre et de la durée ouvre un message court vers WhatsApp ou l'e-mail, puis les détails se traitent directement.",
    'pricing.indicativeTitle': 'Tarifs indicatifs',
    'pricing.indicativeBody': "Ces montants sont donnés à titre de référence et peuvent changer selon l'offre commerciale au moment de la commande ; ils ne constituent pas un contrat.",
    'pricing.paymentTitle': 'Pas de paiement en ligne',
    'pricing.paymentBody': "Le site n'affiche aucune passerelle de paiement, ne collecte aucune donnée de carte et n'active aucune licence automatiquement depuis le navigateur.",
    'pricing.termsTitle': 'Conditions à la commande',
    'pricing.termsBody': "La durée de la licence, le nombre de postes et les conditions d'assistance sont définis lors de l'échange direct ; le site n'invente aucune condition.",
    'guide.badge': "Guide de démarrage",
    'guide.title': 'Commencer avec Mohasabi',
    'guide.subtitle': "Du téléchargement du fichier d'installation à votre première opération quotidienne, avec un déroulé fondé sur ce que le logiciel propose réellement.",
    'guide.videoTitle': 'Explication vidéo',
    'guide.videoPendingTitle': 'La vidéo est en préparation',
    'guide.videoPendingBody': "Aucune vidéo réelle n'a encore été publiée. Cet emplacement est réservé au format 16:9 ; aucun lien vidéo provisoire ni bouton de lecture inactif n'est affiché.",
    'guide.videoAria': "Emplacement réservé à la vidéo d'assistance, contenu non disponible",
    'guide.stepsTitle': 'Étapes de démarrage',
    'guide.step1.title': "Téléchargez le fichier d'installation",
    'guide.step1.desc': 'Récupérez Mohasabi_Setup_v1.0.3.exe depuis le canal officiel des versions sur GitHub.',
    'guide.step2.title': 'Installez sous Windows',
    'guide.step2.desc': "Lancez le programme d'installation et suivez les étapes sur un PC sous Windows 10 ou Windows 11 64 bits.",
    'guide.step3.title': 'Lancez Mohasabi',
    'guide.step3.desc': "Ouvrez le logiciel depuis le raccourci du bureau ou le menu des programmes une fois l'installation terminée.",
    'guide.stepNote': "Vérifiez le numéro de version et le nom du fichier affichés ci-dessous avant de continuer.",
    'guide.functionsTitle': 'Fonctions principales disponibles',
    'guide.functionsIntro': "Les écrans principaux accessibles après l'installation.",
    'guide.helpTitle': 'Blocage à l\'installation ou à la licence ?',
    'guide.helpBody': "Ouvrez la page d'assistance pour choisir le type de demande et rédiger un message court via WhatsApp ou e-mail.",
    'guide.supportCta': "Assistance",
    'guide.pricingCta': 'Offres et licence',
    'support.badge': 'Assistance',
    'support.title': 'Nous sommes là pour vous aider',
    'support.subtitle': "Choisissez le canal adapté et précisez le type de demande pour que le message soit clair dès le départ.",
    'support.whatsappTitle': 'WhatsApp',
    'support.whatsappBody': "Le plus rapide pour l'installation, la licence ou l'utilisation quotidienne.",
    'support.emailTitle': 'E-mail',
    'support.emailBody': "Adapté aux demandes détaillées ou contenant une description écrite du problème.",
    'support.issuesTitle': "Signaler un dysfonctionnement",
    'support.issuesBody': "Si le problème est reproductible, une Issue peut être ouverte sur le dépôt officiel avec les étapes et la version concernées.",
    'support.requestTitle': "Précisez votre demande",
    'support.requestBody': "Chaque carte ouvre un message WhatsApp court indiquant seulement le type de demande, sans donnée personnelle ni financière.",
    'support.reqIntro': "Bonjour, je vous contacte pour :",
    'support.req.install': "Installation ou lancement du logiciel",
    'support.req.activation': "Demande d'activation de licence",
    'support.req.duration': "Question sur la durée de licence",
    'support.req.renewal': "Question sur le renouvellement",
    'support.req.purchase': "Achat d'une licence",
    'support.req.other': "Demande générale",
    'support.infoTitle': "Informations utiles pour comprendre le problème",
    'support.info1': "Version utilisée : Mohasabi v1.0.3 ou celle affichée dans le logiciel.",
    'support.info2': "Système : Windows 10 ou 11 et l'architecture du poste.",
    'support.info3': 'Les étapes précises qui reproduisent le problème.',
    'support.info4': "Le texte exact du message d'erreur, ou une capture de celui-ci.",
    'support.info5': "Le moment où le problème est apparu (mise à jour, changement matériel, etc.).",
    'support.avoidTitle': 'Ne transmettez pas ces éléments',
    'support.avoid1': "Mots de passe, clés d'activation ou fichiers de licence.",
    'support.avoid2': "Base de données clients, factures réelles ou tout fichier contenant des données personnelles.",
    'support.avoid3': "Informations financières sensibles ou données de carte bancaire.",
    'support.faq1.q': 'Comment signaler un problème reproductible ?',
    'support.faq1.a': "Indiquez la version du logiciel, les étapes de reproduction et le message affiché ; une Issue sur le dépôt officiel est possible.",
    'support.faq2.q': "Existe-t-il une version d'essai avant l'achat ?",
    'support.faq2.a': "Le site ne propose aucune version d'essai automatique. Cette possibilité se discute directement lors du contact, selon l'accord.",
  },
  en: {
    'footer.links.whatsNew': 'What’s new',
    'footer.links.reviews': 'User reviews',
    'footer.links.terms': 'Terms & conditions',
    'nav.whatsNew': 'What’s new',
    'nav.reviews': 'Reviews',
    'nav.terms': 'Terms',
    'settings.ariaLabel': 'Settings',
    'settings.languageTitle': 'Language',
    'seo.page.features': 'Features — Mohasabi',
    'seo.page.whatsNew': 'What’s new — Mohasabi',
    'seo.page.reviews': 'User reviews — Mohasabi',
    'seo.page.terms': 'Terms & conditions — Mohasabi',
    'seo.desc.home':
      'Mohasabi is a Windows accounting and invoicing desktop app for invoices, quotes, customers, suppliers and stock, working locally in three languages.',
    'seo.desc.features':
      'See what Mohasabi actually ships: documents, customers and suppliers, inventory, reports and three interface languages.',
    'seo.desc.guide':
      'Download Mohasabi v1.0.3, verify the file, install it on Windows and understand the SmartScreen warning and SHA-256 check.',
    'seo.desc.pricing':
      'Mohasabi licence prices in Algerian dinars: Standard, Pro and Enterprise for 1, 3, 6 or 12 months, ordered via WhatsApp or email.',
    'seo.desc.support':
      'Contact Mohasabi support by WhatsApp or email and describe your issue without sending passwords or customer data.',
    'seo.desc.reviews':
      'Published Mohasabi user reviews after moderation, plus a form to share your experience without exposing your email.',
    'seo.desc.whatsNew':
      'Published Mohasabi releases on GitHub Releases, with release notes, file size and SHA-256 checksum.',
    'seo.desc.privacy':
      'Mohasabi website privacy policy: data sent through support and review forms, where it is stored, and how to request deletion.',
    'seo.desc.terms':
      'Terms for using the Mohasabi website and software licences: scope, updates, ownership and liability.',
    'notFound.title': 'Page not found — Mohasabi',
    'notFound.body':
      'The link you followed does not exist or has changed. Return to the home page or contact support.',
    'notFound.home': 'Back to home',
    'notFound.support': 'Support',
    'common.loading': 'Loading…',
    'featuresPage.badge': 'Features',
    'featuresPage.title': 'What the published release actually does',
    'featuresPage.subtitle': 'Everything below ships in the published Windows build — no beta features, no unkept promises.',
    'feat.group.documents': 'Documents and sales',
    'feat.group.people': 'Parties and receivables',
    'feat.group.inventory': 'Products and inventory',
    'feat.group.trust': 'Trust and continuity',
    'feat.benefitLabel': 'Why it matters:',
    'feat.documents.benefit': 'Documents come out ready to send or archive instead of being retyped elsewhere.',
    'feat.reports.benefit': 'See your sales and what you are owed at month end without manual spreadsheets.',
    'feat.import.title': 'CSV import',
    'feat.import.desc': 'Load clients and products in one pass through a CSV file, with a template shown according to licence state.',
    'feat.import.benefit': 'Start with the data you already have rather than re-entering it line by line.',
    'feat.partners.benefit': 'One record per customer or supplier, tied to their invoices and balances.',
    'feat.debts.benefit': 'Know who owes you and chase it before balances pile up.',
    'feat.stock.benefit': 'Avoid selling what you no longer have — quantities follow the store.',
    'feat.localData.benefit': 'No forced cloud subscription and no data sent to a third party.',
    'feat.licence.title': 'Device-bound licence',
    'feat.licence.desc': 'Since 1.0.3 the app shows a hardware id (CPU, motherboard, BIOS) that binds the licence to your machine, with encrypted restore after an update.',
    'feat.licence.benefit': 'One licence per machine, and updates that do not lose your activation.',
    'feat.offline.title': 'Offline operation',
    'feat.offline.desc': 'Invoicing and tracking run locally; the network is only needed for download, activation and updates.',
    'feat.offline.benefit': 'Keep working when the network drops or on a site without internet.',
    'feat.languages.benefit': 'A complete Arabic interface with RTL, plus French and English for your team and clients.',
    'feat.theme.title': 'Dark theme',
    'feat.theme.desc': 'The published release ships a reworked dark theme alongside the light one.',
    'feat.theme.benefit': 'Easier on the eyes during long evening sessions.',
    'featuresPage.ctaTitle': 'Ready to try it for real?',
    'featuresPage.ctaBody': 'Start with the install guide, then pick the licence that fits your business.',
    'featuresPage.guideCta': 'Install guide',
    'featuresPage.pricingCta': 'Licence plans',
    'featuresPage.updatesCta': 'Read the latest updates',
    'whatsNew.badge': 'What’s new',
    'whatsNew.title': 'Releases that are actually published',
    'whatsNew.subtitle': 'Real dates, official download links and published SHA-256 fingerprints, taken from the official releases channel.',
    'whatsNew.publishedBadge': 'Published',
    'whatsNew.sizeLabel': 'File size',
    'whatsNew.assetLabel': 'Installer file',
    'whatsNew.downloadBtn': 'Download',
    'whatsNew.detailsBtn': 'Release details',
    'whatsNew.latestNote': 'The newest published release is {version}.',
    'whatsNew.sourceTitle': 'Where this comes from',
    'whatsNew.sourceBody': 'Versions, dates and fingerprints come from the version.json published with each release in the official repository, not from marketing copy.',
    'whatsNew.releasesLink': 'Official releases page',
    'whatsNew.roadmapTitle': 'Planned updates',
    'whatsNew.roadmapBody': 'No roadmap has been announced, so this page lists nothing that has not already shipped.',
    'whatsNew.autoUpdateTitle': 'In-app updates',
    'whatsNew.autoUpdateBody': 'Mohasabi checks the releases channel, offers the update and verifies the SHA-256 fingerprint before running it.',
    'whatsNew.guideLink': 'Update step by step',
    'whatsNew.groupAdded': 'New',
    'whatsNew.groupFixed': 'Fixes',
    'whatsNew.groupImproved': 'Improvements',
    'whatsNew.cautionTitle': 'Heads up',
    'whatsNew.notFoundTitle': 'Release not found',
    'whatsNew.notFoundBody': 'This version is not in the list of published releases.',
    'whatsNew.backToList': 'Back to updates',
    'whatsNew.downloadTitle': 'Installer',
    'whatsNew.shaTitle': 'SHA-256 fingerprint',
    'whatsNew.shaCopy': 'Copy fingerprint',
    'whatsNew.shaCopied': 'Copied',
    'whatsNew.shaHint': 'Compare the fingerprint with the downloaded file before running it; the method depends on your tooling and Windows.',
    'guide.step.req.title': 'Check the system requirements',
    'guide.step.req.desc': 'Mohasabi runs on 64-bit Windows 10/11 with at least 4 GB of RAM and 500 MB of disk space.',
    'guide.step.fileCheck.title': 'Verify the file name and source',
    'guide.step.fileCheck.desc': 'The file must come from the official releases channel and carry the announced version name exactly; never run a copy from elsewhere.',
    'guide.step.shaCheck.title': 'Verify the SHA-256 fingerprint',
    'guide.step.shaCheck.desc': 'Compare the downloaded file’s fingerprint with the one published on the updates page; any difference means the file is not the original.',
    'guide.step.setupFinish.title': 'Finish the installation',
    'guide.step.setupFinish.desc': 'Follow the wizard to the end and let the app create its shortcut; do not cancel during file copy.',
    'guide.step.activation.title': 'Activate the licence',
    'guide.step.activation.desc': 'Open the licence screen, copy the hardware id and send it through the official support channel to receive your licence.',
    'guide.step.firstInvoice.title': 'Create your first invoice',
    'guide.step.firstInvoice.desc': 'From documents, add an invoice, pick or create the client, add the lines and check the total before saving.',
    'guide.step.partners.title': 'Add customers and suppliers',
    'guide.step.partners.desc': 'Record each party with contact details and balances, with duplicate name and email prevention.',
    'guide.step.stock.title': 'Organise products and stock',
    'guide.step.stock.desc': 'Create products with prices and quantities, or import them at once from a CSV.',
    'guide.step.backup.title': 'Back up your data',
    'guide.step.backup.desc': 'Data stays on your machine, so take regular backups and keep them off-device.',
    'guide.step.troubleshooting.title': 'Solve common problems',
    'guide.step.troubleshooting.desc': 'If a warning appears or launch fails, re-check the name and fingerprint, reinstall and confirm free disk space.',
    'guide.step.contact.title': 'Contact support',
    'guide.step.contact.desc': 'Reach out on WhatsApp or email, quoting the version and hardware id when relevant.',
    'guide.smart.title': 'Windows SmartScreen appeared during installation?',
    'guide.smart.body': 'Windows shows this warning when an app is not yet recognised by its reputation service or is not signed by a trusted certificate — it does not automatically mean the file is dangerous.',
    'guide.smart.checkTitle': 'Before doing anything, verify',
    'guide.smart.check1': 'the file came from this site or the official releases channel on GitHub.',
    'guide.smart.check2': 'the file name matches the published version name exactly.',
    'guide.smart.check3': 'the SHA-256 fingerprint matches the published one; if not, do not run the file and delete it.',
    'guide.smart.stepsTitle': 'If you confirmed the source',
    'guide.smart.steps': 'In the warning dialog choose More info, after which Run anyway may appear. These labels and options vary with the Windows edition and your organisation’s policies.',
    'guide.smart.warn': 'We never ask you to disable Windows Defender or SmartScreen system-wide, and a warning is not automatically safe.',
    'guide.smart.hashLink': 'The published fingerprint for this version',
    'guide.smart.releasesCta': 'Official releases page',
    'guide.smart.recentBuild': 'The warning may not appear on another machine: it depends on the file’s Windows reputation and download volume.',
    'reviews.badge': 'User reviews',
    'reviews.title': 'Real experiences with Mohasabi',
    'reviews.subtitle': 'This page shows only reviews approved by the Mohasabi team — no automated ratings, no test content.',
    'reviews.listTitle': 'Published reviews',
    'reviews.serviceDown': 'The review service is unavailable right now, so published reviews cannot be listed and new ones are not being accepted.',
    'reviews.emptyTitle': 'No reviews published yet',
    'reviews.emptyBody': 'No review has been approved yet. Share your actual experience once you have used the software.',
    'reviews.starsAria': 'Rated {rating} out of 5',
    'reviews.formTitle': 'Share your review',
    'reviews.formSubtitle': 'Write about your real experience. The review goes to moderation and is not public until approved.',
    'reviews.rule1.label': 'Human moderation.',
    'reviews.rule1.body': 'Every review stays unpublished until the administrator approves it.',
    'reviews.rule2.label': 'Email stays private.',
    'reviews.rule2.body': 'Your email is used only to prevent duplicates and to contact you about the review; it is never published.',
    'reviews.rule3.label': 'Real usage.',
    'reviews.rule3.body': 'Promotional, duplicate or unverifiable reviews are rejected.',
    'reviews.privacyLink': 'How we handle your data?',
    'reviews.emailLabel': 'Your email',
    'reviews.emailHint': 'Used to prevent duplicates and to contact you about the review; never displayed.',
    'reviews.nameLabel': 'Display name (optional)',
    'reviews.namePlaceholder': 'Your name or business',
    'reviews.nameHint': 'Visitors see this; leave it empty to show “Mohasabi”.',
    'reviews.ratingLabel': 'Rating',
    'reviews.starOption': '{value} out of 5',
    'reviews.titleLabel': 'Short title',
    'reviews.bodyLabel': 'Your experience in detail',
    'reviews.bodyHint': 'At least 15 characters ({count} so far).',
    'reviews.consent': 'I agree that my text and display name may be published after review and approval by the Mohasabi team.',
    'reviews.submit': 'Send review',
    'reviews.sending': 'Sending…',
    'reviews.queued': 'Your review was received and is pending moderation; it will not appear before approval.',
    'reviews.unavailable': 'The review service could not be reached from this device, so your review was not sent.',
    'reviews.whatsappFallback': 'Send your review on WhatsApp',
    'reviews.whatsappIntro': 'I would like to share my Mohasabi review:',
    'reviews.duplicate': 'A similar review has already been submitted from this address.',
    'reviews.rateLimited': 'Too many requests right now; please try again shortly.',
    'reviews.rejected': 'The review was not accepted; check the fields and try again.',
    'reviews.contactInstead': 'Or contact us directly',
    'reviews.error.email': 'Invalid email address.',
    'reviews.error.rating': 'Choose a rating from 1 to 5.',
    'reviews.error.title': 'Title is too short (3 characters minimum).',
    'reviews.error.body': 'Text is too short (15 characters minimum).',
    'reviews.error.bodyLong': 'Text is too long (1200 characters maximum).',
    'reviews.error.consent': 'Approval for publication after review is required.',
    'terms.badge': 'Terms & conditions',
    'terms.title': 'Terms for using this site and the software',
    'terms.subtitle': 'A plain statement of what the user and the publisher each commit to.',
    'terms.updatedLabel': 'Last updated',
    'terms.updatedValue': '24 October 2026',
    'terms.contentsTitle': 'Contents',
    'terms.contentsAria': 'Terms table of contents',
    'terms.privacyNote': 'For your personal data, see',
    'terms.acceptance.title': 'Acceptance',
    'terms.acceptance.body': 'Using this site or downloading Mohasabi means you accept these terms. Otherwise stop using the site and do not install the software.',
    'terms.licence.title': 'Scope of the licence',
    'terms.licence.body': 'A licence covers one machine for the chosen plan and duration and is bound to the device’s hardware id. Licences already issued remain valid. It does not include resale, redistribution or modification of the software.',
    'terms.warranty.title': 'Software as is',
    'terms.warranty.body': 'The publisher works to ship a stable build, but the software is provided as is, without an absolute warranty of being error-free or suited to every use. Verifying your data and figures remains yours.',
    'terms.data.title': 'Data and backups',
    'terms.data.body': 'Your data is stored on your own machine; we do not request access to it and run no server holding it. Regular backups and device protection are your responsibility.',
    'terms.pricing.title': 'Pricing and orders',
    'terms.pricing.body': 'Prices are shown in Algerian dinar, are indicative and may change without notice. This site takes no online payment; orders and activations go through the official support channels listed here.',
    'terms.updates.title': 'Updates',
    'terms.updates.body': 'Updates are published in the official releases repository; the app downloads them from that source, verifies the SHA-256 fingerprint before running them, and applies deferred updates when it closes.',
    'terms.property.title': 'Intellectual property',
    'terms.property.body': 'The Mohasabi name, logo and this site’s content belong to the publisher and may not be reused without permission. Other marks mentioned belong to their owners.',
    'terms.liability.title': 'Limitation of liability',
    'terms.liability.body': 'To the extent allowed by applicable law, the publisher is not liable for indirect damage or for data loss caused by missing backups.',
    'terms.changes.title': 'Changes to these terms',
    'terms.changes.body': 'These terms may change; the version published on this page at the stated date applies, and reviewing it before each licence request is advised.',
    'terms.contact.title': 'Questions about these terms',
    'terms.contact.body': 'For any question about the licence or these terms, use one of the official support channels.',
    'support.form.title': 'Send a support request',
    'support.form.subtitle': 'Fill this in and your request lands in the support queue. If sending fails, use WhatsApp or email.',
    'support.form.name': 'Name',
    'support.form.email': 'Email',
    'support.form.topic': 'Issue type',
    'support.form.version': 'Version number (optional)',
    'support.form.message': 'Describe the issue',
    'support.form.submit': 'Send request',
    'support.form.sending': 'Sending…',
    'support.form.queued': 'Your request was received and support will reply by email.',
    'support.form.errorName': 'Name is too short.',
    'support.form.errorEmail': 'Invalid email address.',
    'support.form.errorMessage': 'Please describe it in at least 20 characters.',
    'support.form.unavailable': 'The message service could not be reached, so your request was not sent. Use WhatsApp or email.',
    'support.form.rateLimited': 'Too many requests; try again shortly.',
    'support.form.rejected': 'The request was rejected; check the details and try again.',
    'admin.title': 'Mohasabi admin',
    'admin.checking': 'Checking your session…',
    'admin.notDeployedTitle': 'The admin service is not deployed on this host',
    'admin.notDeployedBody': 'The panel requires authentication and permissions enforced on the server. Until that service is deployed, content management stays closed and nothing can be changed here.',
    'admin.navAria': 'Admin navigation',
    'admin.nav.dashboard': 'Dashboard',
    'admin.nav.reviews': 'Review moderation',
    'admin.nav.pricing': 'Pricing and plans',
    'admin.nav.messages': 'Support messages',
    'admin.nav.activity': 'Change log',
    'admin.signOut': 'Sign out',
    'admin.loginTitle': 'Administrator sign in',
    'admin.loginBody': 'This panel is private and needs server authentication. Hiding its address is not enough, and the password is never stored in the front-end code.',
    'admin.passwordLabel': 'Password',
    'admin.signIn': 'Sign in',
    'admin.badCredentials': 'Those credentials are not correct.',
    'admin.rateLimited': 'Too many attempts; wait a moment before retrying.',
    'admin.backendMissing': 'The admin service is not connected to this environment; redeploy the server and try again.',
    'admin.loading': 'Loading…',
    'admin.stats.pendingReviews': 'Reviews awaiting review',
    'admin.stats.approvedReviews': 'Published reviews',
    'admin.stats.unreadMessages': 'Unread messages',
    'admin.stats.pricingUpdated': 'Pricing last updated',
    'admin.dashboardNote': 'Every figure comes from the site database, and publications are recorded in the change log.',
    'admin.filter.pending': 'Pending',
    'admin.filter.approved': 'Approved',
    'admin.filter.rejected': 'Rejected',
    'admin.noReviews': 'Nothing in this state right now.',
    'admin.approve': 'Approve',
    'admin.reject': 'Reject',
    'admin.pricingNote': 'Saving here updates the offers page, and the change is logged with its reason.',
    'admin.pricingCaption': 'Licence pricing table',
    'admin.col.plan': 'Plan',
    'admin.pricingReason': 'Reason for the change (shown in the log)',
    'admin.pricingSaved': 'Prices saved and the change recorded.',
    'admin.pricingInvalid': 'Invalid value: prices must be non-negative integers.',
    'admin.saveFailed': 'The change was not saved. Try again.',
    'admin.save': 'Save',
    'admin.noMessages': 'No messages.',
    'admin.read': 'Read',
    'admin.unread': 'Unread',
    'admin.markRead': 'Mark as read',
    'admin.noActivity': 'No changes recorded yet.',
    'nav.home': 'Home',
    'nav.download': 'Download Mohasabi',
    'hero.title': 'Clearer business. Simpler books.',
    'hero.subtitle':
      'Create invoices, quotes and commercial documents, and keep customers, stock and receivables in one place. Mohasabi organises your daily work on your own computer and keeps running without a permanent internet connection.',
    'hero.downloadBtn': 'Download the app',
    'hero.downloadPendingBtn': 'Download being prepared',
    'hero.version': 'Version',
    'hero.windowsOnly': 'for Windows',
    'hero.pendingNote':
      'The setup file for this release is being uploaded to the official release channel.',
    'hero.releasesLink': 'Releases page',
    'hero.illustrationAlt': 'Illustration of the software interface, not an actual screenshot',
    'hero.illustrationCaption': 'One screen for invoices, customers and stock.',
    'features.badge': 'Features',
    'features.title': 'Everything a working day needs',
    'features.subtitle': 'The capabilities actually available in the current release.',
    'features.localData.title': 'Local data and backup',
    'features.localData.desc':
      'Your business data stays on your machine, with timestamped ZIP archives, SHA-256 verification and a restore that copies your current data first.',
    'features.documents.title': 'Invoices and quotes',
    'features.documents.desc':
      'Create invoices, quotations, purchase orders, delivery notes and mission orders, and keep every commercial document together.',
    'features.partners.title': 'Customers and suppliers',
    'features.partners.desc':
      'Keep customer records with balances and open orders, and follow supplier purchase orders and receptions.',
    'features.debts.title': 'Debts and receivables',
    'features.debts.desc':
      'Check each customer balance and the unpaid report to separate what has been collected from what is still due.',
    'features.stock.title': 'Inventory and products',
    'features.stock.desc':
      'Organise the product and service catalogue with quantities, reorder points and a dashboard view of low-stock items.',
    'features.reports.title': 'Reports and exports',
    'features.reports.desc':
      'Dashboard, monthly reports, VAT declaration by rate and best customers, with PDF, Excel, Word and CSV export.',
    'features.languages.title': 'Arabic, French and English interface',
    'features.languages.desc':
      'Switch between the three languages with RTL or LTR layout and a light, dark or system theme.',
    'screenshots.badge': 'Screenshots',
    'screenshots.title': 'See Mohasabi as it is',
    'screenshots.subtitle': 'Explore the real interface and how your daily information is presented.',
    'screenshots.pendingTitle': 'Screenshots not available yet',
    'screenshots.pendingSubtitle': 'This site does not show images of an interface that does not exist.',
    'screenshots.zoomHint': 'Click any screenshot to enlarge it • Keyboard navigation available',
    'screenshots.closeAria': 'Close viewer',
    'screenshots.prevAria': 'Previous screenshot',
    'screenshots.nextAria': 'Next screenshot',
    'screenshots.alt.main': 'Mohasabi interface for managing invoices and business',
    'screenshots.alt.dashboard': 'Dashboard',
    'screenshots.alt.invoices': 'Invoices and quotes',
    'screenshots.alt.clients': 'Customers and suppliers',
    'screenshots.alt.products': 'Products and stock',
    'requirements.badge': 'Requirements',
    'requirements.title': 'Mohasabi system requirements',
    'requirements.colComponent': 'Component',
    'requirements.colSpec': 'Specification',
    'requirements.colStatus': 'Status',
    'requirements.statusSupported': 'Supported',
    'requirements.statusRecommended': 'Recommended',
    'requirements.statusMinimum': 'Minimum',
    'requirements.statusConditional': 'Conditional',
    'requirements.notesTitle': 'Important notes',
    'requirements.note1': 'The values above apply to the release shown on this page.',
    'requirements.note2': 'The application works offline after the initial activation.',
    'requirements.note3': 'Internet is required for download, activation and updates.',
    'requirements.note4': 'Check the releases page for detailed release notes.',
    'requirements.viewReleases': 'View release details on GitHub',
    'requirements.os': 'Operating system',
    'requirements.architecture': 'Architecture',
    'requirements.processor': 'Processor',
    'requirements.ram': 'Memory (RAM)',
    'requirements.diskSpace': 'Disk space',
    'requirements.internet': 'Internet connection',
    'requirements.internet.desc':
      'Required for download, activation and updates; daily work runs offline',
    'faq.badge': 'FAQ',
    'faq.title': 'Questions before you download',
    'faq.intro':
      'Answers about offline use, security, requirements, backups, licensing and support.',
    'faq.offline.q': 'Does Mohasabi work without internet?',
    'faq.offline.a': 'Yes for daily use. A connection is only needed to download, activate and update.',
    'faq.latest.q': 'How do I get the latest release?',
    'faq.latest.a':
      'Use the download button to get the setup file from the official GitHub Releases channel, or open the releases page if the direct download fails.',
    'faq.data.q': 'Is my data stored on a cloud server?',
    'faq.data.a':
      'Mohasabi stores data locally on your device. There is no cloud sync and no automatic external backup.',
    'faq.support.q': 'How do I get help?',
    'faq.support.a':
      'Reach us on WhatsApp or the e-mail address listed on the support page for installation, plans or everyday use, giving the version and a description of the problem without sending sensitive accounting data.',
    'faq.moreHelp': 'Need more help?',
    'faq.openTicket': 'Open a ticket on GitHub',
    'cta.title': 'Start organising your work with Mohasabi',
    'cta.subtitle': 'Download the app, see how it works, then pick the licence that fits your needs.',
    'cta.downloadBtn': 'Download Mohasabi now',
    'cta.note': 'See the full system requirements in the how-to-start guide.',
    'footer.description': 'A desktop app for Windows that handles invoices, customers, suppliers and stock locally.',
    'footer.links.home': 'Home',
    'footer.links.features': 'Features',
    'footer.links.requirements': 'System Requirements',
    'footer.links.faq': 'FAQ',
    'footer.links.releases': 'Official Releases',
    'footer.links.repository': 'Official Repository',
    'footer.pagesTitle': 'Pages',
    'footer.sectionsTitle': 'Sections',
    'footer.resourcesTitle': 'Official links',
    'hero.tagline': 'Accounting and business management software for Windows',
    'hero.specLine': 'Windows 10 and Windows 11 · 64-bit',
    'hero.footnote': 'A desktop app with local data and licence options that match your needs.',
    'hero.featuresBtn': 'Explore the features',
    'challenges.title': 'Put the details in order and focus on your business',
    'challenges.body1':
      'Between multiple invoices, outstanding debts and stock movements, keeping track gets exhausting when information is spread across notebooks and separate files.',
    'challenges.body2':
      'Mohasabi brings your daily business tools into one program, so you find information more clearly and follow operations with less effort.',
    'challenges.b1.title': 'Better organised',
    'challenges.b1.desc': 'Keep invoices, customers and products in one place.',
    'challenges.b2.title': 'Clearer tracking',
    'challenges.b2.desc': 'Review what is owed and how stock moves instead of relying on memory.',
    'challenges.b3.title': 'Work without staying online',
    'challenges.b3.desc': 'Use the app locally even when the connection drops.',
    'screenshots.closing': 'Images from the real program, so you know the interface before downloading it.',
    'screenshots.pending':
      'No real screenshots from the published release have been added yet. Meanwhile, the how-to guide walks through each step.',
    'how.title': 'Start in three steps',
    'how.step1.title': 'Download the app',
    'how.step1.desc': 'Download the Mohasabi setup file for 64-bit Windows 10 or Windows 11.',
    'how.step1.cta': 'Download Mohasabi',
    'how.step2.title': 'Install it on your computer',
    'how.step2.desc': 'Run the setup file and follow the on-screen instructions. Use the install guide if you need help.',
    'how.step3.title': 'Start organising your work',
    'how.step3.desc':
      'After installation and setup, add products and customers, create your first invoice and record your transactions.',
    'how.step3.cta': 'See how to use it',
    'how.step2.cta': 'Read the install guide',
    'offline.title': 'Your business does not stop when the internet does',
    'offline.body1':
      'Mohasabi is a desktop app designed to work locally on a Windows machine, so normal local use does not require a permanent connection.',
    'offline.body2':
      'Organise your data and run your operations from your own device, keeping in mind that downloading the app, update files and contacting support need a connection.',
    'offline.note': 'Keep a recent backup of your data even if you use the app offline.',
    'security.title': 'Your business data deserves care',
    'security.body':
      'Your accounting data is part of your business. Mohasabi stores it locally and provides backup and restore, within the features of the release.',
    'security.s1.title': 'Local storage',
    'security.s1.desc': 'Business data stays on the computer you use, according to the app settings.',
    'security.s2.title': 'Automatic backup',
    'security.s2.desc':
      'Timestamped ZIP archives with SHA-256 verification, configurable retention, a back-up-now button and quick access to the folder.',
    'security.s3.title': 'Controlled restore',
    'security.s3.desc':
      'Backup list with date, size and status, full validation first, an automatic emergency copy of current data and a way back.',
    'security.disclaimer':
      'No system can be called 100 % secure. Protect your computer and passwords, keep a backup separate from the device when possible, and test that it restores.',
    'audience.title': 'Built for everyday business needs',
    'audience.merchants.title': 'Traders and shop owners',
    'audience.merchants.desc': 'Track products, sales, invoices and customer accounts.',
    'audience.craft.title': 'Craftspeople and service providers',
    'audience.craft.desc': 'Organise quotations, invoices and client transaction history.',
    'audience.small.title': 'Small and growing businesses',
    'audience.small.desc': 'Bring customers, products and orders together in one desktop tool.',
    'audience.teams.title': 'Small teams and departments',
    'audience.teams.desc': 'Run the app in the local environment that fits your organisation and settings.',
    'preview.title': 'Choose the licence that fits your business',
    'preview.subtitle': 'Pick the plan and duration you need, and check what each plan includes before requesting it.',
    'preview.from': 'from',
    'preview.ask': 'Ask about',
    'preview.compare': 'Compare plans and prices',
    'preview.note':
      'Prices are in Algerian dinars and indicative. Contact us to confirm the current price, plan details and how the licence is delivered before ordering.',
    'preview.tag.standard': 'For daily work and the essentials.',
    'preview.tag.pro': 'For businesses needing wider capability, as included in the plan.',
    'preview.tag.enterprise': 'For activities that need the highest Mohasabi plan.',
    'faq.requirements.q': 'What does the app require to run?',
    'faq.requirements.a':
      'The current release targets 64-bit Windows 10 and Windows 11. Read the guide for the verified processor, memory and disk requirements before installing.',
    'faq.backup.q': 'How do I restore data or use a backup?',
    'faq.backup.a':
      'Keep a recent backup somewhere safe and follow the backup and restore steps in the guide for your version. Before restoring an older archive, confirm it belongs to the right data and matches the app version.',
    'faq.free.q': 'Does downloading mean every feature is free?',
    'faq.free.a':
      'Downloading the setup file does not mean the app or every plan is free. Terms depend on the licence you choose; contact us to confirm the details before buying.',
    'cta.pricingBtn': 'See the plans',
    'cta.supportLink': 'Need help? Contact support',
    'footer.links.privacy': 'Privacy policy',
    'footer.trademark': 'Windows is a trademark of Microsoft. Mohasabi is an independent program.',
    'privacy.title': 'Privacy policy',
    'privacy.subtitle': 'What this website collects, and where your business data actually lives.',
    'privacy.local.title': 'Your business data stays on your machine',
    'privacy.local.body':
      'Mohasabi writes invoices, customers and products locally on the computer you use, inside the program files and the data folder you choose. Nothing is uploaded to a server or shared with a third party.',
    'privacy.site.title': 'This site does not track you',
    'privacy.site.body':
      'The marketing, pricing, guide and support pages are static: no analytics, no advertising cookies, no trackers. We never ask for your e-mail or phone number to show the content. Forms you submit yourself are described below.',
    'privacy.contact.title': 'When you contact us',
    'privacy.contact.body':
      'The WhatsApp and e-mail buttons open a message on your device, pre-filled with the plan, duration or request type you picked. We only see what you choose to send, and use it to answer your question or licence request.',
    'privacy.forms.title': 'Support and review forms',
    'privacy.forms.body':
      'A support request gives us your name, e-mail, request type, version and message; a review gives us your e-mail, display name, rating, title and text. This data is stored in the site database and readable only by the administrator; the e-mail is used to prevent duplicates and to contact you about the request. After approval only the review text and display name are published; the e-mail is never public. No automatic deletion period is set today; you can ask for your data to be deleted through the support channel.',
    'privacy.backup.title': 'Backups remain your responsibility',
    'privacy.backup.body':
      'Your data is stored locally on your machine. Loss can follow a failed disk, a deleted folder or a compromised computer, so keep a copy outside the device and check that it restores.',
    'seo.ogTitle': 'Mohasabi — run your business from one place',
    'seo.ogDescription':
      'Meet Mohasabi and manage invoices, customers, suppliers and stock with a desktop app for Windows.',
    'seo.page.privacy': 'Privacy policy — Mohasabi',
    'footer.copyright': 'All rights reserved.',
    'footer.versionLabel': 'Version',
    'language.label': 'Interface language',
    'contact.whatsapp': 'WhatsApp',
    'contact.email': 'Email',
    'seo.title': 'Mohasabi | Accounting and invoicing software for Windows',
    'seo.description':
      'Manage invoices, quotes, customer and supplier accounts and stock with Mohasabi, a Windows desktop app in Arabic, French and English that works locally without a permanent internet connection.',
    'a11y.mainNav': 'Main navigation',
    'a11y.mobileNav': 'Mobile navigation',
    'a11y.toggleMenu': 'Open or close the menu',
    'a11y.skipToContent': 'Skip to main content',
    'nav.guide': 'How to start',
    'nav.pricing': 'Plans & licence',
    'nav.support': 'Support',
    'nav.features': 'Features',
    'nav.screenshots': 'Screenshots',
    'nav.how': 'How it works',
    'a11y.logoAlt': 'Mohasabi logo',
    'seo.page.home': 'Mohasabi | Accounting and invoicing software for Windows',
    'seo.page.guide': 'How to start — Mohasabi',
    'seo.page.pricing': 'Plans & licence — Mohasabi',
    'seo.page.support': 'Support — Mohasabi',
    'footer.links.guide': 'How to start',
    'footer.links.pricing': 'Plans & licence',
    'footer.links.support': 'Support',
    'plan.standard.name': 'Standard',
    'plan.pro.name': 'Pro',
    'plan.enterprise.name': 'Enterprise',
    'duration.month': '1 month',
    'duration.quarter': '3 months',
    'duration.halfYear': '6 months',
    'duration.year': '12 months',
    'pricing.badge': 'Licensing',
    'pricing.currency': 'DZD',
    'pricing.title': 'Choose the licence that fits your business',
    'pricing.subtitle': 'The prices shown are indicative and may change according to the commercial terms agreed when you order.',
    'pricing.recommended': 'Most chosen',
    'pricing.durationLabel': 'Duration',
    'pricing.priceLabel': 'Price',
    'pricing.planCol': 'Plan',
    'pricing.selectPlan': 'Request this licence',
    'pricing.askPlan': 'Ask about this plan',
    'pricing.whatsappIntro': 'Hello, I would like to request a Mohasabi licence:',
    'pricing.inquiryIntro': 'Hello, I have a question about Mohasabi licences:',
    'pricing.orEmail': 'or contact us by email',
    'pricing.contactTitle': 'No payment on this website',
    'pricing.contactBody': 'Choosing a plan and a duration opens a short message to WhatsApp or email, then the details are handled directly.',
    'pricing.indicativeTitle': 'Indicative pricing',
    'pricing.indicativeBody': 'These amounts are a reference only and may change with the offer in force at the time of your request; they are not a contract.',
    'pricing.paymentTitle': 'No online checkout',
    'pricing.paymentBody': 'The site shows no payment gateway, collects no card data, and does not activate any licence automatically from the browser.',
    'pricing.termsTitle': 'Terms agreed on request',
    'pricing.termsBody': 'Licence length, number of workstations and support conditions are set in the direct agreement; the site does not publish unconfirmed terms.',
    'guide.badge': 'Getting started',
    'guide.title': 'Get started with Mohasabi',
    'guide.subtitle': 'From downloading the installer to your first daily entry, in short steps based only on what the software actually offers.',
    'guide.videoTitle': 'Video walkthrough',
    'guide.videoPendingTitle': 'Tutorial video in preparation',
    'guide.videoPendingBody': 'No real video has been published yet. This area is reserved for it in 16:9; no placeholder link or dead play button is shown.',
    'guide.videoAria': 'Reserved area for the tutorial video, content not available yet',
    'guide.stepsTitle': 'Start steps',
    'guide.step1.title': 'Download the installer',
    'guide.step1.desc': 'Get Mohasabi_Setup_v1.0.3.exe from the official GitHub releases channel.',
    'guide.step2.title': 'Install on Windows',
    'guide.step2.desc': 'Run the setup file and follow the steps on a Windows 10 or Windows 11 64-bit machine.',
    'guide.step3.title': 'Launch Mohasabi',
    'guide.step3.desc': 'Open the application from the desktop shortcut or the programs menu once installation finishes.',
    'guide.stepNote': 'Check the version number and file name shown below before you continue.',
    'guide.functionsTitle': 'Core functions available',
    'guide.functionsIntro': 'The main screens available once setup is complete.',
    'guide.helpTitle': 'Stuck on installation or licensing?',
    'guide.helpBody': 'Open the support page to pick the kind of request and send a short WhatsApp or email message.',
    'guide.supportCta': 'Support & contact',
    'guide.pricingCta': 'Plans & licence',
    'support.badge': 'Support',
    'support.title': 'We are here to help',
    'support.subtitle': 'Pick the right channel and state your request type so the message is clear from the start.',
    'support.whatsappTitle': 'WhatsApp',
    'support.whatsappBody': 'The fastest way to ask about installation, licensing or daily use.',
    'support.emailTitle': 'Email',
    'support.emailBody': 'Better for requests that need detail or a written description of the problem.',
    'support.issuesTitle': 'Report a software defect',
    'support.issuesBody': 'If the problem is reproducible, an Issue can be opened on the official repository with the steps and version.',
    'support.requestTitle': 'Choose your request type',
    'support.requestBody': 'Each card opens a short WhatsApp message containing only the request type, with no personal or financial data.',
    'support.reqIntro': 'Hello, I need help with:',
    'support.req.install': 'Installation or launch issue',
    'support.req.activation': 'Licence activation request',
    'support.req.duration': 'Question about licence duration',
    'support.req.renewal': 'Question about renewal',
    'support.req.purchase': 'Buying a licence',
    'support.req.other': 'General enquiry',
    'support.infoTitle': 'Information that helps diagnose your issue',
    'support.info1': 'Application version: Mohasabi v1.0.3 or the one shown inside the program.',
    'support.info2': 'Operating system: Windows 10 or 11 and the machine architecture.',
    'support.info3': 'The exact steps that lead to the problem.',
    'support.info4': 'The error text as displayed, or a screenshot of it.',
    'support.info5': 'When it started and whether an update or hardware change came first.',
    'support.avoidTitle': 'Do not send these over chat',
    'support.avoid1': 'Passwords, activation keys or licence files.',
    'support.avoid2': 'Customer databases, real invoices or any file holding personal data.',
    'support.avoid3': 'Sensitive financial details or payment card data.',
    'support.faq1.q': 'How do I report a reproducible bug?',
    'support.faq1.a': 'Give the application version, the steps to reproduce it and the message shown; opening an Issue on the official repository also works.',
    'support.faq2.q': 'Is there a trial before buying?',
    'support.faq2.a': 'The website offers no automatic trial. Whether a trial or a demonstration is possible is discussed directly when you contact us.',
  },
};

export const getTranslation = (locale: Locale, key: TranslationKey): string => {
  const table = translations[locale];
  return table[key] ?? key;
};

export const locales: Locale[] = ['ar', 'fr', 'en'];

export const localeNames: Record<Locale, string> = {
  ar: 'العربية',
  fr: 'Français',
  en: 'English',
};

export const isRTL = (locale: Locale): boolean => locale === 'ar';
