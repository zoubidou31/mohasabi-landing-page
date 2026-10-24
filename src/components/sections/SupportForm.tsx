import { useState } from 'react';
import { Send } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { Button } from '../ui/Button';
import { api } from '../../services/api';
import type { TranslationKey } from '../../i18n/translations';

type State =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'queued' }
  | { kind: 'rejected'; code: string }
  | { kind: 'unavailable' };

interface SupportFormProps {
  topics: readonly { value: string; labelKey: TranslationKey }[];
}

export const SupportForm: React.FC<SupportFormProps> = ({ topics }) => {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState(topics[0]?.value ?? 'other');
  const [version, setVersion] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<TranslationKey[]>([]);
  const [state, setState] = useState<State>({ kind: 'idle' });

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (honeypot) {
      setState({ kind: 'queued' });
      return;
    }

    const found: TranslationKey[] = [];
    if (name.trim().length < 2) found.push('support.form.errorName');
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(email.trim())) found.push('support.form.errorEmail');
    if (message.trim().length < 20) found.push('support.form.errorMessage');
    setErrors(found);
    if (found.length > 0) return;

    setState({ kind: 'sending' });
    const result = await api.submitSupport({
      name: name.trim(),
      email: email.trim(),
      topic,
      version: version.trim(),
      message: message.trim(),
      website: honeypot,
    });

    if (result.kind === 'ok') {
      setState({ kind: 'queued' });
      setName('');
      setEmail('');
      setVersion('');
      setMessage('');
    } else if (result.kind === 'unavailable') {
      setState({ kind: 'unavailable' });
    } else {
      setState({ kind: 'rejected', code: result.error.code });
    }
  };

  const disabled = state.kind === 'sending' || state.kind === 'queued';

  return (
    <form onSubmit={submit} className="card relative p-6 md:p-7 space-y-5" noValidate>
      {errors.length > 0 && (
        <div role="alert" className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-800">
          <ul className="list-disc ps-5 space-y-1">
            {errors.map((key) => (
              <li key={key}>{t(key)}</li>
            ))}
          </ul>
        </div>
      )}

      {state.kind === 'queued' && (
        <p role="status" className="rounded-xl bg-primary-light border border-primary/20 p-4 text-sm text-neutral-700">
          {t('support.form.queued')}
        </p>
      )}

      {state.kind === 'unavailable' && (
        <p role="alert" className="rounded-xl bg-amber-50 border border-amber-300 p-4 text-sm text-neutral-700">
          {t('support.form.unavailable')}
        </p>
      )}

      {state.kind === 'rejected' && (
        <p role="alert" className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-800">
          {state.code === 'rate_limited' ? t('support.form.rateLimited') : t('support.form.rejected')}
        </p>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="support-name" className="block text-sm font-medium mb-1.5">
            {t('support.form.name')}
          </label>
          <input
            id="support-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name"
            className="field"
            maxLength={80}
            required
          />
        </div>
        <div>
          <label htmlFor="support-email" className="block text-sm font-medium mb-1.5">
            {t('support.form.email')}
          </label>
          <input
            id="support-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            className="field"
            maxLength={160}
            required
          />
        </div>
        <div>
          <label htmlFor="support-topic" className="block text-sm font-medium mb-1.5">
            {t('support.form.topic')}
          </label>
          <select
            id="support-topic"
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
            className="field"
          >
            {topics.map((option) => (
              <option key={option.value} value={option.value}>
                {t(option.labelKey)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="support-version" className="block text-sm font-medium mb-1.5">
            {t('support.form.version')}
          </label>
          <input
            id="support-version"
            type="text"
            value={version}
            onChange={(event) => setVersion(event.target.value)}
            className="field"
            maxLength={20}
            placeholder="1.0.3"
          />
        </div>
      </div>

      <div>
        <label htmlFor="support-message" className="block text-sm font-medium mb-1.5">
          {t('support.form.message')}
        </label>
        <textarea
          id="support-message"
          rows={5}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="field resize-y"
          maxLength={2000}
          required
        />
      </div>

      {/* Honeypot: hidden from assistive tech and out of the tab order. */}
      <div className="absolute -left-[9999px] h-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="support-website">Website</label>
        <input
          id="support-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </div>

      <Button variant="primary" size="lg" type="submit" disabled={disabled}>
        <Send className="w-4 h-4" aria-hidden="true" />
        {state.kind === 'sending' ? t('support.form.sending') : t('support.form.submit')}
      </Button>
    </form>
  );
};
