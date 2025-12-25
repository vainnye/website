import { useTranslation } from "@/lib/i18n";

export function Footer() {
  const t = useTranslation();

  return (
    <footer className="flex flex-col gap-4 justify-center items-center py-4 px-4 md:py-10 md:px-10 lg:px-50 xl:px-80">
      <p className="text-muted-foreground text-center text-sm sm:text-base md:text-lg font-medium leading-relaxed">
        {t.copyright}
      </p>
    </footer>
  );
}
