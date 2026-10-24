import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ReviewsPage } from './ReviewsPage';
import { LanguageProvider } from '../i18n/LanguageContext';
import { getTranslation, type TranslationKey } from '../i18n/translations';
import { api, type PublicReview } from '../services/api';

vi.mock('../services/api', () => ({
  api: { listReviews: vi.fn(), submitReview: vi.fn() },
}));

const mockedApi = vi.mocked(api, { deep: true });
const t = (key: TranslationKey) => getTranslation('en', key);

const approvedReview: PublicReview = {
  id: 'r1',
  displayName: 'Amina',
  rating: 5,
  title: 'Excellent for daily invoices',
  body: 'The application keeps my invoices organised without an internet connection.',
  publishedAt: '2026-10-01T09:00:00.000Z',
};

const reviewWithPrivateEmail = {
  ...approvedReview,
  email: 'private@example.com',
} as unknown as PublicReview;

const renderPage = () =>
  render(
    <MemoryRouter initialEntries={['/reviews']}>
      <LanguageProvider>
        <ReviewsPage />
      </LanguageProvider>
    </MemoryRouter>,
  );

const fillValidReview = () => {
  fireEvent.change(screen.getByLabelText(t('reviews.emailLabel')), {
    target: { value: 'user@example.com' },
  });
  fireEvent.change(screen.getByLabelText(t('reviews.titleLabel')), {
    target: { value: 'Great tool' },
  });
  fireEvent.change(screen.getByLabelText(t('reviews.bodyLabel')), {
    target: { value: 'It saves me time every week when I prepare customer invoices.' },
  });
  fireEvent.click(screen.getAllByRole('radio')[4]);
  fireEvent.click(screen.getByRole('checkbox'));
};

const submit = () =>
  fireEvent.click(screen.getByRole('button', { name: t('reviews.submit') }));

beforeEach(() => {
  vi.clearAllMocks();
  localStorage.setItem('mohasabi-locale', 'en');
  mockedApi.listReviews.mockResolvedValue({ kind: 'ok', data: { reviews: [approvedReview] } });
  mockedApi.submitReview.mockResolvedValue({ kind: 'ok', data: { status: 'pending' } });
});

describe('ReviewsPage public list', () => {
  it('renders only the approved reviews returned by the API', async () => {
    renderPage();

    expect(await screen.findByText('Excellent for daily invoices')).toBeInTheDocument();
    expect(screen.getByText(/Amina/)).toBeInTheDocument();
    expect(
      screen.getByRole('img', {
        name: t('reviews.starsAria').replace('{rating}', '5'),
      }),
    ).toBeInTheDocument();
  });

  it('never renders an email address even if the API payload carries one', async () => {
    mockedApi.listReviews.mockResolvedValue({
      kind: 'ok',
      data: { reviews: [reviewWithPrivateEmail] },
    });
    renderPage();

    await screen.findByText('Excellent for daily invoices');
    expect(screen.queryByText('private@example.com')).not.toBeInTheDocument();
  });

  it('shows the empty state when no review is approved yet', async () => {
    mockedApi.listReviews.mockResolvedValue({ kind: 'ok', data: { reviews: [] } });
    renderPage();

    expect(await screen.findByText(t('reviews.emptyTitle'))).toBeInTheDocument();
  });

  it('shows an honest unavailable message when the service cannot be reached', async () => {
    mockedApi.listReviews.mockResolvedValue({ kind: 'unavailable', status: 501 });
    renderPage();

    expect(await screen.findByText(t('reviews.serviceDown'))).toBeInTheDocument();
  });
});

describe('ReviewsPage submission', () => {
  it('validates every required field before calling the API', async () => {
    renderPage();
    await screen.findByText('Excellent for daily invoices');
    submit();

    const alert = screen.getByRole('alert');
    for (const key of [
      'reviews.error.email',
      'reviews.error.rating',
      'reviews.error.title',
      'reviews.error.body',
      'reviews.error.consent',
    ] as const) {
      expect(within(alert).getByText(t(key))).toBeInTheDocument();
    }
    expect(mockedApi.submitReview).not.toHaveBeenCalled();
  });

  it('keeps a submitted review out of the public list until it is approved', async () => {
    renderPage();
    await screen.findByText('Excellent for daily invoices');
    fillValidReview();
    submit();

    await waitFor(() => expect(mockedApi.submitReview).toHaveBeenCalledTimes(1));
    expect(mockedApi.submitReview).toHaveBeenCalledWith({
      email: 'user@example.com',
      displayName: '',
      rating: 5,
      title: 'Great tool',
      body: 'It saves me time every week when I prepare customer invoices.',
      consent: true,
      website: '',
    });
    expect(await screen.findByRole('status')).toHaveTextContent(t('reviews.queued'));
    expect(screen.queryByText('Great tool')).not.toBeInTheDocument();
    expect(screen.getByLabelText(t('reviews.emailLabel'))).toHaveValue('');
  });

  it('explains a duplicate review rejection', async () => {
    mockedApi.submitReview.mockResolvedValue({
      kind: 'rejected',
      error: { code: 'duplicate' },
    });
    renderPage();
    await screen.findByText('Excellent for daily invoices');
    fillValidReview();
    submit();

    expect(await screen.findByRole('alert')).toHaveTextContent(t('reviews.duplicate'));
  });

  it('offers the WhatsApp fallback when the service is unavailable', async () => {
    mockedApi.submitReview.mockResolvedValue({ kind: 'unavailable', status: 501 });
    renderPage();
    await screen.findByText('Excellent for daily invoices');
    fillValidReview();
    submit();

    expect(await screen.findByRole('alert')).toHaveTextContent(t('reviews.unavailable'));
    expect(screen.getByRole('link', { name: t('reviews.whatsappFallback') })).toHaveAttribute(
      'href',
      expect.stringContaining('wa.me/213674947157'),
    );
  });
});
