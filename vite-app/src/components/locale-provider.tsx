import React, { useState, useEffect } from "react";
import type { Lng } from "@/lib/i18n";
import { LocaleContext } from "@/contexts/locale-context";

/**
 * LocaleProvider
 *
 * This file intentionally exports only React components so that React Fast Refresh
 * can operate without ESLint warnings from `react-refresh/only-export-components`.
 */
export function LocaleProvider({
  defaultLng,
  children,
}: {
  defaultLng: Lng;
  children: React.ReactNode;
}) {
  const [locale, setLocale] = useState<Lng>(() => {
    const stored = (localStorage.getItem("locale") || defaultLng) as Lng;
    return stored;
  });

  useEffect(() => {
    try {
      localStorage.setItem("locale", locale);
    } catch {
      // ignore localStorage errors (e.g. storage disabled)
    }
  }, [locale]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}
