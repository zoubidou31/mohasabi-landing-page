import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AdminPage } from './AdminPage';
import { LanguageProvider } from '../i18n/LanguageContext';
import { getTranslation } from '../i18n/translations';
import { api } from '../services/api';

vi.mock('../services/api', () => ({
  api: {
    session: vi.fn(),
    login: vi.fn(),
    logout: vi.fn(),
    admin: {
      stats: vi.fn(),
      reviews: vi.fn(),
      decideReview: vi.fn(),
      pricing: vi.fn(),
      savePricing: vi.fn(),
      messages: vi.fn(),
      markMessageRead: vi.fn(),
      activity: vi.fn(),
    },
  },
}));

const mockedApi = vi.mocked(api, { deep: true });
const t = (key: Parameters<typeof getTranslation>[1]) => getTranslation('en', key);

const stats = {
  pendingReviews: 42,
  approvedReviews: 3,
  unreadMessages: 2,
  pricingUpdatedAt: '2026-10-24T10:00:00.000Z',
};

const renderAdmin = () =>
  render(
    <MemoryRouter initialEntries={['/admin']}>
      <LanguageProvider>
        <AdminPage />
      </LanguageProvider>
    </MemoryRouter>,
  );

const signIn = () => {
  fireEvent.change(screen.getByLabelText(t('admin.passwordLabel')), {
    target: { value: 'test-password' },
  });
  fireEvent.click(screen.getByRole('button', { name: t('admin.signIn') }));
};

beforeEach(() => {
  vi.clearAllMocks();
  localStorage.setItem('mohasabi-locale', 'en');
  mockedApi.session.mockResolvedValue({
    kind: 'rejected',
    error: { code: 'unauthorized' },
  });
  mockedApi.login.mockResolvedValue({ kind: 'ok', data: { admin: true } });
  mockedApi.logout.mockResolvedValue({ kind: 'ok', data: { ok: true } });
  mockedApi.admin.stats.mockResolvedValue({ kind: 'unavailable', status: 501 });
});

describe('AdminPage access gate', () => {
  it('shows no admin panel or request before the server confirms the session', async () => {
    renderAdmin();

    expect(await screen.findByRole('heading', { name: t('admin.loginTitle') })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: t('admin.nav.dashboard') })).not.toBeInTheDocument();
    expect(mockedApi.admin.stats).not.toHaveBeenCalled();
    expect(mockedApi.admin.reviews).not.toHaveBeenCalled();
    expect(mockedApi.admin.pricing).not.toHaveBeenCalled();
    expect(mockedApi.admin.messages).not.toHaveBeenCalled();
    expect(mockedApi.admin.activity).not.toHaveBeenCalled();
  });

  it('shows the unavailable state when the backend is not deployed', async () => {
    mockedApi.session.mockResolvedValue({ kind: 'unavailable', status: 501 });
    renderAdmin();

    expect(await screen.findByText(t('admin.notDeployedTitle'))).toBeInTheDocument();
    expect(screen.queryByLabelText(t('admin.passwordLabel'))).not.toBeInTheDocument();
  });

  it('treats an expired or rejected session as anonymous', async () => {
    mockedApi.session.mockResolvedValue({
      kind: 'rejected',
      error: { code: 'unauthorized' },
    });
    renderAdmin();

    expect(await screen.findByRole('heading', { name: t('admin.loginTitle') })).toBeInTheDocument();
  });

  it('adds a noindex robots directive to the admin document', async () => {
    renderAdmin();
    await screen.findByRole('heading', { name: t('admin.loginTitle') });

    const meta = document.head.querySelector('meta[name="robots"]');
    expect(meta?.getAttribute('content')).toBe('noindex, nofollow');
  });
});

describe('AdminPage sign-in', () => {
  it('loads the dashboard statistics only after a successful sign-in', async () => {
    mockedApi.session.mockResolvedValue({ kind: 'ok', data: { admin: false, user: '' } });
    mockedApi.admin.stats.mockResolvedValue({ kind: 'ok', data: stats });
    renderAdmin();

    await screen.findByRole('heading', { name: t('admin.loginTitle') });
    signIn();

    expect(
      await screen.findByRole('heading', { name: t('admin.nav.dashboard') }),
    ).toBeInTheDocument();
    await waitFor(() => expect(mockedApi.admin.stats).toHaveBeenCalledTimes(1));
    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('maps 429 to the rate-limit message without signing in', async () => {
    mockedApi.login.mockResolvedValue({
      kind: 'rejected',
      error: { code: 'rate_limited' },
    });
    renderAdmin();

    await screen.findByRole('heading', { name: t('admin.loginTitle') });
    signIn();

    expect(await screen.findByRole('alert')).toHaveTextContent(t('admin.rateLimited'));
    expect(screen.queryByRole('heading', { name: t('admin.nav.dashboard') })).not.toBeInTheDocument();
  });

  it('shows a generic message for wrong credentials', async () => {
    mockedApi.login.mockResolvedValue({
      kind: 'rejected',
      error: { code: 'invalid' },
    });
    renderAdmin();

    await screen.findByRole('heading', { name: t('admin.loginTitle') });
    signIn();

    expect(await screen.findByRole('alert')).toHaveTextContent(t('admin.badCredentials'));
  });

  it('keeps protected data hidden when an admin request returns 401', async () => {
    mockedApi.session.mockResolvedValue({ kind: 'ok', data: { admin: true, user: 'admin' } });
    mockedApi.admin.stats.mockResolvedValue({
      kind: 'rejected',
      error: { code: 'unauthorized' },
    });
    renderAdmin();

    expect(await screen.findByText(t('admin.backendMissing'))).toBeInTheDocument();
    expect(screen.queryByText('42')).not.toBeInTheDocument();
  });

  it('returns to the login screen after logout', async () => {
    mockedApi.session.mockResolvedValue({ kind: 'ok', data: { admin: true, user: 'admin' } });
    renderAdmin();

    await screen.findByRole('heading', { name: t('admin.nav.dashboard') });
    fireEvent.click(screen.getByRole('button', { name: t('admin.signOut') }));

    await waitFor(() => expect(mockedApi.logout).toHaveBeenCalledTimes(1));
    expect(await screen.findByRole('heading', { name: t('admin.loginTitle') })).toBeInTheDocument();
  });
});
