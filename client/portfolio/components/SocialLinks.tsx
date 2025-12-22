import Link from "next/link";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

import { usePortfolioTexts } from "@/client/portfolio/hooks/usePortfolioTexts";
import { buttonClasses } from "@/client/portfolio/theme";
import type { Locale, Theme } from "@/client/portfolio/types";

type Props = {
  email: string;
  github: string;
  linkedin: string;
  locale: Locale;
  theme: Theme;
};

export function SocialLinks(props: Props) {
  const { email, github, linkedin, locale, theme } = props;

  const texts = usePortfolioTexts({ locale, key: "socialLinks" });

  const linkClassName = `p-3 rounded-lg ${buttonClasses[theme]} transition-all`;

  return (
    <div aria-label={texts.aria.listLabel} className="flex gap-3" role="list">
      <a
        aria-label={texts.aria.emailLinkLabel}
        className={linkClassName}
        href={`mailto:${email}`}
        role="listitem"
      >
        <FiMail aria-hidden="true" size={22} />
      </a>

      <Link
        aria-label={texts.aria.githubLinkLabel}
        className={linkClassName}
        href={github}
        rel="noopener noreferrer"
        role="listitem"
        target="_blank"
      >
        <FiGithub aria-hidden="true" size={22} />
      </Link>

      <Link
        aria-label={texts.aria.linkedinLinkLabel}
        className={linkClassName}
        href={linkedin}
        rel="noopener noreferrer"
        role="listitem"
        target="_blank"
      >
        <FiLinkedin aria-hidden="true" size={22} />
      </Link>
    </div>
  );
}
