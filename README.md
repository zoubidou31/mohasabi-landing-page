# Mohasabi — مستودع الموقع التعريفي

الموقع الرسمي التعريفي لبرنامج **Mohasabi** (برنامج محاسبة وفواتير مكتبي لنظام Windows).
هذا المستودع يحتوي على **كود الموقع والخدمة الخلفية الخفيفة فقط**.

## فصل المستودعات

| المستودع | الدور |
|---|---|
| `zoubidou31/mohasabi-landing-page` (هذا المستودع) | أكواد الموقع: `src/`، `public/`، `functions/`، `db/`، إعدادات البناء |
| `zoubidou31/mohasabi-releases` | ملفات الإصدارات المنشورة: `Mohasabi_Setup_vX.Y.Z.exe`، `version.json`، وسوم Git |

**ممنوع** نقل ملفات البرنامج أو قواعد بيانات العملاء أو مفاتيح الترخيص إلى هذا المستودع.
روابط التنزيل و`version.json` وSHA-256 ونظام Auto-Updater تعتمد على **موجودات GitHub Releases** في
مستودع الإصدارات، وليس على ملفات هذا المستودع.

## التقنيات

React 19 · TypeScript 6 · Vite 8 (rolldown) · Tailwind CSS 4 عبر `@tailwindcss/postcss` (نظام الرموز
يستخدم `@theme` لأن المشروع يستخدم v4 فعلًا) · react-router-dom 7 · framer-motion 14 · oxlint ·
Cloudflare Pages Functions · D1 (SQLite).

## الأوامر

```bash
npm ci
npm run dev        # خادم تطوير للواجهة فقط (بلا /api)
npm run build      # tsc -b + tsc -p tsconfig.functions.json + vite build
npm run lint       # oxlint
npm run preview    # معاينة بناء الإنتاج (بلا /api)

npm run db:local   # إنشاء جداول D1 المحلية وبيانات الأسعار المعتمدة
npm run dev:api    # wrangler pages dev dist — واجهة + Functions على منفذ محلي
npm run db:remote  # تطبيق المخطط على D1 في Cloudflare (يتطلب database_id حقيقيًا)
```

المتغيرات المحلية للتطوير تُقرأ من `.dev.vars` (مستبعد من Git). نموذجه في `.dev.vars.example`.

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
  واتساب أو البريد. واجهة الأسعار تقرأ `/api/pricing` إن توفّرت، وإلا تبقى على الجدول المحلي المعتمد.
- نماذج الدعم والتقييمات تتصل بـ `/api/*`. أي رد لا يحمل JSON بالشكل المتوقع (مثل صفحة HTML من
  إعادة توجيه SPA) يُعامل كـ«غير متاح» ولا يُعرض كنجاح (انظر `src/services/api.ts`).

## الخدمة الخلفية (Pages Functions + D1)

| المسار | الوصول | الدور |
|---|---|---|
| `GET /api/reviews` | عام | التقييمات المعتمدة فقط، بلا بريد |
| `POST /api/reviews` | عام | إرسال تقييم → `pending` + حدود تكرار + فخ روبوتات |
| `POST /api/support` | عام | طلب دعم → `queued` + حدود تكرار + فخ روبوتات |
| `GET /api/pricing` | عام | الأسعار المعتمدة |
| `POST /api/login` | عام | تحقق من كلمة المرور وإصدار الجلسة |
| `POST /api/logout` | عام | إنهاء الجلسة |
| `GET /api/session` | عام | `{admin:boolean}` فقط |
| `GET/PUT /api/admin/pricing` | مدير | قراءة/تحديث الأسعار مع سجل تدقيق |
| `GET /api/admin/reviews` · `PATCH /api/admin/reviews/:id` | مدير | مراجعة واعتماد/رفض |
| `GET /api/admin/messages` · `PATCH /api/admin/messages/:id` | مدير | صندوق الدعم |
| `GET /api/admin/stats` · `GET /api/admin/activity` | مدير | إحصاءات وسجل |

- الصلاحية تُفحص **على الخادم في كل طلب** عبر `functions/api/admin/_middleware.ts`؛ لا يوجد أي اعتماد
  على `localStorage` أو على إخفاء الرابط.
- الجلسة: رمز موقّع HMAC-SHA256 في كوكي `HttpOnly; Secure; SameSite=Strict` صالح 8 ساعات.
- كل الطلبات المُعدِّلة ترفض أصلًا مختلفًا أو محتوى غير JSON (حماية CSRF) قبل المعالجة.
- `ADMIN_PASSWORD` و`SESSION_SECRET` أسرار بيئة Cloudflare فقط، لا تُكتب في الكود ولا في `wrangler.toml`.
  بدونهما تعيد نقاط النهاية `501` بدل أي تجاوز.
