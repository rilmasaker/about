import Image from "next/image";

import { SocialLinks } from "@/client/portfolio/components/SocialLinks";
import { accentClasses, cardClasses } from "@/client/portfolio/theme";
import type { AboutData, Locale, Theme } from "@/client/portfolio/types";
import { Text } from "@/client/ui/components/Text";
import {
  t,
  usePortfolioTexts,
} from "@/client/portfolio/hooks/usePortfolioTexts";

type Props = {
  about: AboutData;
  locale: Locale;
  theme: Theme;
};

const ABOUT_CARD_HEADING_ID = "about-heading";
const PROFILE_IMAGE_SIZES = "176px";

export function AboutCard(props: Props) {
  const { about, locale, theme } = props;

  const texts = usePortfolioTexts({ locale, key: "aboutCard" });

  const title = t(locale, about.title);
  const description = t(locale, about.description);

  const sectionAriaLabel = texts.aria.sectionLabel;
  // @ts-expect-error - intentional text factory localization
  const profileImageAlt = t(locale, texts.image.profileAlt(about.name));
  return (
    <section
      aria-label={sectionAriaLabel}
      aria-labelledby={ABOUT_CARD_HEADING_ID}
      className={`${cardClasses[theme]} border rounded-2xl p-8 lg:h-140`}
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:justify-between">
        <div className="min-w-0 flex-1">
          <Text
            className={accentClasses[theme]}
            id={ABOUT_CARD_HEADING_ID}
            variant="h3"
          >
            {about.name}
          </Text>

          <Text className="mt-2" tone="muted" variant="subtitle">
            {title}
          </Text>

          <Text className="mt-4" tone="muted" variant="body">
            {description}
          </Text>

          <div className="mt-6">
            <SocialLinks
              email={about.email}
              github={about.github}
              linkedin={about.linkedin}
              theme={theme}
              locale={locale}
            />
          </div>
        </div>

        <div className="shrink-0">
          <div className="relative h-36 w-36 overflow-hidden rounded-xl shadow-lg sm:h-40 sm:w-40 lg:h-44 lg:w-44">
            <Image
              alt={profileImageAlt}
              className="object-cover"
              fill
              priority
              sizes={PROFILE_IMAGE_SIZES}
              src={about.image}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
