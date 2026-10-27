import { useEffect, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  FileText,
  Gauge,
  Home,
  Image as ImageIcon,
  Inbox,
  KeyRound,
  Loader2,
  LogOut,
  Mail,
  MessageCircleQuestion,
  Star,
  Tag,
  ThumbsDown,
  ThumbsUp,
  Upload,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { Button } from '../components/ui/Button';
import type { TranslationKey } from '../i18n/translations';
import { api, type ActivityEntry, type AdminMessage, type AdminReview, type AdminStats, type PricingPlanRow } from '../services/api';
import { CmsHomePanel } from '../components/admin/CmsHomePanel';
import { CmsFaqPanel } from '../components/admin/CmsFaqPanel';
import { CmsMediaPanel } from '../components/admin/CmsMediaPanel';

type Gate = 'checking' | 'anonymous' | 'admin' | 'unavailable';
type PanelId = 'dashboard' | 'reviews' | 'pricing' | 'messages' | 'activity' | 'cms-home' | 'cms-pages' | 'cms-faq' | 'cms-media' | 'cms-releases';

interface PanelDef {
  id: PanelId;
  icon: React.ComponentType<{ className?: string }>;
  labelKey: TranslationKey;
  label?: string;
}

const panelDefs: readonly PanelDef[] = [
  { id: 'dashboard', icon: Gauge, labelKey: 'admin.nav.dashboard' },
  { id: 'cms-home', icon: Home, labelKey: 'admin.nav.dashboard', label: 'CMS: Home' },
  { id: 'cms-pages', icon: FileText, labelKey: 'admin.nav.dashboard', label: 'CMS: Pages' },
  { id: 'cms-faq', icon: MessageCircleQuestion, labelKey: 'admin.nav.dashboard', label: 'CMS: FAQ' },
  { id: 'cms-media', icon: ImageIcon, labelKey: 'admin.nav.dashboard', label: 'CMS: Media' },
  { id: 'cms-releases', icon: Upload, labelKey: 'admin.nav.dashboard', label: 'CMS: Releases' },
  { id: 'reviews', icon: Star, labelKey: 'admin.nav.reviews' },
  { id: 'pricing', icon: Tag, labelKey: 'admin.nav.pricing' },
  { id: 'messages', icon: Mail, labelKey: 'admin.nav.messages' },
  { id: 'activity', icon: Activity, labelKey: 'admin.nav.activity' },
];

export const AdminPage: React.FC = () => {
  const { t } = useLanguage();
  const [gate, setGate] = useState<Gate>('checking');
  const [panel, setPanel] = useState<PanelId>('dashboard');

  useEffect(() => {
    let active = true;
    void api.session().then((result) => {
      if (!active) return;
      if (result.kind === 'ok') setGate(result.data.admin ? 'admin' : 'anonymous');
      else if (result.kind === 'unavailable') setGate('unavailable');
      else setGate('anonymous');
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    document.title = t('admin.title');
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => {
      meta.remove();
    };
  }, [t]);

  if (gate === 'checking') {
    return (
      <section className="section bg-surface">
        <div className="container mx-auto px-4 md:px-6 flex items-center gap-3 text-neutral-600">
          <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
          {t('admin.checking')}
        </div>
      </section>
    );
  }

  if (gate === 'unavailable') {
    return (
      <section className="section bg-surface">
        <div className="container mx-auto px-4 md:px-6 max-w-2xl">
          <div className="card p-6 flex gap-3 items-start border-amber-300 bg-amber-50">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-amber-700" aria-hidden="true" />
            <div>
              <h1 className="font-semibold text-neutral-900 mb-2">{t('admin.notDeployedTitle')}</h1>
              <p className="text-sm text-neutral-700 leading-relaxed">{t('admin.notDeployedBody')}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (gate === 'anonymous') {
    return <LoginCard onAuthenticated={() => setGate('admin')} />;
  }

  return (
    <div className="bg-surface-muted min-h-[70vh] pt-20 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-12 gap-6">
          <aside className="lg:col-span-3">
            <nav
              className="card p-3 flex flex-row lg:flex-col gap-1 overflow-x-auto lg:sticky lg:top-24"
              aria-label={t('admin.navAria')}
            >
              {panelDefs.map(({ id, icon: Icon, labelKey, label }) => {
                const active = id === panel;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setPanel(id)}
                    aria-current={active ? 'true' : undefined}
                    className={`shrink-0 flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                      active
                        ? 'bg-primary text-white'
                        : 'text-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" />
                    {label || t(labelKey)}
                  </button>
                );
              })}
              <button
                type="button"
                onClick={async () => {
                  await api.logout();
                  setGate('anonymous');
                }}
                className="shrink-0 flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-neutral-600 hover:bg-neutral-100 border-t border-neutral-200 lg:mt-2 lg:rounded-none lg:border-0 lg:pt-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <LogOut className="w-4 h-4" aria-hidden="true" />
                {t('admin.signOut')}
              </button>
            </nav>
          </aside>

          <main className="lg:col-span-9">
            {panel === 'dashboard' ? <DashboardPanel /> : null}
            {panel === 'cms-home' ? <CmsHomePanel /> : null}
            {panel === 'cms-pages' ? <PanelShell title="CMS: Pages"><p className="text-sm text-neutral-600">Pages management API ready. Use CMS endpoints to create/edit custom pages.</p></PanelShell> : null}
            {panel === 'cms-faq' ? <CmsFaqPanel /> : null}
            {panel === 'cms-media' ? <CmsMediaPanel /> : null}
            {panel === 'cms-releases' ? <PanelShell title="CMS: Releases"><p className="text-sm text-neutral-600">Releases management API ready. Manage release entries without editing code.</p></PanelShell> : null}
            {panel === 'reviews' ? <ReviewsPanel /> : null}
            {panel === 'pricing' ? <PricingPanel /> : null}
            {panel === 'messages' ? <MessagesPanel /> : null}
            {panel === 'activity' ? <ActivityPanel /> : null}
          </main>
        </div>
      </div>
    </div>
  );
};

const LoginCard: React.FC<{ onAuthenticated: () => void }> = ({ onAuthenticated }) => {
  const { t } = useLanguage();
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    setError(null);
    const result = await api.login(password);
    setBusy(false);
    if (result.kind === 'ok') {
      setPassword('');
      onAuthenticated();
    } else if (result.kind === 'unavailable') {
      setError(t('admin.notDeployedTitle'));
    } else {
      setError(
        result.error.code === 'rate_limited'
          ? t('admin.rateLimited')
          : t('admin.badCredentials'),
      );
    }
  };

  return (
    <section className="section bg-surface pt-24">
      <div className="container mx-auto px-4 md:px-6">
        <form onSubmit={submit} className="card p-7 max-w-md w-full mx-auto space-y-4">
          <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 text-primary">
            <KeyRound className="w-5 h-5" aria-hidden="true" />
          </span>
          <div>
            <h1 className="text-xl font-bold text-neutral-900 mb-1.5">{t('admin.loginTitle')}</h1>
            <p className="text-sm text-neutral-600 leading-relaxed">{t('admin.loginBody')}</p>
          </div>

          {error ? (
            <p role="alert" className="rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-800">
              {error}
            </p>
          ) : null}

          <div>
            <label htmlFor="admin-password" className="block text-sm font-medium mb-1.5">
              {t('admin.passwordLabel')}
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="field"
              autoComplete="current-password"
              required
            />
          </div>

          <Button variant="primary" size="lg" type="submit" disabled={busy || password.length === 0}>
            {busy ? <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> : null}
            {t('admin.signIn')}
          </Button>
        </form>
      </div>
    </section>
  );
};

const PanelShell: React.FC<{ title: string; children: React.ReactNode; action?: React.ReactNode }> = ({
  title,
  children,
  action,
}) => (
  <section className="card p-6 md:p-7" aria-labelledby="admin-panel-title">
    <header className="flex flex-wrap items-center justify-between gap-3 mb-5">
      <h1 id="admin-panel-title" className="text-lg font-bold text-neutral-900">
        {title}
      </h1>
      {action}
    </header>
    {children}
  </section>
);

const Unavailable: React.FC = () => {
  const { t } = useLanguage();
  return (
    <p className="rounded-xl bg-amber-50 border border-amber-300 p-4 text-sm text-neutral-700">
      {t('admin.backendMissing')}
    </p>
  );
};

const DashboardPanel: React.FC = () => {
  const { t } = useLanguage();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    void api.admin.stats().then((result) => {
      if (!active) return;
      if (result.kind === 'ok') setStats(result.data);
      else setFailed(true);
    });
    return () => {
      active = false;
    };
  }, []);

  if (failed) return <PanelShell title={t('admin.nav.dashboard')}><Unavailable /></PanelShell>;

  const cards = [
    { label: t('admin.stats.pendingReviews'), value: stats?.pendingReviews },
    { label: t('admin.stats.approvedReviews'), value: stats?.approvedReviews },
    { label: t('admin.stats.unreadMessages'), value: stats?.unreadMessages },
    { label: t('admin.stats.pricingUpdated'), value: stats?.pricingUpdatedAt ?? undefined },
  ];

  return (
    <PanelShell title={t('admin.nav.dashboard')}>
      <div className="grid sm:grid-cols-2 gap-4">
        {cards.map((card) => (
          <div key={card.label} className="rounded-xl border border-neutral-200 bg-surface-muted p-5">
            <p className="text-sm text-neutral-500 mb-1.5">{card.label}</p>
            <p className="text-2xl font-bold text-neutral-900">
              {card.value === undefined || card.value === null ? '—' : String(card.value)}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-5 text-sm text-neutral-600 leading-relaxed">{t('admin.dashboardNote')}</p>
    </PanelShell>
  );
};

const reviewFilters: readonly { value: 'pending' | 'approved' | 'rejected'; labelKey: TranslationKey }[] = [
  { value: 'pending', labelKey: 'admin.filter.pending' },
  { value: 'approved', labelKey: 'admin.filter.approved' },
  { value: 'rejected', labelKey: 'admin.filter.rejected' },
];

const ReviewsPanel: React.FC = () => {
  const { t } = useLanguage();
  const [status, setStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [reviews, setReviews] = useState<AdminReview[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    void api.admin.reviews(status).then((result) => {
      if (!active) return;
      if (result.kind === 'ok') {
        setReviews(result.data.reviews);
        setFailed(false);
      } else {
        setFailed(true);
      }
    });
    return () => {
      active = false;
    };
  }, [status]);

  const decide = async (id: string, action: 'approve' | 'reject') => {
    setBusyId(id);
    const result = await api.admin.decideReview(id, action);
    setBusyId(null);
    if (result.kind === 'ok') setReviews((rows) => (rows ?? []).filter((row) => row.id !== id));
  };

  return (
    <PanelShell
      title={t('admin.nav.reviews')}
      action={
        <div className="flex items-center gap-1 bg-neutral-100 rounded-xl p-1">
          {reviewFilters.map(({ value, labelKey }) => (
            <button
              key={value}
              type="button"
              onClick={() => {
                setStatus(value);
                setReviews(null);
              }}
              aria-pressed={status === value}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                status === value ? 'bg-white text-neutral-900 shadow-[var(--shadow-card)]' : 'text-neutral-600'
              }`}
            >
              {t(labelKey)}
            </button>
          ))}
        </div>
      }
    >
      {failed ? (
        <Unavailable />
      ) : reviews === null ? (
        <p className="flex items-center gap-2 text-sm text-neutral-500">
          <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
          {t('admin.loading')}
        </p>
      ) : reviews.length === 0 ? (
        <p className="flex items-center gap-2 text-sm text-neutral-500">
          <Inbox className="w-4 h-4" aria-hidden="true" />
          {t('admin.noReviews')}
        </p>
      ) : (
        <ul className="divide-y divide-neutral-200">
          {reviews.map((review) => (
            <li key={review.id} className="py-4 flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="inline-flex items-center gap-1 font-semibold text-neutral-900">
                  <Star className="w-4 h-4 fill-plan-pro text-plan-pro" aria-hidden="true" />
                  {review.rating}/5
                </span>
                <span className="font-medium text-neutral-900">{review.title}</span>
                <span className="text-neutral-500">{review.email}</span>
              </div>
              <p className="text-sm text-neutral-600 leading-relaxed whitespace-pre-line">
                {review.body}
              </p>
              <div className="flex items-center gap-2">
                <Button variant="primary" onClick={() => decide(review.id, 'approve')} disabled={busyId === review.id}>
                  <ThumbsUp className="w-4 h-4" aria-hidden="true" />
                  {t('admin.approve')}
                </Button>
                <Button variant="secondary" onClick={() => decide(review.id, 'reject')} disabled={busyId === review.id}>
                  <ThumbsDown className="w-4 h-4" aria-hidden="true" />
                  {t('admin.reject')}
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </PanelShell>
  );
};

const PricingPanel: React.FC = () => {
  const { t } = useLanguage();
  const [rows, setRows] = useState<PricingPlanRow[] | null>(null);
  const [note, setNote] = useState('');
  const [failed, setFailed] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    void api.admin.pricing().then((result) => {
      if (!active) return;
      if (result.kind === 'ok') setRows(result.data.plans);
      else setFailed(true);
    });
    return () => {
      active = false;
    };
  }, []);

  const save = async () => {
    if (!rows) return;
    setSaving(true);
    setMessage(null);
    const result = await api.admin.savePricing(rows, note.trim());
    setSaving(false);
    if (result.kind === 'ok') {
      setNote('');
      setMessage(t('admin.pricingSaved'));
    } else {
      setMessage(
        result.kind === 'unavailable'
          ? t('admin.backendMissing')
          : result.error.code === 'invalid'
            ? t('admin.pricingInvalid')
            : t('admin.saveFailed'),
      );
    }
  };

  if (failed) return <PanelShell title={t('admin.nav.pricing')}><Unavailable /></PanelShell>;
  if (!rows) return <PanelShell title={t('admin.nav.pricing')}><Unavailable /></PanelShell>;

  const durations: readonly { id: 'month' | 'quarter' | 'halfYear' | 'year'; labelKey: TranslationKey }[] = [
    { id: 'month', labelKey: 'duration.month' },
    { id: 'quarter', labelKey: 'duration.quarter' },
    { id: 'halfYear', labelKey: 'duration.halfYear' },
    { id: 'year', labelKey: 'duration.year' },
  ];

  return (
    <PanelShell
      title={t('admin.nav.pricing')}
      action={
        <Button variant="primary" onClick={save} disabled={saving}>
          {saving ? <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> : null}
          {t('admin.save')}
        </Button>
      }
    >
      <p className="text-sm text-neutral-600 leading-relaxed mb-5">{t('admin.pricingNote')}</p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <caption className="sr-only">{t('admin.pricingCaption')}</caption>
          <thead>
            <tr className="text-start text-neutral-500 border-b border-neutral-200">
              <th scope="col" className="py-2 pe-3 font-medium">{t('admin.col.plan')}</th>
              {durations.map(({ id, labelKey }) => (
                <th key={id} scope="col" className="py-2 pe-3 font-medium">
                  {t(labelKey)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={row.id} className="border-b border-neutral-100 last:border-0">
                <th scope="row" className="py-3 pe-3 font-semibold text-neutral-900 text-start">
                  {row.name}
                </th>
                {durations.map(({ id }) => (
                  <td key={id} className="py-2 pe-3">
                    <label className="sr-only">{`${row.name} ${id}`}</label>
                    <input
                      type="number"
                      min={0}
                      step={100}
                      value={row[id]}
                      onChange={(event) =>
                        setRows((current) =>
                          (current ?? []).map((entry, index) =>
                            index === rowIndex
                              ? { ...entry, [id]: Number(event.target.value) }
                              : entry,
                          ),
                        )
                      }
                      className="field w-28 py-1.5"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5 space-y-3">
        <div>
          <label htmlFor="pricing-note" className="block text-sm font-medium mb-1.5">
            {t('admin.pricingReason')}
          </label>
          <input
            id="pricing-note"
            value={note}
            onChange={(event) => setNote(event.target.value)}
            className="field"
            maxLength={180}
          />
        </div>
        {message ? (
          <p role="status" className="text-sm text-neutral-700">
            {message}
          </p>
        ) : null}
      </div>
    </PanelShell>
  );
};

const MessagesPanel: React.FC = () => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<AdminMessage[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    void api.admin.messages().then((result) => {
      if (!active) return;
      if (result.kind === 'ok') setMessages(result.data.messages);
      else setFailed(true);
    });
    return () => {
      active = false;
    };
  }, []);

  const markRead = async (id: string) => {
    const result = await api.admin.markMessageRead(id);
    if (result.kind === 'ok') {
      setMessages((rows) =>
        (rows ?? []).map((row) => (row.id === id ? { ...row, read: true } : row)),
      );
    }
  };

  return (
    <PanelShell title={t('admin.nav.messages')}>
      {failed ? (
        <Unavailable />
      ) : !messages ? (
        <p className="flex items-center gap-2 text-sm text-neutral-500">
          <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
          {t('admin.loading')}
        </p>
      ) : messages.length === 0 ? (
        <p className="flex items-center gap-2 text-sm text-neutral-500">
          <Inbox className="w-4 h-4" aria-hidden="true" />
          {t('admin.noMessages')}
        </p>
      ) : (
        <ul className="divide-y divide-neutral-200">
          {messages.map((entry) => (
            <li key={entry.id} className="py-4">
              <div className="flex flex-wrap items-center gap-3 text-sm mb-1.5">
                <span className={`badge ${entry.read ? 'bg-neutral-100 text-neutral-600' : 'bg-plan-pro-light text-plan-pro'}`}>
                  {entry.read ? t('admin.read') : t('admin.unread')}
                </span>
                <span className="font-semibold text-neutral-900">{entry.name}</span>
                <span className="text-neutral-500">{entry.email}</span>
                <span className="text-neutral-500">{entry.topic}</span>
              </div>
              <p className="text-sm text-neutral-600 leading-relaxed whitespace-pre-line mb-3">
                {entry.message}
              </p>
              {!entry.read ? (
                <Button variant="secondary" onClick={() => markRead(entry.id)}>
                  {t('admin.markRead')}
                </Button>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </PanelShell>
  );
};

const ActivityPanel: React.FC = () => {
  const { t } = useLanguage();
  const [entries, setEntries] = useState<ActivityEntry[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    void api.admin.activity().then((result) => {
      if (!active) return;
      if (result.kind === 'ok') setEntries(result.data.entries);
      else setFailed(true);
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <PanelShell title={t('admin.nav.activity')}>
      {failed ? (
        <Unavailable />
      ) : !entries ? (
        <p className="flex items-center gap-2 text-sm text-neutral-500">
          <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
          {t('admin.loading')}
        </p>
      ) : entries.length === 0 ? (
        <p className="text-sm text-neutral-500">{t('admin.noActivity')}</p>
      ) : (
        <ol className="space-y-3">
          {entries.map((entry) => (
            <li key={entry.id} className="flex gap-3 text-sm">
              <Activity className="w-4 h-4 shrink-0 mt-0.5 text-primary" aria-hidden="true" />
              <div>
                <p className="text-neutral-900">
                  <span className="font-medium">{entry.action}</span> — {entry.detail}
                </p>
                <p className="text-xs text-neutral-500">
                  {entry.actor} · {entry.at}
                </p>
              </div>
            </li>
          ))}
        </ol>
      )}
    </PanelShell>
  );
};

export default AdminPage;
