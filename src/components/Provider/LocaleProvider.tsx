import React, { useState, useEffect } from "react";
import { isSupportedLang, type Lng } from "@/lib/i18n";
import { LocaleContext } from "@/contexts/LocaleContext";
import config from "@/config";

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const langParam = new URLSearchParams(window.location.search).get("lang");
  const langStored = localStorage.getItem("locale");

  const [locale, setLocale] = useState<Lng>(
    isSupportedLang(langParam)
      ? langParam
      : isSupportedLang(langStored)
        ? langStored
        : config.default_lng,
  );

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
