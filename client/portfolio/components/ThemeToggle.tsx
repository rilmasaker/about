import { FiMoon } from "react-icons/fi";
import { MdContrast } from "react-icons/md";

import { usePortfolioTexts } from "@/client/portfolio/hooks/usePortfolioTexts";
import { buttonClasses } from "@/client/portfolio/theme";
import type { Locale, Theme } from "@/client/portfolio/types";
import { IconButton } from "@/client/ui/components/IconButton";

type Props = {
  locale: Locale;
  setTheme: (nextTheme: Theme) => void;
  theme: Theme;
};

export function ThemeToggle(props: Props) {
  const { locale, setTheme, theme } = props;

  const texts = usePortfolioTexts({ locale, key: "themeToggle" });

  const baseButtonClassName = `transition-all ${buttonClasses[theme]}`;

  return (
    <div
      aria-label={texts.aria.groupLabel}
      className="flex items-center gap-3"
      role="group"
    >
      <IconButton
        aria-label={texts.aria.switchToDark}
        aria-pressed={theme === "dark"}
        className={`${baseButtonClassName} ${
          theme === "dark" ? "ring-2 ring-emerald-400" : ""
        }`}
        icon={<FiMoon aria-hidden="true" size={20} />}
        onClick={() => setTheme("dark")}
        variant="ghost"
      />

      <IconButton
        aria-label={texts.aria.switchToContrast}
        aria-pressed={theme === "contrast"}
        className={`${baseButtonClassName} ${
          theme === "contrast" ? "ring-2 ring-yellow-400" : ""
        }`}
        icon={<MdContrast aria-hidden="true" size={20} />}
        onClick={() => setTheme("contrast")}
        variant="ghost"
      />
    </div>
  );
}
