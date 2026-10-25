import type { Locale } from '../i18n/translations';

export type ReleaseStatus = 'published';

export interface ReleaseNotes {
  headline: string;
  summary: string;
  added: readonly string[];
  fixed: readonly string[];
  improved: readonly string[];
  caution?: string;
}

export interface ReleaseRecord {
  version: string;
  tag: string;
  /** Real publish date read from the GitHub Releases API on 2026-10-24. */
  publishedAt: string;
  status: ReleaseStatus;
  assetName: string;
  assetSizeBytes: number;
  sha256: string;
  downloadUrl: string;
  releaseUrl: string;
  notes: Record<Locale, ReleaseNotes>;
}

const RELEASES_BASE = 'https://github.com/zoubidou31/mohasabi-releases/releases/tag';

// Only releases that exist as published GitHub Releases are listed. v1.0.0 and
// v1.0.1 have git tags but no published release or version.json, so they are
// deliberately absent rather than described from memory.
export const releases: readonly ReleaseRecord[] = [
  {
    version: '1.0.3',
    tag: 'v1.0.3',
    publishedAt: '2026-10-19',
    status: 'published',
    assetName: 'Mohasabi_Setup_v1.0.3.exe',
    assetSizeBytes: 314248129,
    sha256: '37EF66E129173094D522761876DD94E4535EB776134E64D6A394AEB1AE3BCE05',
    downloadUrl:
      'https://github.com/zoubidou31/mohasabi-releases/releases/latest/download/Mohasabi_Setup_v1.0.3.exe',
    releaseUrl: `${RELEASES_BASE}/v1.0.3`,
    notes: {
      ar: {
        headline: 'الترخيص المرتبط بالجهاز، ضبط الإدخال، واللغات الثلاث',
        summary:
          'يربط هذا الإصدار الترخيص بجهازك، ويضبط عمليات الإدخال والحسابات، ويكامل الواجهة بثلاث لغات.',
        added: [
          'معرّف مادي جديد (المعالج واللوحة الأم وBIOS) يظهر داخل التطبيق ويمكن نسخه بنقرة واحدة عند طلب الترخيص.',
          'استعادة مشفّرة للترخيص وفترة التجربة، مع إعادة اتصال تلقائية بعد التحديث دون إعادة إدخال الترخيص.',
          'ربط الترخيص بالجهاز لمنع النسخ؛ التراخيص الصادرة سابقًا تبقى سارية.',
          'رفض تشغيل الإصدارات القديمة على الجهاز (قفل إصدار machine).',
          'شاشة نهاية التجربة والاستعادة موسّعة: تاريخ الانتهاء، البريد، اسم المستخدم، المعرّف المادي، واستيراد ملف الترخيص.',
        ],
        fixed: [],
        improved: [
          'منع القيم السالبة (سعر الوحدة، الكمية، المبلغ، الخصم، المخزون).',
          'توحيد تنسيق العملة (مسافة غير قابلة للفصل وخانتان عشريتان) مع سقف لسعر الوحدة.',
          'ضبط حقول المبالغ والتواريخ: إدخال تقويمي ونطاق سنوات محدود.',
          'تحقق صارم من البريد الإلكتروني ومنع تكرار العملاء والمنتجات.',
          'نموذج الاستيراد CSV يعرض بحسب حالة الترخيص، والمستندات تصدر بالفرنسية مع ضبط المعاينة والتصدير.',
          'التحديث المؤجَّل يُطبَّق عند إغلاق التطبيق، والواجهة كاملة بالفرنسية/الإنجليزية/العربية مع موضوع داكن منقّح.',
        ],
      },
      fr: {
        headline: 'Licence matérielle, fiabilité de la saisie et langues',
        summary:
          'Cette version lie la licence à l\u2019appareil, fiabilise la saisie et complète l\u2019interface en trois langues.',
        added: [
          'Nouvel identifiant matériel (processeur, carte mère et BIOS), affiché dans l\u2019application et copiable en un clic pour la commande d\u2019une licence.',
          'Restauration automatique chiffrée de la licence et de l\u2019essai, avec reconnexion automatique après une mise à jour.',
          'Anti-clonage : la licence est liée à l\u2019appareil ; les licences déjà émises restent valides.',
          'Refus des versions obsolètes (verrou de version machine).',
          'Écran de fin d\u2019essai et récupération enrichis : expiration, email, nom d\u2019utilisateur, identifiant matériel copiable et import du fichier de licence.',
        ],
        fixed: [],
        improved: [
          'Valeurs négatives bloquées (prix unitaire, quantité, montant, remise, stock).',
          'Format monétaire normalisé (espace insécable, deux décimales) et plafond du prix unitaire.',
          'Champs montants et dates fiabilisés (saisie calendrier, plage d\u2019années limitée).',
          'Validation stricte des emails et prévention des doublons (clients, produits).',
          'Modèle CSV d\u2019importation affiché selon l\u2019état de la licence ; documents toujours produits en français.',
          'Mise à jour différée appliquée à la fermeture de l\u2019application ; interface français / anglais / arabe complète et thème sombre retravaillé.',
        ],
      },
      en: {
        headline: 'Device-bound licence, steadier data entry, three languages',
        summary:
          'This release binds the licence to your machine, hardens data entry and completes the interface in three languages.',
        added: [
          'New hardware identifier (CPU, motherboard and BIOS) shown in the app and copyable in one click when ordering a licence.',
          'Encrypted automatic restore of licence and trial, with automatic reconnection after an update.',
          'Anti-cloning: the licence is bound to the device; licences already issued stay valid.',
          'Obsolete versions are refused (machine version lock).',
          'Richer trial-end and recovery screen: expiry date, email, user name, copyable hardware id and licence file import.',
        ],
        fixed: [],
        improved: [
          'Negative values blocked (unit price, quantity, amount, discount, stock).',
          'Currency format normalised (non-breaking space, two decimals) with a unit price ceiling.',
          'Amount and date fields made reliable (calendar entry, limited year range).',
          'Strict email validation and duplicate prevention (clients, products).',
          'CSV import template shown according to licence state; documents always produced in French.',
          'Deferred update applies when the app closes; full French / English / Arabic interface and a reworked dark theme.',
        ],
      },
    },
  },
  {
    version: '1.0.2',
    tag: 'v1.0.2',
    publishedAt: '2026-10-17',
    status: 'published',
    assetName: 'Mohasabi_Setup_v1.0.2.exe',
    assetSizeBytes: 314117426,
    sha256: '60F9E55D8808866ABED9520974702231413BE1ECF868A73FA087F9C9DD797292',
    downloadUrl:
      'https://github.com/zoubidou31/mohasabi-releases/releases/download/v1.0.2/Mohasabi_Setup_v1.0.2.exe',
    releaseUrl: `${RELEASES_BASE}/v1.0.2`,
    notes: {
      ar: {
        headline: 'تصحيح آلية التحديث التلقائي',
        summary: 'يصحح هذا الإصدار اكتشاف التحديثات الذي كان يعرض «نسختك محدّثة» بشكل خاطئ.',
        added: [],
        fixed: [
          'مصدر التحديث مضبوط على مستودع الإصدارات الرسمي، بعد أن كان عنوانًا غير متاح يمنع اكتشاف التحديثات.',
          'مقارنة أرقام الإصدارات صارت تتعامل مع البادئة «v» كما في وسوم GitHub، فيُكتشف الإصدار الأحدث فعلًا.',
          'إشعار الجرس يبقى ظاهرًا، ونافذة التحديث تعرض ملخص الجديد، وزر التنزيل يبدأ التحميل ثم التثبيت بعد التحقق من بصمة SHA-256.',
          'ملف launcher.json يُحدَّث عند كل تثبيت حتى تبقى مصدر التحديث تابعًا للناشر.',
        ],
        improved: [],
        caution:
          'الإصداران 1.0.0 و1.0.1 المثبّتان مسبقًا يحملان العنوان القديم ويستلزمان استبدالًا يدويًا واحدًا؛ بعدها التحديثات تلقائية من 1.0.2 فصاعدًا.',
      },
      fr: {
        headline: 'Correction du mécanisme de mise à jour',
        summary: 'Cette version corrige la détection des mises à jour.',
        added: [],
        fixed: [
          'Source de mise à jour corrigée : le manifeste est lu depuis le dépôt public officiel des versions.',
          'Comparaison de versions robuste : un numéro préfixé par v (comme les tags GitHub) est correctement interprété.',
          'Notification conservée, résumé des nouveautés affiché et bouton « Télécharger la mise à jour » qui vérifie l\u2019empreinte SHA-256 avant exécution.',
          'launcher.json est mis à jour à chaque installation pour que la source suive l\u2019éditeur.',
        ],
        improved: [],
        caution:
          'Les versions 1.0.0 et 1.0.1 déjà installées contiennent l\u2019ancienne adresse et doivent être remplacées une seule fois manuellement.',
      },
      en: {
        headline: 'Update mechanism fixed',
        summary: 'This release fixes update detection.',
        added: [],
        fixed: [
          'Update source corrected: the manifest is now read from the official public releases repository.',
          'Robust version comparison: a v-prefixed number (like GitHub tags) is parsed correctly.',
          'The bell notification stays visible, the update window shows the highlights, and the download button verifies the SHA-256 fingerprint before running.',
          'launcher.json is refreshed on every install so the update source follows the publisher.',
        ],
        improved: [],
        caution:
          'Versions 1.0.0 and 1.0.1 already installed carry the old address and need one manual replacement.',
      },
    },
  },
] as const;

export const formatBytes = (bytes: number, locale: Locale): string => {
  const mebibytes = bytes / (1024 * 1024);
  const value = mebibytes.toLocaleString(locale === 'ar' ? 'ar-DZ' : 'fr-FR', {
    maximumFractionDigits: 1,
  });
  return `${value} MiB`;
};
