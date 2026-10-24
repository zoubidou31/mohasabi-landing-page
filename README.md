# Mohasabi — مستودع الموقع التعريفي

الموقع الرسمي التعريفي لبرنامج **Mohasabi** (برنامج محاسبة وفواتير مكتبي لنظام Windows).
يحتوي هذا المستودع على كود الموقع والخدمة الخلفية الخفيفة فقط. آخر تحديث لهذا الملف: **2026-10-24**.

## فصل المستودعات

| المستودع | الدور |
|---|---|
| `zoubidou31/mohasabi-landing-page` (هذا المستودع) | أكواد الموقع: `src/`، `public/`، `functions/`، `db/`، إعدادات البناء |
| `zoubidou31/mohasabi-releases` | ملفات الإصدارات المنشورة: `Mohasabi_Setup_vX.Y.Z.exe`، `version.json`، وسوم Git |

**ممنوع** نقل ملفات البرنامج أو قواعد بيانات العملاء أو مفاتيح الترخيص إلى هذا المستودع.
روابط التنزيل و`version.json` وSHA-256 ونظام Auto-Updater تعتمد على موجودات GitHub Releases في
مستودع الإصدارات، وليس على ملفات هذا المستودع.

## التقنيات

React 19 · TypeScript 6 · Vite 8 (rolldown) · Tailwind CSS 4 عبر `@tailwindcss/postcss` (نظام الرموز
يستخدم `@theme` لأن المشروع يستخدم v4 فعلًا) · react-router-dom 7 · framer-motion 14 · oxlint ·
Vitest 5 + Testing Library + jsdom · Cloudflare Pages Functions · D1 (SQLite).

## الأوامر

```bash
npm ci
npm run dev          # خادم تطوير للواجهة فقط (بلا /api)
npm run build        # tsc -b + tsc -p tsconfig.functions.json + vite build
npm run lint         # oxlint
npm run test         # vitest (watch)
npm run test:run     # vitest run — 58 اختبارًا
npm run preview      # معاينة بناء الإنتاج محليًا (بلا /api)

npm run db:local          # جداول D1 المحلية + الأسعار المعتمدة
npm run dev:api           # wrangler pages dev dist — الواجهة + Functions
npm run db:remote         # مخطط D1 الإنتاجي (يتطلب database_id إنتاجيًا حقيقيًا)
npm run db:remote:preview # مخطط D1 المعاينة mohasabi-cms-preview
npm run deploy:preview    # نشر مشروع mohasabi-preview على فرع preview
```

المتغيرات المحلية تُقرأ من `.dev.vars` (مستبعد من Git)؛ نموذجه `.dev.vars.example`.
`ADMIN_PASSWORD` و`SESSION_SECRET` أسرار بيئة فقط، ولا تُكتب في الكود أو `wrangler.toml`.

## الصفحات واللغات

`/` · `/features` · `/guide` · `/pricing` · `/support` · `/reviews` · `/whats-new` ·
`/whats-new/:version` · `/privacy` · `/terms` · `/admin`

العربية (RTL) والفرنسية والإنجليزية من `src/i18n/translations.ts`. النوع
`Record<Locale, Record<TranslationKey, string>>` يجعل أي مفتاح ناقص خطأ بناء. اختيار اللغة يُحفظ محليًا
ويُعكس في `<html lang dir>` ورابط `?lang=` والعنوان والـ canonical و`og:locale`.

## الرموز التصميمية

`src/index.css` داخل `@theme`: `primary #1b5e20`، `primary-light #f4f9f4`، `plan-pro #1976d2`،
`plan-enterprise #512da8`، `neutral-900 #212121`، إلى جانب أسماء دلالية (`surface`، `ink`، `line`)
وظلال ونصف أقطار وخطوط (Inter + Noto Sans Arabic). الشعار الرسمي `public/assets/logo.png` مستخدم كما هو.

## SEO والتوجيه

- يبني `scripts/seo-plugin.ts` قشرة HTML مستقلة لكل مسار عام، مع عنوان ووصف وcanonical وhreflang
  (`ar`/`fr`/`en`/`x-default`) وOG/Twitter خاصة بالصفحة، إضافة إلى `sitemap.xml` و`404.html`.
