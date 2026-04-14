import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type ThemeSkin = 'graphite' | 'porcelain' | 'aurora';

export interface ThemeOption {
  key: ThemeSkin;
  label: string;
  chip: string;
}

const STORAGE_KEY = 'wp-admin-theme-skin';

const THEME_OPTIONS: ThemeOption[] = [
  { key: 'graphite', label: 'Graphite Gold', chip: '深色金属' },
  { key: 'porcelain', label: 'Porcelain Ledger', chip: '浅色瓷白' },
  { key: 'aurora', label: 'Aurora Pulse', chip: '极光霓虹' },
];

interface ThemeContextValue {
  theme: ThemeSkin;
  setTheme: (theme: ThemeSkin) => void;
  options: ThemeOption[];
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeSkin>('aurora');

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as ThemeSkin | null;
    if (saved && THEME_OPTIONS.some((option) => option.key === saved)) {
      setTheme(saved);
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      options: THEME_OPTIONS,
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeSkin() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeSkin must be used within ThemeProvider');
  }
  return context;
}

