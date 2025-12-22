import { LocaleToggle } from "@/client/portfolio/components/LocaleToggle";
import { ThemeToggle } from "@/client/portfolio/components/ThemeToggle";
import { usePortfolioTexts } from "@/client/portfolio/hooks/usePortfolioTexts";
import { accentClasses, getNavBg } from "@/client/portfolio/theme";
import type { Locale, Theme } from "@/client/portfolio/types";
import { Text } from "@/client/ui/components/Text";

type Props = {
  locale: Locale;
  name: string;
  setLocale: (nextLocale: Locale) => void;
  setTheme: (nextTheme: Theme) => void;
  theme: Theme;
};

export function Navbar(props: Props) {
  const { locale, name, setLocale, setTheme, theme } = props;

  const texts = usePortfolioTexts({ locale, key: "navbar" });

  return (
    <nav
      aria-label={texts.aria.primaryNavigationLabel}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-opacity-90"
      role="navigation"
      style={{ backgroundColor: getNavBg(theme) }}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center gap-4">
        <Text className={`${accentClasses[theme]} font-bold`} variant="h4">
          {name}
        </Text>

        <div className="flex items-center gap-3">
          <LocaleToggle locale={locale} setLocale={setLocale} theme={theme} />
          <ThemeToggle locale={locale} setTheme={setTheme} theme={theme} />
        </div>
      </div>
    </nav>
  );
}