- `sitemap.xml` يحتوي المسارات العامة فقط (9 صفحات + إصدارَي `1.0.3` و`1.0.2`)، ولا يحتوي `/admin` أو `/api`.
- `robots.txt` يمنع `/admin` و`/api/` ويشير إلى خريطة الموقع.
- `/admin` و`404` يحملان `noindex, nofollow`، وبلا canonical أو hreflang أو JSON-LD. صفحة 404 تزيل
  أيضًا أي canonical/hreflang موروث عند التنقل داخل التطبيق.
- JSON-LD يقتصر على Organization وWebSite وSoftwareApplication ببيانات حقيقية، بلا تقييمات أو عروض
  أسعار أو بيانات شركة مُختلقة.
- Cloudflare Pages يخدم قشرة كل مسار عبر HTML handling، و`_redirects` يقتصر على تطبيع `/admin/`،
  و`_headers` يضيف `X-Robots-Tag` لـ`/admin` و`/api`.
- المسارات غير الموجودة تُرجع `404.html` بحالة 404 حقيقية: `/nope` و`/whats-new/9.9.9` و`/admin/whatever`.
  `/admin/` يعيد 301 إلى `/admin`، و`/pricing/` يعيد 308 إلى `/pricing`.

## سياسة المحتوى الصادق

- `src/content/releases.ts` يحتوي فقط الإصدارات **المنشورة فعليًا** (1.0.3 و1.0.2) بتواريخها وأحجامها
  وبصمات SHA-256 المأخوذة من GitHub Releases API. الوسمان `v1.0.0` و`v1.0.1` بلا Release منشور فلا يظهران.
- رابط التنزيل مثبّت على الإصدار `v1.0.3` وملفه `Mohasabi_Setup_v1.0.3.exe` (314,248,129 بايت،
  SHA-256 يطابق digest في GitHub API).
- لا تُعرض لقطات واجهة وهمية على أنها حقيقية. ما دامت لقطات v1.0.3 الفعلية غير متوفرة، تعرض
  `ScreenshotGallery` عنوانًا صريحًا «لقطات الشاشة غير متوفرة بعد» وبطاقة بديلة، وتُخفي ادعاء «الواجهة الحقيقية».
- لا يوجد فيديو شرح منشور؛ `TutorialVideo` يعرض مساحة 16:9 صريحة «قيد الإعداد» بلا رابط مؤقت أو زر تشغيل وهمي.
- الأسعار المعتمدة بالدينار الجزائري، وتُقرأ من `/api/pricing` عند توفره مع الرجوع إلى الجدول المحلي:
  Standard 1500/3500/6500/12000، Pro 3000/7500/13500/25000، Enterprise 5500/13000/24000/45000.
  لا يوجد دفع إلكتروني؛ الطلب عبر واتساب أو البريد.
- البريد المستخدم في الكود هو `mohzoubid@gmail.com`. تعارضه مع `mohzoub@gmail.com` يحتاج تأكيد المالك.
- دليل التثبيت لا يطلب تعطيل Defender/SmartScreen، ويطلب التحقق من المصدر والاسم وبصمة SHA-256 قبل التشغيل.

## الخدمة الخلفية (Pages Functions + D1)

| المسار | الوصول | الدور |
|---|---|---|
| `GET /api/reviews` | عام | التقييمات المعتمدة فقط، بلا بريد |
| `POST /api/reviews` | عام | إرسال تقييم → `pending` + حدود تكرار + فخ روبوتات |
| `POST /api/support` | عام | طلب دعم → `queued` + حدود تكرار + فخ روبوتات |
| `GET /api/pricing` | عام | الأسعار المعتمدة |
| `POST /api/login` · `POST /api/logout` | عام | إصدار/إنهاء الجلسة |
| `GET /api/session` | عام | `{admin:boolean}` فقط |
| `GET/PUT /api/admin/pricing` | مدير | قراءة/تحديث الأسعار مع سجل تدقيق |
| `GET /api/admin/reviews` · `PATCH /api/admin/reviews/:id` | مدير | اعتماد/رفض التقييمات |
| `GET /api/admin/messages` · `PATCH /api/admin/messages/:id` | مدير | صندوق الدعم |
| `GET /api/admin/stats` · `GET /api/admin/activity` | مدير | إحصاءات وسجل |

