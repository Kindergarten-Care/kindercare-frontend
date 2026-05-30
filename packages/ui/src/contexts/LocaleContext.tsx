'use client';

import React, { createContext, useContext, useState, useCallback, useMemo, ReactNode } from 'react';
import viJson from '../../../resource/locales/vi.json';
import enJson from '../../../resource/locales/en.json';

type Locale = 'vi' | 'en';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

const translations: Record<Locale, typeof viJson> = {
  vi: viJson,
  en: enJson,
};

const getNestedValue = (obj: Record<string, unknown>, path: string): string => {
  const keys = path.split('.');
  let current: unknown = obj;
  for (const key of keys) {
    if (current === null || current === undefined) return path;
    current = (current as Record<string, unknown>)[key];
  }
  return typeof current === 'string' ? current : path;
};

export interface LocaleProviderProps {
  children: ReactNode;
  defaultLocale?: Locale;
}

export function LocaleProvider({
  children,
  defaultLocale = 'vi',
}: LocaleProviderProps): React.ReactElement {
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  React.useEffect(() => {
    if (defaultLocale) {
      setLocale(defaultLocale);
    }
  }, [defaultLocale]);

  const t = useCallback(
    (key: string): string => {
      const translationSet = translations[locale] as unknown as Record<string, unknown>;
      return getNestedValue(translationSet, key);
    },
    [locale],
  );

  const contextValue = useMemo<LocaleContextType>(
    () => ({ locale, setLocale, t }),
    [locale, t],
  );

  return (
    <LocaleContext.Provider value={contextValue}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useTranslation(): LocaleContextType {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LocaleProvider');
  }
  return context;
}
