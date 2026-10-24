# Mohasabi — مستودع الموقع التعريفي

الموقع الرسمي التعريفي لبرنامج **Mohasabi** (برنامج محاسبة وفواتير مكتبي لنظام Windows).
هذا المستودع يحتوي على **كود الموقع فقط**.

## فصل المستودعات

| المستودع | الدور |
|---|---|
| `zoubidou31/mohasabi-landing-page` (هذا المستودع) | أكواد الموقع: `src/`، `public/`، إعدادات البناء |
| `zoubidou31/mohasabi-releases` | ملفات الإصدارات المنشورة: `Mohasabi_Setup_vX.Y.Z.exe`، `version.json`، وسوم Git |

**ممنوع** نقل ملفات البرنامج أو قواعد بيانات العملاء أو مفاتيح الترخيص إلى هذا المستودع.
روابط التنزيل و`version.json` وSHA-256 ونظام Auto-Updater تعتمد على **موجودات GitHub Releases** في
مستودع الإصدارات، وليس على ملفات هذا المستودع.

## التقنيات

React 19 · TypeScript 6 · Vite 8 (rolldown) · Tailwind CSS 4 عبر `@tailwindcss/postcss` (نظام الرموز
يستخدم `@theme` لأن المشروع يستخدم v4 فعلًا) · react-router-dom 7 · framer-motion 14 · oxlint.

## الأوامر

```bash
npm ci
npm run dev        # خادم تطوير
npm run build      # tsc -b + vite build
npm run preview    # معاينة بناء الإنتاج
npm run lint       # oxlint
```

## الصفحات

`/` · `/features` · `/guide` · `/pricing` · `/support` · `/reviews` · `/whats-new` ·
`/whats-new/:version` · `/privacy` · `/terms` · `/admin`

## اللغات

العربية (RTL) والفرنسية والإنجليزية من `src/i18n/translations.ts`. اكتمال الترجمات مضمون بنوع TypeScript:
`Record<Locale, Record<TranslationKey, string>>` — أي مفتاح ناقص يُفشل `npm run build`.

## الرموز التصميمية

`src/index.css` داخل `@theme`: `primary #1b5e20`، `primary-light #f4f9f4`، `plan-pro #1976d2`،
`plan-enterprise #512da8`، `neutral-900 #212121`، إلى جانب أسماء دلالية (`surface`، `ink`، `line`)
وظلال ونصف أقطار وخطوط (Inter + Noto Sans Arabic).

## سياسة المحتوى الصادق

- لا تُعرض لقطات واجهة وهمية على أنها حقيقية: ما دامت لقطات v1.0.3 الفعلية غير متوفرة، يعرض
  `ScreenshotGallery` بطاقة `screenshots.pending` بدلًا منها.
- `src/content/releases.ts` يحتوي فقط على الإصدارات **المنشورة فعليًا** (1.0.3 و1.0.2) بتواريخها
  وأحجامها وبصمات SHA-256 المأخوذة من GitHub Releases API. وسما `v1.0.0` و`v1.0.1` بلا Release منشور
  لذلك لا يظهران في `/whats-new`.
- الأسعار في `src/config/siteConfig.ts` إرشادية وقابلة للتغيير، ولا يوجد دفع إلكتروني؛ الطلب يتم عبر
  واتساب أو البريد.
- نماذج الدعم والتقييمات تتصل بـ `/api/*`. **الخدمة الخلفية غير منشورة بعد**: عند غيابها تعرض الصفحات
  حالة «غير متاح» صراحةً ولا تعرض نجاحًا وهميًا (انظر `src/services/api.ts`).

## لوحة الإدارة

`/admin` تنتظر `GET /api/session` حقيقية. بلا مصادقة وصلاحيات على الخادم تعرض بطاقة «خدمة الإدارة غير
منشورة على هذه الاستضافة». إخفاء الرابط لا يُعد حماية، ولا تُنشر اللوحة قبل وجود Backend حقيقي
(Pages Functions + D1 + سر `ADMIN_PASSWORD` + جلسة `HttpOnly`).

## النشر

المستضيف الحالي `https://mohasabi.pages.dev/` يبني من مستودع الإصدارات حتى يغيّر المالك مصدر البناء إلى
هذا المستودع في Cloudflare Pages (Build command `npm run build`، Output directory `dist`).
`.github/workflows/deploy.yml` يعمل يدويًا فقط (`workflow_dispatch`) ولا يُنشئ موقعًا مكررًا عند كل push.
`public/_headers` و`public/_redirects` خاصان بـ Cloudflare Pages.

## ما تبقى قبل الإنتاج

- Backend حقيقي للوحة الإدارة وللتقييمات وطلبات الدعم.
- 4 لقطات شاشة فعلية من v1.0.3 (مع إخفاء بيانات العملاء) ورابط فيديو الشرح.
- `sitemap.xml` و`robots.txt` و`hreflang`.
- مراجعة المالك لنص `/terms`.
- أداة Hallmark (`nutlope/hallmark`) تعذّر تثبيتها في بيئة العمل، لذلك استُخدم نظام رموز `@theme`
  الموثّق أعلاه بدلًا منها.