- الصلاحية تُفحص على الخادم في كل طلب عبر `functions/api/admin/_middleware.ts`؛ لا اعتماد على
  `localStorage` أو إخفاء الرابط.
- الجلسة: HMAC-SHA256 في كوكي `HttpOnly; Secure; SameSite=Strict` صالح 8 ساعات، ومقارنة كلمة المرور
  بتجزئة SHA-256 وثابتة الزمن.
- الطلبات المُعدِّلة ترفض أصلًا مختلفًا أو `Content-Type` غير JSON قبل المعالجة.
- غياب `ADMIN_PASSWORD`/`SESSION_SECRET` يعيد `501`، لا تجاوزًا.
- كل SQL مُعاملة (`prepare().bind()`)؛ D1 غير مكشوفة كواجهة HTTP؛ حدود التكرار محفوظة في D1.

## لوحة الإدارة

`/admin` لا تعرض شيئًا قبل تأكيد `GET /api/session` على الخادم، وتعرض حالة «غير متاحة» عند غياب الخدمة.
لا تُحمَّل بيانات إدارية في HTML العام، ولا تظهر رسائل خطأ تفصيلية للزائر. الواجهة تُحمَّل عند الطلب
(حزمة `AdminPage` منفصلة).

## الاختبارات الآلية

`npm run test:run` — **58 اختبارًا في 8 ملفات** (كلها ناجحة في 2026-10-24):

| الملف | العدد | التغطية |
|---|---:|---|
| `src/services/api.test.ts` | 12 | نجاح/فشل/شبكة/JSON غير صالح/انتهاء مهلة/401/403/429/501/404/405، حدود الأسعار، عدم تسريب رسائل داخلية |
| `src/i18n/LanguageContext.test.tsx` | 11 | اللغة الافتراضية، `?lang`، التخزين، `lang/dir`، `useSeo`، تبديل fr |
| `src/i18n/translations.test.ts` | 7 | تطابق المفاتيح بين اللغات، لا قيم فارغة/مفاتيح خام، hreflang، استبعاد admin/api |
| `src/pages/AdminPage.test.tsx` | 9 | لا بيانات قبل المصادقة، 401/403/429، انتهاء الجلسة، الخروج، منع البيانات الخاصة |
| `src/pages/ReviewsPage.test.tsx` | 8 | المعتمد فقط، إخفاء البريد، التحقق، الانتظار بعد الإرسال، التكرار، بديل واتساب |
| `src/components/sections/SupportForm.test.tsx` | 5 | تحقق الحقول، الإرسال، عدم التوفّر، حد المعدل، فخ الروبوتات |
| `src/hooks/usePricingPlans.test.tsx` | 5 | الجدول المعتمد، تجاوز الخادم، الرجوع عند الفشل، رفض القيم السالبة |
| `src/pages/NotFoundPage.test.tsx` | 1 | 404 بلا canonical/hreflang، robots واحد فقط |

`npm run lint` ينتهي بـ **0 أخطاء و4 تحذيرات** (`set-state-in-effect` في `Header`، `LanguageContext`،
وموضعين في `AdminPage`)، وVite يطلق تحذيرًا معلوماتيًا بشأن الاستيراد بلا امتداد في سكربتات البناء.
لا يوجد فشل.

## تقسيم الحزمة

قبل التقسيم كانت الحزمة الرئيسية الواحدة **683.65 kB**. بعد تحميل الصفحات الإدارية والثقيلة عند الطلب:

| الحزمة | الحجم | gzip |
|---|---:|---:|
| `index` (المشتركة) | 376.03 kB | 119.93 kB |
| `HomePage` | 36.29 kB | 7.63 kB |
| `AdminPage` (عند الطلب) | 16.02 kB | 4.45 kB |
| `createLucideIcon` | 185.18 kB | 58.49 kB |
| CSS | 52.82 kB | 9.65 kB |

## النشر: الإنتاج مقابل المعاينة

`wrangler.toml` يفصل البيئتين صراحة:

- **الإنتاج** (المستوى الأعلى، مشروع `mohasabi`): `database_id` مؤقت `00000000-…` يجب أن يستبدله المالك
  بقاعدة إنتاجية حقيقية قبل أي نشر. لا يشير إلى قاعدة المعاينة إطلاقًا.
