import { buttonClasses } from "@/client/portfolio/theme";
import type { Locale, Theme } from "@/client/portfolio/types";
import { usePortfolioTexts } from "@/client/portfolio/hooks/usePortfolioTexts";
import { IconButton } from "@/client/ui/components/IconButton";
import { Text } from "@/client/ui/components/Text";

type Props = {
  locale: Locale;
  setLocale: (nextLocale: Locale) => void;
  theme: Theme;
};

export function LocaleToggle(props: Props) {
  const { locale, setLocale, theme } = props;

  const texts = usePortfolioTexts({ locale, key: "navbar" });

  const baseButtonClassName = `transition-all ${buttonClasses[theme]}`;

  return (
    <div
      aria-label={texts.aria.languageToggleLabel}
      className="flex items-center gap-2"
      role="group"
    >
      <IconButton
        aria-label={texts.aria.switchToEnglish}
        aria-pressed={locale === "en"}
        className={`${baseButtonClassName} ${
          locale === "en" ? "ring-2 ring-emerald-400" : ""
        }`}
        icon={
          <Text as="span" variant="bodySm">
            EN
          </Text>
        }
        onClick={() => setLocale("en")}
        variant="ghost"
      />

      <IconButton
        aria-label={texts.aria.switchToPolish}
        aria-pressed={locale === "pl"}
        className={`${baseButtonClassName} ${
          locale === "pl" ? "ring-2 ring-emerald-400" : ""
        }`}
        icon={
          <Text as="span" variant="bodySm">
            PL
          </Text>
        }
        onClick={() => setLocale("pl")}
        variant="ghost"
      />
    </div>
  );
}
