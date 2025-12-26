import { Button } from "@/components/ui/button";
import { isIPAddress } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/contexts/ThemeContext";
import { LocaleContext } from "@/contexts/LocaleContext";
import { useTranslation } from "@/lib/i18n";
import { use } from "react";

export function Header() {
  return (
    <div
      className="flex w-full p-4 items-center justify-between
    md:grid md:grid-cols-3 md:gap-4 md:justify-between md:items-center"
    >
      <div className="flex justify-start">
        <LanguageToggle />
      </div>
      <div className="hidden md:flex justify-center">
        <Badge>
          {!isIPAddress(window?.location?.hostname)
            ? window?.location?.hostname
            : "vna is a dev"}
        </Badge>
      </div>
      <div className="flex justify-end">
        <DarkModeToggle />
      </div>
    </div>
  );
}

function DarkModeToggle({ ...props }) {
  const { setTheme, theme } = useTheme();
  return (
    <Switch
      checked={theme === "dark"}
      onCheckedChange={() => {
        setTheme(theme === "dark" ? "light" : "dark");
      }}
      {...props}
    />
  );
}

function LanguageToggle({ ...props }) {
  const { locale, setLocale } = use(LocaleContext);
  const t = useTranslation();

  let flag;
  switch (locale) {
    case "fr":
      flag = "em em-us";
      break;
    case "en":
      flag = "em em-fr";
      break;
    default:
      flag = "em em-pirate_flag";
  }

  return (
    <Button
      aria-label="Toggle french/english"
      size="sm"
      variant="outline"
      onClick={() => setLocale(locale === "en" ? "fr" : "en")}
      {...props}
    >
      <i className={flag + " mr-1"}></i>
      {t.switch_lang}
    </Button>
  );
}