- **المعاينة** (`[env.preview]`، مشروع `mohasabi-preview`): قاعدة `mohasabi-cms-preview`
  (`9d6590b6-7ac0-4dd5-a3b0-62321db906f4`). `npm run deploy:preview` يثبّت `--branch preview` كي
  تُطبَّق إعدادات `[env.preview]` ولا تسقط إلى ربط الإنتاج.
- الأسرار تُضبط لكل مشروع على حدة عبر `wrangler pages secret put`، ولا تُخزَّن في Git.

**الحالة الفعلية (2026-10-24):** `wrangler whoami` يعيد «غير مصادَق»، لذلك **لم يُنفَّذ نشر معاينة
ولا إنتاج في هذه الجولة**. كل التحقق أدناه جرى على محاكي محلي. لم يُعدَّل مشروع الإنتاج
`mohasabi.pages.dev` ولا نطاقه ولا DNS ولا قواعده ولا `mohasabi-releases`، ولم يُنشأ/يُتحقق من
`mohasabi-preview.pages.dev` في هذه الجولة.

`.github/workflows/deploy.yml` يدوي فقط (`workflow_dispatch`) وينشر على GitHub Pages وليس Cloudflare؛
لا يعمل عند الدفع. تغيير مصدر بناء مشروع `mohasabi` إلى هذا المستودع قرار مالك غير منفّذ.

## الاختبار الأمني

`scripts/qa-sec.sh` يشغّل 40 فحصًا على المحاكي المحلي (يرفض أي عنوان غير محلي إلا بـ`QA_ALLOW_REMOTE=1`):

```bash
npm run build && npm run db:local
npm run dev:api
QA_ADMIN_PASSWORD='<من .dev.vars>' bash scripts/qa-sec.sh
```

النتيجة المحلية في 2026-10-24: **40/40 ناجح** — منع الوصول الإداري بلا جلسة، كوكي مزوّر/فارغ، CSRF،
نوع محتوى، حد المعدل (429 في المحاولة السادسة)، دورة تقييم/دعم/أسعار كاملة، سجل تدقيق، واستعادة الأسعار.
حُذفت صفوف `qa-*@example.com` و`rate_limits` وسجلات التغيير التجريبية من D1 المحلية بعد الاختبار.
**لم يُشغَّل السكربت على معاينة منشورة في هذه الجولة** بسبب غياب مصادقة Cloudflare.

## القيود والعناصر المتبقية للمالك

- نشر معاينة/إنتاج حقيقي: **محجوب** حتى مصادقة Cloudflare وتوفير قاعدة الإنتاج والأسرار.
- لقطات شاشة حقيقية من v1.0.3 مع إخفاء بيانات العملاء، وفيديو شرح حقيقي: **غير متوفرة**.
- مراجعة المالك للبريد الرسمي (`mohzoubid@gmail.com` مقابل `mohzoub@gmail.com`) ونص `/terms` و`/privacy`
  (خصوصًا عدم وجود مدة حذف تلقائي لبيانات النماذج، والحاجة إلى التزام قانوني إن رغب المالك).
- اختبار عرض 375px لم يُنفَّذ في المتصفح المدمج (تعذّر تغيير viewport)؛ تم التحقق من 692px بلا تجاوز أفقي.
- `npm audit` يبلّغ عن 3 تنبيهات في أدوات التطوير (`wrangler`/`miniflare`/`undici`) لا تُشحن مع الموقع؛
  الإصلاح التلقائي يخفض `wrangler` ويكسر سير العمل، لذلك تُركت وستُراقب.
- أداة Hallmark (`nutlope/hallmark`) لم تُثبَّت في بيئة العمل؛ استُخدم نظام `@theme` الموثّق بدلًا منها.

## الوضع الحالي

الإنتاج `https://mohasabi.pages.dev/` لم يُمسّ وما زال يُبنى من مستودع الإصدارات. هذا المستودع
**جاهز للمعاينة** (بناء واختبارات وSEO وأمان محلي)، لكن النشر الفعلي للمعاينة أو الإنتاج قرار المالك
ولم يُنفَّذ هنا.
