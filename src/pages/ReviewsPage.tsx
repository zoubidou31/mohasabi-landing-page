import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, Inbox, MessageCircle, Send, Star } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { usePageTitle } from '../i18n/usePageTitle';
import { PageHeader } from '../components/ui/PageHeader';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { api, type PublicReview } from '../services/api';
import type { TranslationKey } from '../i18n/translations';
import { buildWhatsAppUrl, siteConfig } from '../config/siteConfig';

type SubmitState =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'queued' }
  | { kind: 'rejected'; code: string }
  | { kind: 'unavailable' };

const ratingValues = [1, 2, 3, 4, 5] as const;

export const ReviewsPage: React.FC = () => {
  const { t, locale } = useLanguage();
  usePageTitle('seo.page.reviews');

  const [reviews, setReviews] = useState<PublicReview[] | null>(null);
  const [listError, setListError] = useState<'unavailable' | 'rejected' | null>(null);
  const [state, setState] = useState<SubmitState>({ kind: 'idle' });

  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [rating, setRating] = useState<number>(0);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [fieldErrors, setFieldErrors] = useState<TranslationKey[]>([]);

  useEffect(() => {
    let active = true;
    void api.listReviews().then((result) => {
      if (!active) return;
      if (result.kind === 'ok') {
        setReviews(result.data.reviews);
        setListError(null);
      } else if (result.kind === 'unavailable') {
        setReviews([]);
        setListError('unavailable');
      } else {
        setReviews([]);
        setListError('rejected');
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const formattedReviews = useMemo(() => {
    const formatter = new Intl.DateTimeFormat(
      locale === 'ar' ? 'ar-DZ' : locale === 'fr' ? 'fr-DZ' : 'en-GB',
      { year: 'numeric', month: 'long', day: 'numeric' },
    );
    return (reviews ?? []).map((review) => ({
      ...review,
      formattedDate: formatter.format(new Date(review.publishedAt)),
    }));
  }, [reviews, locale]);

  const validate = (): TranslationKey[] => {
    const errors: TranslationKey[] = [];
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(email.trim())) errors.push('reviews.error.email');
    if (rating < 1 || rating > 5) errors.push('reviews.error.rating');
    if (title.trim().length < 3) errors.push('reviews.error.title');
    if (body.trim().length < 15) errors.push('reviews.error.body');
    if (body.trim().length > 1200) errors.push('reviews.error.bodyLong');
    if (!consent) errors.push('reviews.error.consent');
    return errors;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Honeypot: silently drop bots that fill the hidden field.
    if (honeypot) {
      setState({ kind: 'queued' });
      return;
    }
    const errors = validate();
    setFieldErrors(errors);
    if (errors.length > 0) return;

    setState({ kind: 'sending' });
    const result = await api.submitReview({
      email: email.trim(),
      displayName: displayName.trim(),
      rating,
      title: title.trim(),
      body: body.trim(),
      consent,
      website: honeypot,
    });

    if (result.kind === 'ok') {
      setState({ kind: 'queued' });
      setEmail('');
      setDisplayName('');
      setRating(0);
      setTitle('');
      setBody('');
      setConsent(false);
      setFieldErrors([]);
    } else if (result.kind === 'unavailable') {
      setState({ kind: 'unavailable' });
    } else {
      setState({ kind: 'rejected', code: result.error.code });
    }
  };

  return (
    <>
      <PageHeader
        badge={t('reviews.badge')}
        title={t('reviews.title')}
        subtitle={t('reviews.subtitle')}
        titleId="reviews-title"
      />

      <section className="section bg-surface" aria-labelledby="reviews-list-title">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading title={t('reviews.listTitle')} titleId="reviews-list-title" align="start" />

          {listError === 'unavailable' ? (
            <div className="card p-6 flex gap-3 items-start border-amber-300 bg-amber-50">
              <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-amber-700" aria-hidden="true" />
              <p className="text-sm text-neutral-700 leading-relaxed">{t('reviews.serviceDown')}</p>
            </div>
          ) : formattedReviews.length === 0 ? (
            <div className="card p-8 flex flex-col items-center text-center gap-3">
              <Inbox className="w-8 h-8 text-neutral-400" aria-hidden="true" />
              <h3 className="font-semibold text-neutral-900">{t('reviews.emptyTitle')}</h3>
              <p className="max-w-xl text-sm text-neutral-600 leading-relaxed">
                {t('reviews.emptyBody')}
              </p>
            </div>
          ) : (
            <ul className="grid md:grid-cols-2 gap-5">
              {formattedReviews.map((review, index) => (
                <motion.li
                  key={review.id}
                  className="card card-hover p-6 flex flex-col gap-3"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                >
                  <div
                    className="flex items-center gap-1"
                    role="img"
                    aria-label={t('reviews.starsAria').replace('{rating}', String(review.rating))}
                  >
                    {ratingValues.map((value) => (
                      <Star
                        key={value}
                        className={`w-4 h-4 ${
                          value <= review.rating
                            ? 'fill-plan-pro text-plan-pro'
                            : 'text-neutral-300'
                        }`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <h3 className="font-semibold text-neutral-900">{review.title}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">{review.body}</p>
                  <p className="mt-auto pt-3 text-xs text-neutral-500 border-t border-neutral-100">
                    {review.displayName} · {review.formattedDate}
                  </p>
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="section bg-surface-muted border-t border-neutral-200" aria-labelledby="reviews-form-title">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5">
              <SectionHeading
                title={t('reviews.formTitle')}
                titleId="reviews-form-title"
                align="start"
                subtitle={t('reviews.formSubtitle')}
              />
              <ul className="space-y-3 text-sm text-neutral-600 leading-relaxed">
                <li className="flex gap-2">
                  <span className="text-primary font-semibold">{t('reviews.rule1.label')}</span>
                  {t('reviews.rule1.body')}
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-semibold">{t('reviews.rule2.label')}</span>
                  {t('reviews.rule2.body')}
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-semibold">{t('reviews.rule3.label')}</span>
                  {t('reviews.rule3.body')}
                </li>
              </ul>
              <p className="mt-5 text-sm text-neutral-600 leading-relaxed">
                <Link
                  to="/privacy"
                  className="text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded"
                >
                  {t('reviews.privacyLink')}
                </Link>
              </p>
            </div>

            <div className="lg:col-span-7">
              <form onSubmit={handleSubmit} className="card p-6 md:p-7 space-y-5" noValidate>
                {fieldErrors.length > 0 && (
                  <div
                    role="alert"
                    className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-800"
                  >
                    <ul className="list-disc ps-5 space-y-1">
                      {fieldErrors.map((key) => (
                        <li key={key}>{t(key)}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {state.kind === 'queued' && (
                  <div
                    role="status"
                    className="rounded-xl bg-primary-light border border-primary/20 p-4 text-sm text-neutral-700"
                  >
                    {t('reviews.queued')}
                  </div>
                )}

                {state.kind === 'unavailable' && (
                  <div
                    role="alert"
                    className="rounded-xl bg-amber-50 border border-amber-300 p-4 text-sm text-neutral-700"
                  >
                    {t('reviews.unavailable')}{' '}
                    <a
                      href={buildWhatsAppUrl(t('reviews.whatsappIntro'))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline underline-offset-4"
                    >
                      {t('reviews.whatsappFallback')}
                    </a>
                  </div>
                )}

                {state.kind === 'rejected' && (
                  <div
                    role="alert"
                    className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-800"
                  >
                    {state.code === 'duplicate'
                      ? t('reviews.duplicate')
                      : state.code === 'rate_limited'
                        ? t('reviews.rateLimited')
                        : t('reviews.rejected')}
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="review-email" className="block text-sm font-medium mb-1.5">
                      {t('reviews.emailLabel')}
                    </label>
                    <input
                      id="review-email"
                      type="email"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      autoComplete="email"
                      className="field"
                      maxLength={160}
                    />
                    <p className="mt-1.5 text-xs text-neutral-500">{t('reviews.emailHint')}</p>
                  </div>
                  <div>
                    <label htmlFor="review-name" className="block text-sm font-medium mb-1.5">
                      {t('reviews.nameLabel')}
                    </label>
                    <input
                      id="review-name"
                      type="text"
                      value={displayName}
                      onChange={(event) => setDisplayName(event.target.value)}
                      autoComplete="name"
                      className="field"
                      maxLength={60}
                      placeholder={t('reviews.namePlaceholder')}
                    />
                    <p className="mt-1.5 text-xs text-neutral-500">{t('reviews.nameHint')}</p>
                  </div>
                </div>

                <fieldset>
                  <legend className="block text-sm font-medium mb-2">
                    {t('reviews.ratingLabel')}
                  </legend>
                  <div className="flex items-center gap-1.5">
                    {ratingValues.map((value) => (
                      <label
                        key={value}
                        className={`inline-flex items-center justify-center w-11 h-11 rounded-xl border cursor-pointer transition-colors ${
                          rating === value
                            ? 'border-primary bg-primary-light text-primary'
                            : 'border-neutral-300 text-neutral-400 hover:border-primary/50'
                        } focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary`}
                      >
                        <input
                          type="radio"
                          name="rating"
                          value={value}
                          checked={rating === value}
                          onChange={() => setRating(value)}
                          className="sr-only"
                        />
                        <Star className={`w-5 h-5 ${rating >= value ? 'fill-current' : ''}`} aria-hidden="true" />
                        <span className="sr-only">
                          {t('reviews.starOption').replace('{value}', String(value))}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div>
                  <label htmlFor="review-title" className="block text-sm font-medium mb-1.5">
                    {t('reviews.titleLabel')}
                  </label>
                  <input
                    id="review-title"
                    type="text"
                    required
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    className="field"
                    maxLength={90}
                  />
                </div>

                <div>
                  <label htmlFor="review-body" className="block text-sm font-medium mb-1.5">
                    {t('reviews.bodyLabel')}
                  </label>
                  <textarea
                    id="review-body"
                    required
                    rows={5}
                    value={body}
                    onChange={(event) => setBody(event.target.value)}
                    className="field resize-y"
                    maxLength={1200}
                  />
                  <p className="mt-1.5 text-xs text-neutral-500">
                    {t('reviews.bodyHint').replace('{count}', String(body.trim().length))}
                  </p>
                </div>

                {/* Honeypot field: hidden from assistive tech and skipped by tab order. */}
                <div className="absolute -left-[9999px] h-0 overflow-hidden" aria-hidden="true">
                  <label htmlFor="review-website">Website</label>
                  <input
                    id="review-website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(event) => setHoneypot(event.target.value)}
                  />
                </div>

                <label className="flex gap-3 items-start text-sm text-neutral-700 leading-relaxed">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(event) => setConsent(event.target.checked)}
                    className="mt-1 w-4 h-4 accent-[var(--color-primary)]"
                  />
                  <span>{t('reviews.consent')}</span>
                </label>

                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    variant="primary"
                    size="lg"
                    type="submit"
                    disabled={state.kind === 'sending' || state.kind === 'queued'}
                  >
                    <Send className="w-4 h-4" aria-hidden="true" />
                    {state.kind === 'sending' ? t('reviews.sending') : t('reviews.submit')}
                  </Button>
                  <a
                    href={siteConfig.contact.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded"
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    {t('reviews.contactInstead')}
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
