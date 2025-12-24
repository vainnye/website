import config from "@/config";
import { useMemo } from "react";
import { useLocale } from "@/contexts/locale-context";

export type Lng = (typeof config.lngs)[number];
type I18n = Record<Lng, string>;
export type ContentKeys = keyof typeof config.content;
export type Translations = { [K in ContentKeys]: string };

export function createTranslatorProxy(lng: Lng): Translations {
  const handler: ProxyHandler<Record<string, I18n>> = {
    get(target, prop) {
      if (typeof prop !== "string") return "" as string;

      if (!(prop in target)) {
        console.error(`Missing translation key: content.${String(prop)}`);
        return "";
      }

      const value = target[prop] as I18n;
      if (lng in value) return value[lng];

      // fallback to default language if available
      if (config.default_lng in value) {
        console.warn(
          `Missing translation for '${lng}' in content.${String(
            prop,
          )}; falling back to '${config.default_lng}'.`,
        );
        return value[config.default_lng];
      }

      console.error(
        `Missing translation for '${lng}' in content.${String(prop)}`,
      );
      return "";
    },
  };

  const proxy = new Proxy(
    config.content as unknown as Record<string, I18n>,
    handler,
  );

  return proxy as unknown as Translations;
}

export function useTranslation(): Translations {
  const { locale } = useLocale();
  return useMemo(() => createTranslatorProxy(locale), [locale]);
}
