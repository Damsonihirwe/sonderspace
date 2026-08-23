'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({ light: false, toggle: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [light, setLight] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem('sonderspace-theme');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    const nextLight = saved ? saved === 'light' : prefersLight;
    setLight(nextLight);
    document.documentElement.classList.toggle('theme-light', nextLight);
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.classList.toggle('theme-light', light);
    window.localStorage.setItem('sonderspace-theme', light ? 'light' : 'dark');
  }, [light]);

  return <ThemeContext.Provider value={{ light, toggle: () => setLight((current) => !current) }}><div data-theme={light ? 'light' : 'dark'}>{children}</div></ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
