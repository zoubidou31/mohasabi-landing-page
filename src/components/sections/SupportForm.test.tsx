import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { SupportForm } from './SupportForm';
import { LanguageProvider } from '../../i18n/LanguageContext';
import { getTranslation, type TranslationKey } from '../../i18n/translations';
import { api } from '../../services/api';

vi.mock('../../services/api', () => ({
  api: { submitSupport: vi.fn() },
}));

const mockedApi = vi.mocked(api, { deep: true });
const t = (key: TranslationKey) => getTranslation('en', key);

const topics = [
  { value: 'install', labelKey: 'support.req.install' as const },
  { value: 'other', labelKey: 'support.req.other' as const },
];

const renderForm = () =>
  render(
    <LanguageProvider>
      <SupportForm topics={topics} />
    </LanguageProvider>,
  );

const fillValid = () => {
  fireEvent.change(screen.getByLabelText(t('support.form.name')), { target: { value: 'Amina' } });
  fireEvent.change(screen.getByLabelText(t('support.form.email')), {
    target: { value: 'amina@example.com' },
  });
  fireEvent.change(screen.getByLabelText(t('support.form.message')), {
    target: { value: 'I cannot activate the licence after installing the application.' },
  });
};

const submit = () =>
  fireEvent.click(screen.getByRole('button', { name: t('support.form.submit') }));

beforeEach(() => {
  vi.clearAllMocks();
  localStorage.setItem('mohasabi-locale', 'en');
  mockedApi.submitSupport.mockResolvedValue({ kind: 'ok', data: { status: 'queued' } });
});

describe('SupportForm', () => {
  it('blocks an empty submission with field errors and no request', () => {
    renderForm();
    submit();

    const alert = screen.getByRole('alert');
    expect(within(alert).getByText(t('support.form.errorName'))).toBeInTheDocument();
    expect(within(alert).getByText(t('support.form.errorEmail'))).toBeInTheDocument();
    expect(within(alert).getByText(t('support.form.errorMessage'))).toBeInTheDocument();
    expect(mockedApi.submitSupport).not.toHaveBeenCalled();
  });

  it('sends trimmed values and confirms the queued request', async () => {
    renderForm();
    fillValid();
    submit();

    await waitFor(() => expect(mockedApi.submitSupport).toHaveBeenCalledTimes(1));
    expect(mockedApi.submitSupport).toHaveBeenCalledWith({
      name: 'Amina',
      email: 'amina@example.com',
      topic: 'install',
      version: '',
      message: 'I cannot activate the licence after installing the application.',
      website: '',
    });
    expect(await screen.findByRole('status')).toHaveTextContent(t('support.form.queued'));
    expect(screen.getByLabelText(t('support.form.name'))).toHaveValue('');
  });

  it('keeps the form open when the service is unavailable', async () => {
    mockedApi.submitSupport.mockResolvedValue({ kind: 'unavailable', status: 501 });
    renderForm();
    fillValid();
    submit();

    expect(await screen.findByRole('alert')).toHaveTextContent(t('support.form.unavailable'));
    expect(screen.getByLabelText(t('support.form.name'))).toHaveValue('Amina');
  });

  it('shows a specific message when the server rate-limits the request', async () => {
    mockedApi.submitSupport.mockResolvedValue({
      kind: 'rejected',
      error: { code: 'rate_limited' },
    });
    renderForm();
    fillValid();
    submit();

    expect(await screen.findByRole('alert')).toHaveTextContent(t('support.form.rateLimited'));
  });

  it('silently accepts honeypot submissions without calling the API', () => {
    const { container } = renderForm();
    const honeypot = container.querySelector<HTMLInputElement>('#support-website');
    expect(honeypot).not.toBeNull();
    fireEvent.change(honeypot as HTMLInputElement, { target: { value: 'https://spam.example' } });
    submit();

    expect(screen.getByRole('status')).toHaveTextContent(t('support.form.queued'));
    expect(mockedApi.submitSupport).not.toHaveBeenCalled();
  });
});
