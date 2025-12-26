import React, { createContext } from "react";
import type { Lng } from "@/lib/i18n";
import config from "@/config";

export type LocaleContextType = {
  locale: Lng;
  setLocale: React.Dispatch<React.SetStateAction<Lng>>;
};

export const LocaleContext = createContext<LocaleContextType>({
  // default value does't matter it will be overiden by provider
  locale: config.default_lng as Lng,
  // noop setter - should be replaced by provider
  setLocale: () => {},
});
