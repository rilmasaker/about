import {
  t,
  usePortfolioTexts,
} from "@/client/portfolio/hooks/usePortfolioTexts";
import type { Locale, Theme } from "@/client/portfolio/types";
import { Text } from "@/client/ui/components/Text";

export const FOOTER_CONTAINER_CLASSNAME_BY_THEME: Record<Theme, string> = {
  dark: "bg-slate-900 border-t border-slate-800",
  light: "bg-stone-100 border-t border-stone-200",
  contrast: "bg-black border-t-2 border-yellow-400",
};

type Props = {
  locale: Locale;
  name: string;
  theme: Theme;
};

const FOOTER_COPYRIGHT_YEAR = 2025;

export function Footer(props: Props) {
  const { locale, name, theme } = props;

  const texts = usePortfolioTexts({ locale, key: "footer" });
  const ariaLabel = texts.aria.contentInfoLabel;
  const copyrightText = t(
    locale,
    // @ts-expect-error - intentional text factory localization
    texts.copyright(FOOTER_COPYRIGHT_YEAR, name),
  );
  const containerClassName = FOOTER_CONTAINER_CLASSNAME_BY_THEME[theme];

  return (
    <footer
      aria-label={ariaLabel}
      className={`${containerClassName} mt-20 py-8`}
      role="contentinfo"
    >
      <div className="mx-auto max-w-7xl px-6 text-center opacity-60">
        <Text align="center" tone="muted" variant="bodySm">
          {copyrightText}
        </Text>
      </div>
    </footer>
  );
}