- قاعدة D1 غير مكشوفة كواجهة HTTP: لا يمكن الوصول إليها إلا عبر الدوال باستعلامات مُعاملة
  (`prepare().bind()`)، والجداول كلها تُنشأ من `db/schema.sql`.
- حدود التكرار محفوظة في D1 (نافذة زمنية) وليست في الذاكرة، فتبقى فعّالة بين نسخ الـWorker.

## لوحة الإدارة

`/admin` لا تعرض شيئًا قبل تأكيد `GET /api/session` على الخادم. عند غياب الخدمة أو الجلسة تعرض حالة
«غير متاحة» بدل أي بيانات. اللوحة **لم تُنشر بعد**؛ اختبارات المنع نُفّذت على محاكي محلي فقط
(`wrangler pages dev`) بتاريخ 2026-10-24: 38/38 فحصًا ناجحًا، تشمل رفض الوصول المجهول لكل نقاط
`/api/admin/*`، وكوكي مزوّر، وأصلًا مختلفًا، ونوع محتوى غير JSON، وحدود تسجيل الدخول. لا يُعتبر ذلك
بديلًا عن إعادة الاختبار على الاستضافة المنشورة قبل فتح اللوحة.

### قبل نشر اللوحة — خطوات المالك

1. `npx wrangler d1 create mohasabi-cms` ثم لصق `database_id` الناتج في `wrangler.toml`.
2. `npm run db:remote` لتطبيق `db/schema.sql` (الجداول + الأسعار المعتمدة).
3. `npx wrangler pages secret put ADMIN_PASSWORD` ثم `npx wrangler pages secret put SESSION_SECRET`
   (قيمة عشوائية 32+ حرفًا) في بيئة الإنتاج.
4. نشر معاينة والتحقق من `/api/session` و`/api/pricing` ومن رفض `/api/admin/*` بلا جلسة.
5. عندها فقط: تغيير مصدر البناء في Cloudflare Pages إلى هذا المستودع
   (Build command `npm run build`، Output directory `dist`) مع خطة رجوع جاهزة.

`.github/workflows/deploy.yml` يعمل يدويًا فقط (`workflow_dispatch`) ولا يُنشئ موقعًا مكررًا عند كل push.
`public/_headers` و`public/_redirects` خاصان بـ Cloudflare Pages.

## الاختبار الأمني

`scripts/qa-sec.sh` يشغّل فحوص منع الوصول غير المصرح ومسارات التقييم والدعم والأسعار مقابل المحاكي.
يرفض العمل على أي عنوان غير محلي إلا بتفعيل `QA_ALLOW_REMOTE=1` صراحةً، لأنه يكتب بيانات اختبار:

```bash
npm run build && npm run db:local
npm run dev:api
QA_ADMIN_PASSWORD='<كلمة مرور .dev.vars>' bash scripts/qa-sec.sh
```

## ما تبقى قبل الإنتاج

- نشر الخدمة الخلفية على Cloudflare (D1 + الأسرار + معاينة) ثم إعادة اختبار المنع على المنشور،
  وبعدها فقط تغيير مصدر البناء.
- 4 لقطات شاشة فعلية من v1.0.3 (مع إخفاء بيانات العملاء) ورابط فيديو الشرح.
- `sitemap.xml` و`robots.txt` و`hreflang`.
- مراجعة المالك لنص `/terms`.
- اختبارات آلية للواجهة (vitest) وتقسيم حزمة `/admin` (حاليًا ~684 kB في حزمة واحدة).
- `npm audit` يبلّغ عن 3 تنبيهات في `wrangler`/`miniflare`/`undici` (أدوات تطوير فقط، لا تُشحن مع الموقع)؛
  الإصلاح التلقائي يخفض `wrangler` إلى 4.35.0 ويكسر سير العمل، لذلك تُركت وستُراقب.
- أداة Hallmark (`nutlope/hallmark`) تعذّر تثبيتها في بيئة العمل، لذلك استُخدم نظام رموز `@theme`
  الموثّق أعلاه بدلًا منها.

## الوضع الحالي للنشر

الموقع المنشور على `https://mohasabi.pages.dev/` ما زال يُبنى من مستودع الإصدارات ولم يُحوَّل إلى هذا
المستودع بعد. لا يوجد أي ادعاء بأن هذا الكود منشور.
