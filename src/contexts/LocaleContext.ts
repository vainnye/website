import React, { createContext, useContext } from "react";
import type { Lng } from "@/lib/i18n";
import config from "@/config";

export type LocaleContextType = {
  locale: Lng;
  setLocale: React.Dispatch<React.SetStateAction<Lng>>;
};

export const LocaleContext = createContext<LocaleContextType>({
  locale: config.default_lng as Lng,
  // noop setter - should be replaced by provider
  setLocale: () => {},
});

// hook to access the locale context
export function useLocale(): LocaleContextType {
  return useContext(LocaleContext);
}
