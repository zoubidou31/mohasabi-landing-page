import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Settings } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import type { Locale } from '../../i18n/translations';

/**
 * Header settings menu. Keyboard contract: Escape closes and restores focus to
 * the trigger, ArrowDown/ArrowUp cycle the radio items, Home/End jump to the
 * ends, and Tab leaves the menu the way a native menu would.
 */
export const SettingsMenu: React.FC = () => {
  const { t, locale, setLocale, availableLocales, localeNames } = useLanguage();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const close = useCallback((restoreFocus: boolean) => {
    setOpen(false);
    if (restoreFocus) triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close(true);
      }
    };
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) close(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onPointerDown);
    itemRefs.current[availableLocales.indexOf(locale)]?.focus();
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onPointerDown);
    };
  }, [open, close, locale, availableLocales]);

  const moveFocus = (from: number, delta: number) => {
    const next = (from + delta + availableLocales.length) % availableLocales.length;
    itemRefs.current[next]?.focus();
  };

  const handleItemKeyDown = (index: number) => (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault();
      moveFocus(index, 1);
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault();
      moveFocus(index, -1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      itemRefs.current[0]?.focus();
    } else if (event.key === 'End') {
      event.preventDefault();
      itemRefs.current[availableLocales.length - 1]?.focus();
    }
  };

  const pick = (next: Locale) => {
    setLocale(next);
    close(true);
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={triggerRef}
        id="settings-trigger"
        type="button"
        onClick={() => setOpen((value) => !value)}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown') {
            event.preventDefault();
            setOpen(true);
          }
        }}
        className="p-2 rounded-lg text-neutral-600 hover:text-primary hover:bg-primary-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="settings-menu"
        aria-label={t('settings.ariaLabel')}
        title={t('settings.ariaLabel')}
      >
        <Settings className="w-5 h-5" aria-hidden="true" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="settings-menu"
            role="menu"
            tabIndex={-1}
            aria-labelledby="settings-trigger"
            className="absolute end-0 top-full mt-2 w-56 card p-2 z-50"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="px-3 pt-2 pb-1 text-xs font-semibold uppercase tracking-wide text-neutral-500">
              {t('settings.languageTitle')}
            </p>
            {availableLocales.map((candidate, index) => {
              const selected = candidate === locale;
              return (
                <button
                  key={candidate}
                  ref={(node) => {
                    itemRefs.current[index] = node;
                  }}
                  type="button"
                  role="menuitemradio"
                  aria-checked={selected}
                  tabIndex={-1}
                  onClick={() => pick(candidate)}
                  onKeyDown={handleItemKeyDown(index)}
                  className={`w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                    selected
                      ? 'bg-primary-light text-primary font-semibold'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  {localeNames[candidate]}
                  {selected ? <Check className="w-4 h-4" aria-hidden="true" /> : null}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
