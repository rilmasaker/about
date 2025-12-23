import type { AboutData, Locale, WorkExperience } from "./types";

export const aboutData: AboutData = {
  name: "Marcin Wydra",
  title: {
    en: "Senior Frontend / Full Stack Developer",
    pl: "Senior Frontend / Full Stack Developer",
  },
  description: {
    en: "I’m a full-stack developer with 7+ years of experience. I build accessible, fast, and polished web apps with React, TypeScript, and Node.js. I’ve worked on high-traffic platforms, internal workflow portals, and products in demanding domains. I deliver features end-to-end — from implementation and refactors to testing, deployments, and stakeholder collaboration. In my free time I play chess, enjoy cooking, and recently got into making homemade cured meats. In Uganda, I helped build an educational center with a playground and a well for the local community. In Kathmandu, I started a chess club and taught programming.",
    pl: "Jestem full-stack developerem z ponad 7-letnim doświadczeniem. Tworzę dostępne, szybkie i dopracowane aplikacje webowe w React, TypeScript oraz Node.js. Pracowałem przy serwisach o dużym ruchu, portalach wspierających procesy wewnętrzne oraz aplikacjach w wymagających domenach. Dostarczam funkcje end-to-end: od implementacji i refaktorów po testy, wdrożenia i współpracę ze stakeholderami. W wolnym czasie gram w szachy, lubię gotować i ostatnio wkręciłem się w domowy wyrób wędlin. W Ugandzie współtworzyłem centrum edukacyjne z placem zabaw oraz studnię dla lokalnej społeczności. W Katmandu założyłem klub szachowy, uczyłem programowania i stworzyłem miejsca pracy dla moich uczniów.",
  },
  image: "/MarcinWydra.jpg",
  email: "marcin.wydra@gmail.com",
  github: "https://github.com/rilmasaker",
  linkedin: "https://www.linkedin.com/in/marcin-wydra-12ab2a239/",
};

export const portfolioTexts = {
  aboutCard: {
    aria: {
      sectionLabel: {
        en: "About section",
        pl: "Sekcja: O mnie",
      },
    },
    image: {
      profileAlt: (name: string) => ({
        en: `Profile photo of ${name}`,
        pl: `Zdjęcie profilowe: ${name}`,
      }),
    },
  },
  experienceSection: {
    aria: {
      sectionLabel: {
        en: "Experience section",
        pl: "Sekcja: Doświadczenie",
      },
    },
    heading: {
      en: "Experience",
      pl: "Doświadczenie",
    },
  },
  footer: {
    aria: {
      contentInfoLabel: {
        en: "Site footer",
        pl: "Stopka strony",
      },
    },

    copyright: (year: number, name: string) => ({
      en: `© ${year} ${name}. All rights reserved.`,
      pl: `© ${year} ${name}. Wszelkie prawa zastrzeżone.`,
    }),

    license: {
      title: {
        en: "MIT License",
        pl: "Licencja MIT",
      },

      notice: (year: number, name: string) => ({
        en: `MIT License\n\nCopyright (c) ${year} ${name}`,
        pl: `MIT License\n\nCopyright (c) ${year} ${name}`,
      }),
    },
  },
  globeCard: {
    aria: {
      cardLabel: {
        en: "Project locations globe",
        pl: "Kula ziemska z lokalizacjami projektów",
      },
    },
    heading: {
      en: "Project locations",
      pl: "Lokalizacje projektów",
    },
    loading: {
      globeAriaLabel: {
        en: "Loading globe",
        pl: "Ładowanie kuli ziemskiej",
      },
    },
  },
  navbar: {
    language: {
      label: {
        en: "Language",
        pl: "Język",
      },
      options: {
        en: { en: "English", pl: "Angielski" },
        pl: { en: "Polish", pl: "Polski" },
      },
    },
    aria: {
      primaryNavigationLabel: {
        en: "Primary navigation",
        pl: "Główna nawigacja",
      },
      languageToggleLabel: {
        en: "Language switcher",
        pl: "Przełącznik języka",
      },
      switchToEnglish: {
        en: "Switch language to English",
        pl: "Przełącz język na angielski",
      },
      switchToPolish: {
        en: "Switch language to Polish",
        pl: "Przełącz język na polski",
      },
    },
  },
  perfectCircleGameCard: {
    aria: {
      canvasLabel: {
        en: "Perfect circle drawing canvas",
        pl: "Płótno do rysowania idealnego koła",
      },
      drawingAreaLabel: {
        en: "Perfect circle drawing area",
        pl: "Obszar do rysowania idealnego koła",
      },
      sectionLabel: {
        en: "Perfect circle game",
        pl: "Gra: idealne koło",
      },
    },

    bestLabel: {
      en: "Best:",
      pl: "Najlepszy wynik:",
    },

    heading: {
      en: "Take a break",
      pl: "Zrób sobie przerwę",
    },

    hint: {
      en: "Tap / click.",
      pl: "Dotknij / kliknij",
    },

    scoreOutOf: (maxScore: number) => ({
      en: `/ ${maxScore}`,
      pl: `/ ${maxScore}`,
    }),

    messages: [
      {
        minScore: 95,
        text: { en: "Perfect! 🎉", pl: "Perfekcyjnie! 🎉" } satisfies Record<
          Locale,
          string
        >,
      },
      {
        minScore: 90,
        text: { en: "Amazing! 🌟", pl: "Rewelacja! 🌟" } satisfies Record<
          Locale,
          string
        >,
      },
      {
        minScore: 75,
        text: {
          en: "Great job! 👏",
          pl: "Świetna robota! 👏",
        },
      },
      {
        minScore: 50,
        text: { en: "Nice! 👍", pl: "Nieźle! 👍" } satisfies Record<
          Locale,
          string
        >,
      },
      {
        minScore: 0,
        text: {
          en: "Try again! 💪",
          pl: "Spróbuj ponownie! 💪",
        },
      },
    ],
  },
  projectCard: {
    aria: {
      activateProjectOnMap: (projectTitle: string) => ({
        en: `Activate project on the map: ${projectTitle}`,
        pl: `Aktywuj projekt na mapie: ${projectTitle}`,
      }),

      articleLabel: (projectTitle: string) => ({
        en: `Project: ${projectTitle}`,
        pl: `Projekt: ${projectTitle}`,
      }),

      openProjectInNewTab: (projectTitle: string) => ({
        en: `Open ${projectTitle} in a new tab`,
        pl: `Otwórz ${projectTitle} w nowej karcie`,
      }),

      projectScreenshotAlt: (projectTitle: string) => ({
        en: `Project screenshot: ${projectTitle}`,
        pl: `Zrzut ekranu projektu: ${projectTitle}`,
      }),

      technologiesListLabel: {
        en: "Technologies used in this project",
        pl: "Technologie użyte w tym projekcie",
      },
    },
  },
  socialLinks: {
    aria: {
      emailLinkLabel: {
        en: "Send an email",
        pl: "Wyślij e-mail",
      },

      githubLinkLabel: {
        en: "Open GitHub profile in a new tab",
        pl: "Otwórz profil GitHub w nowej karcie",
      },

      linkedinLinkLabel: {
        en: "Open LinkedIn profile in a new tab",
        pl: "Otwórz profil LinkedIn w nowej karcie",
      },

      listLabel: {
        en: "Social links",
        pl: "Linki społecznościowe",
      },
    },
  },
  themeToggle: {
    aria: {
      groupLabel: {
        en: "Theme switcher",
        pl: "Przełącznik motywu",
      },

      switchToContrast: {
        en: "Switch to high contrast theme",
        pl: "Przełącz na motyw wysokiego kontrastu",
      },

      switchToDark: {
        en: "Switch to dark theme",
        pl: "Przełącz na motyw ciemny",
      },
    },
  },
  workBlock: {
    aria: {
      openProjectCard: (projectTitle: string) => ({
        en: `Open project: ${projectTitle}`,
        pl: `Otwórz projekt: ${projectTitle}`,
      }),
    },
  },
} as const;

export const workExperience: WorkExperience[] = [
  {
    company: "Astek (client: Roche)",
    position: {
      en: "Junior Frontend Developer",
      pl: "Junior Frontend Developer",
    },
    period: "2018 - 2019",
    projects: [
      {
        image: "/consultant.jpg",
        link: "https://astek.pl/",
        title: {
          en: "Consultant Management System",
          pl: "System zarządzania konsultantami",
        },
        period: "1 month",
        description: {
          en: "Worked on a larger React app for consultant management: dashboards, filtering, forms, and robust UI patterns for internal operations.",
          pl: "Praca nad większą aplikacją do zarządzania konsultantami: dashboardy, filtrowanie, formularze i solidne wzorce UI dla operacji wewnętrznych.",
        },
        technologies: [
          { name: "React", iconKey: "react" },
          { name: "JavaScript", iconKey: "javascript" },
          { name: "Redux", iconKey: "redux" },
          { name: "Material UI", iconKey: "materialui" },
          { name: "Git", iconKey: "git" },
          { name: "Jira", iconKey: "jira" },
        ],
        location: {
          city: "Warsaw",
          country: "Poland",
          lat: 52.2297,
          lng: 21.0122,
        },
      },
      {
        title: {
          en: "Confidential Medical Application (Frontend)",
          pl: "Poufna aplikacja medyczna (Frontend)",
        },
        link: "https://astek.pl/",
        image: "/astek.jpg",
        period: "12 months",
        description: {
          en: "Contributed to a medical-industry platform. Due to NDA, I can describe only the engineering scope: building UI features, ensuring high quality, and meeting strict reliability and security requirements for healthcare software used at global scale.",
          pl: "Wkład w platformę z branży medycznej. Ze względu na NDA opisuję tylko zakres inżynieryjny: budowa funkcji UI, jakość, niezawodność i wymagania bezpieczeństwa typowe dla systemów healthcare na skalę globalną.",
        },
        technologies: [
          { name: "React", iconKey: "react" },
          { name: "JavaScript", iconKey: "javascript" },
          { name: "Redux", iconKey: "redux" },
          { name: "Material UI", iconKey: "materialui" },
          { name: "Git", iconKey: "git" },
          { name: "Jira", iconKey: "jira" },
        ],
        isConfidential: true,
        location: {
          city: "Basel",
          country: "Switzerland",
          lat: 47.5596,
          lng: 7.5886,
        },
      },
    ],
  },

  {
    company: "Vazco (first stint)",
    position: { en: "Full Stack Developer", pl: "Full Stack Developer" },
    period: "2019 - 2021",
    projects: [
      {
        image: "/clozer.jpg",
        title: { en: "Clozer", pl: "Clozer" },
        period: "2019-07 – 2020-02",
        description: {
          en: "Machine-learning app helping salespeople discover new contacts and accelerate sales. I delivered both frontend and backend features, focusing on performance and a smooth UX.",
          pl: "Aplikacja wspierana ML dla sprzedaży (nowe kontakty i szybsza sprzedaż). Dostarczałem funkcje frontendu i backendu, z naciskiem na wydajność i UX.",
        },
        technologies: [
          { name: "JavaScript", iconKey: "javascript" },
          { name: "React", iconKey: "react" },
          { name: "Meteor", iconKey: "meteor" },
          { name: "MongoDB", iconKey: "mongodb" },
          { name: "GraphQL", iconKey: "graphql" },
          { name: "Apollo", iconKey: "apollo" },
          { name: "Git", iconKey: "git" },
          { name: "Jira", iconKey: "jira" },
        ],
        location: {
          city: "San Francisco",
          country: "USA",
          lat: 37.7749,
          lng: -122.4194,
        },
      },
      {
        image: "/itt.jpg",
        title: { en: "Internal Traits Tracker", pl: "Internal Traits Tracker" },
        period: "2019-03 – 2019-05",
        description: {
          en: "Built an internal platform (largely from scratch) for tracking employee skills and preferences, improving project staffing and professional development.",
          pl: "Stworzyłem wewnętrzną platformę (w dużej mierze od zera) do śledzenia umiejętności i preferencji technologicznych pracowników.",
        },
        technologies: [
          { name: "JavaScript", iconKey: "javascript" },
          { name: "React", iconKey: "react" },
          { name: "Node.js", iconKey: "nodejs" },
          { name: "GraphQL", iconKey: "graphql" },
          { name: "MongoDB", iconKey: "mongodb" },
          { name: "Git", iconKey: "git" },
          { name: "Jira", iconKey: "jira" },
        ],
        location: {
          city: "Wroclaw",
          country: "Poland",
          lat: 51.1079,
          lng: 17.0385,
        },
      },
      {
        image: "/form-builder.jpg",
        title: { en: "Form Builder", pl: "Form Builder" },
        period: "2020-01 – 2020-03",
        description: {
          en: "A customizable editor for building complex React forms used by both developers and business stakeholders. Focus: fast prototyping, strong typing, and predictable state handling.",
          pl: "Konfigurowalny edytor do budowania złożonych formularzy w React dla devów i biznesu. Fokus: szybkie prototypowanie, typowanie i przewidywalny stan.",
        },
        technologies: [
          { name: "TypeScript", iconKey: "typescript" },
          { name: "React", iconKey: "react" },
          { name: "Node.js", iconKey: "nodejs" },
          { name: "Express", iconKey: "express" },
          { name: "MongoDB", iconKey: "mongodb" },
          { name: "Redux", iconKey: "redux" },
          { name: "GraphQL", iconKey: "graphql" },
          { name: "Git", iconKey: "git" },
        ],
        location: {
          city: "Wroclaw",
          country: "Poland",
          lat: 51.1079,
          lng: 17.0385,
        },
      },
      {
        image: "/chess.jpg",
        title: { en: "Velocity Chess", pl: "Velocity Chess" },
        period: "2020-03 – 2020-05",
        description: {
          en: "Chess platform with a focus on performance and accessibility for low-bandwidth environments. I improved UI flows and app responsiveness.",
          pl: "Platforma do szachów z naciskiem na wydajność i dostępność przy słabym internecie. Usprawniałem flow UI i responsywność.",
        },
        technologies: [
          { name: "JavaScript", iconKey: "javascript" },
          { name: "React", iconKey: "react" },
          { name: "Node.js", iconKey: "nodejs" },
          { name: "Git", iconKey: "git" },
        ],
        location: {
          city: "India (deployment)",
          country: "India",
          lat: 20.5937,
          lng: 78.9629,
        },
      },
      {
        image: "/grid.jpg",
        title: { en: "Grid", pl: "Grid" },
        period: "2020-07 – 2020-10",
        description: {
          en: "React Native app for club management: ordering drinks, payments, and ticket sales. I delivered UI features and supported the API integration.",
          pl: "Aplikacja React Native do zarządzania klubem: zamawianie drinków, płatności i bilety. Dostarczałem elementy UI i wspierałem integrację API.",
        },
        technologies: [
          { name: "JavaScript", iconKey: "javascript" },
          { name: "React Native", iconKey: "reactnative" },
          { name: "Node.js", iconKey: "nodejs" },
          { name: "GraphQL", iconKey: "graphql" },
          { name: "Apollo", iconKey: "apollo" },
          { name: "Stripe", iconKey: "stripe" },
          { name: "Firebase", iconKey: "firebase" },
          { name: "Git", iconKey: "git" },
        ],
        location: {
          city: "Germany",
          country: "Germany",
          lat: 51.1657,
          lng: 10.4515,
        },
      },
      {
        image: "/epotek.jpg",
        link: "https://resolve.ch/en/",
        title: { en: "e-Potek", pl: "e-Potek" },
        period: "2020-10 – 2021-05",

        description: {
          en: "Mortgage/borrowing capacity app: delivered live credit form flows and improved UI reliability for a fully-online financing journey.",
          pl: "Aplikacja hipoteczna: dostarczyłem działające „live” formularze kredytowe i podniosłem niezawodność UI w pełni online’owego procesu.",
        },
        technologies: [
          { name: "JavaScript", iconKey: "javascript" },
          { name: "React", iconKey: "react" },
          { name: "Meteor", iconKey: "meteor" },
          { name: "MongoDB", iconKey: "mongodb" },
          { name: "Node.js", iconKey: "nodejs" },
          { name: "GraphQL", iconKey: "graphql" },
          { name: "Git", iconKey: "git" },
        ],
        location: {
          city: "Basel",
          country: "Switzerland",
          lat: 47.5596,
          lng: 7.5886,
        },
      },
      {
        image: "/dino.jpg",
        link: "https://marketdino.pl/",
        title: {
          en: "Dino Market Front Page",
          pl: "Dino – strona główna marketu",
        },
        period: "short project",
        description: {
          en: "Vue + TypeScript frontend for a major FMCG brand in Poland, powered by a Django/Python backend. Focus: a stable, content-driven customer-facing front page.",
          pl: "Frontend Vue + TypeScript dla dużej marki FMCG w Polsce, z backendem Django/Python. Fokus: stabilna, contentowa strona dla klientów.",
        },
        technologies: [
          { name: "TypeScript", iconKey: "typescript" },
          { name: "Vue", iconKey: "vue" },
          { name: "Python", iconKey: "python" },
          { name: "Django", iconKey: "django" },
          { name: "Git", iconKey: "git" },
        ],
        location: {
          city: "Wroclaw",
          country: "Poland",
          lat: 51.1079,
          lng: 17.0385,
        },
      },
      {
        image: "/maestro.jpg",
        title: {
          en: "MaestroQA (optimization sprint)",
          pl: "MaestroQA (optymalizacja)",
        },
        period: "1 month",
        description: {
          en: "Short optimization sprint after codebase audit: refactoring and performance improvements in a production React/Meteor app.",
          pl: "Krótki sprint po audycie: refaktor i poprawa wydajności w produkcyjnej aplikacji React/Meteor.",
        },
        technologies: [
          { name: "JavaScript", iconKey: "javascript" },
          { name: "React", iconKey: "react" },
          { name: "Meteor", iconKey: "meteor" },
          { name: "Node.js", iconKey: "nodejs" },
          { name: "Git", iconKey: "git" },
        ],
        link: "https://www.maestroqa.com/",
        location: {
          city: "New York",
          country: "USA",
          lat: 40.7128,
          lng: -74.006,
        },
      },
      {
        image: "/teebly.jpg",
        title: {
          en: "Teebly (internal corporate chat)",
          pl: "Teebly (czat korporacyjny)",
        },
        period: "3 months",
        description: {
          en: "Internal corporate chat platform (Meteor + Blaze + AWS). I shipped new features and improved stability in day-to-day business usage.",
          pl: "Wewnętrzny czat korporacyjny (Meteor + Blaze + AWS). Dostarczałem funkcje i poprawiałem stabilność działania.",
        },
        technologies: [
          { name: "JavaScript", iconKey: "javascript" },
          { name: "Meteor", iconKey: "meteor" },
          { name: "Node.js", iconKey: "nodejs" },
          { name: "AWS", iconKey: "unknown" },
          { name: "Git", iconKey: "git" },
        ],
        location: {
          city: "London",
          country: "United Kingdom",
          lat: 51.5072,
          lng: -0.1276,
        },
      },
      {
        title: { en: "uniforms (open-source)", pl: "uniforms (open-source)" },
        link: "https://uniforms.tools/",
        period: "1 month",
        description: {
          en: "Open-source contribution focused on TypeScript typings and developer experience for a forms toolkit.",
          pl: "Wkład w open-source: typy TypeScript i poprawa developer experience w narzędziu do formularzy.",
        },
        technologies: [
          { name: "TypeScript", iconKey: "typescript" },
          { name: "JavaScript", iconKey: "javascript" },
          { name: "Git", iconKey: "git" },
        ],
        location: {
          city: "Wroclaw",
          country: "Poland",
          lat: 51.1079,
          lng: 17.0385,
        },
      },
    ],
  },

  {
    company: "Volunteer Nepal / NGO",
    position: {
      en: "Programming Instructor (Mentor)",
      pl: "Instruktor programowania (Mentor)",
    },
    period: "2021 - 2022 (9 months)",
    projects: [
      {
        image: "/mentoring-nepal.jpeg",
        title: {
          en: "Programming School / Mentoring Program",
          pl: "Szkoła programowania / program mentoringowy",
        },
        period: "9 months",
        description: {
          en: "Led practical classes in HTML, CSS, JavaScript, and React. Built lesson plans, mentored students, I raise 10 junior developers. Delivered a small web app with students as a capstone project.",
          pl: "Prowadziłem zajęcia z HTML, CSS, JavaScript i React. Przygotowałem materiały, mentorowałem dla 10 juniorów. Wspólnie z uczniami dowieźliśmy małą aplikację webową jako projekt końcowy.",
        },
        technologies: [
          { name: "HTML/CSS", iconKey: "unknown" },
          { name: "JavaScript", iconKey: "javascript" },
          { name: "React", iconKey: "react" },
          { name: "Git", iconKey: "git" },
        ],
        location: {
          city: "Kathmandu",
          country: "Nepal",
          lat: 27.7172,
          lng: 85.324,
        },
      },
    ],
  },

  {
    company: "Maandag (Maandag Poland / Maandag NL)",
    position: {
      en: "Senior Frontend Developer",
      pl: "Senior Frontend Developer",
    },
    period: "2022 - 2024",
    projects: [
      {
        image: "/maandag.jpg",
        title: {
          en: "Job Search Platform (core product)",
          pl: "Platforma do szukania pracy (core)",
        },
        period: "2022-2024",
        description: {
          en: "Built and maintained high-traffic job board features: search UX, listings, SEO-friendly pages, and reusable UI building blocks.",
          pl: "Budowa i utrzymanie kluczowych funkcji job boardu: UX wyszukiwarki, listingi, strony pod SEO oraz reużywalne klocki UI.",
        },
        technologies: [
          { name: "TypeScript", iconKey: "typescript" },
          { name: "React", iconKey: "react" },
          { name: "Next.js", iconKey: "nextjs" },
          { name: "Storybook", iconKey: "storybook" },
          { name: "Git", iconKey: "git" },
          { name: "Azure DevOps", iconKey: "azuredevops" },
          { name: "Jira", iconKey: "jira" },
        ],
        location: {
          city: "Amsterdam",
          country: "Netherlands",
          lat: 52.3676,
          lng: 4.9041,
        },
      },
      {
        title: {
          en: "Time Logging Service",
          pl: "Serwis do logowania czasu pracy",
        },
        period: "2022-2024",
        description: {
          en: "Implemented and refined time tracking flows used by employees and contractors, including validations, edge cases, and stable UI patterns.",
          pl: "Implementacja i rozwój modułów logowania czasu pracy, walidacje, edge-case’y i stabilne wzorce UI.",
        },
        technologies: [
          { name: "TypeScript", iconKey: "typescript" },
          { name: "React", iconKey: "react" },
          { name: "Next.js", iconKey: "nextjs" },
          { name: "Git", iconKey: "git" },
          { name: "Azure DevOps", iconKey: "azuredevops" },
          { name: "Jira", iconKey: "jira" },
        ],
        location: {
          city: "Amsterdam",
          country: "Netherlands",
          lat: 52.3676,
          lng: 4.9041,
        },
      },
      {
        title: { en: "Internal Design System", pl: "Wewnętrzny design system" },
        period: "2022-2024",
        description: {
          en: "Maintained a component library and patterns to keep product UX consistent. Focus: API design, accessibility, documentation, and adoption across teams.",
          pl: "Utrzymywanie biblioteki komponentów i wzorców UI. Fokus: API komponentów, dostępność, dokumentacja i adopcja między zespołami.",
        },
        technologies: [
          { name: "TypeScript", iconKey: "typescript" },
          { name: "React", iconKey: "react" },
          { name: "Storybook", iconKey: "storybook" },
          { name: "Radix UI", iconKey: "radixui" },
          { name: "Styled Components", iconKey: "styledcomponents" },
          { name: "Azure DevOps", iconKey: "azuredevops" },
          { name: "Git", iconKey: "git" },
        ],
        location: {
          city: "Amsterdam",
          country: "Netherlands",
          lat: 52.3676,
          lng: 4.9041,
        },
      },
    ],
  },

  {
    company: "Vazco (return)",
    position: { en: "Full Stack Developer", pl: "Full Stack Developer" },
    period: "2024 - present",
    projects: [
      {
        image: "/holiday-calendar.jpg",
        title: { en: "Holiday Calendar", pl: "Holiday Calendar" },
        period: "2024-05 – present",
        description: {
          en: "Vacation management app with time logging and Google Calendar integration. I shipped UI features, improved performance, and supported deployment workflows.",
          pl: "Aplikacja do urlopów i timelogów z integracją Google Calendar. Dostarczałem funkcje UI, poprawiałem wydajność i wspierałem deployment.",
        },
        technologies: [
          { name: "JavaScript", iconKey: "javascript" },
          { name: "TypeScript", iconKey: "typescript" },
          { name: "React", iconKey: "react" },
          { name: "Meteor", iconKey: "meteor" },
          { name: "MongoDB", iconKey: "mongodb" },
          { name: "Git", iconKey: "git" },
          { name: "Jira", iconKey: "jira" },
        ],
        location: {
          city: "Wroclaw",
          country: "Poland",
          lat: 51.1079,
          lng: 17.0385,
        },
      },
      {
        title: { en: "TeamCV", pl: "TeamCV" },
        period: "2024-04 – 2024-06",
        description: {
          en: "Internal product for managing team CVs: custom CV creation, centralized hub, and analytics. I focused on performance and feature delivery in a reactive stack.",
          pl: "Produkt do zarządzania CV zespołu: tworzenie CV pod potrzeby, centralny hub i analityka. Fokus na wydajność i dowożenie funkcji.",
        },
        technologies: [
          { name: "TypeScript", iconKey: "typescript" },
          { name: "React", iconKey: "react" },
          { name: "Meteor", iconKey: "meteor" },
          { name: "Node.js", iconKey: "nodejs" },
          { name: "MongoDB", iconKey: "mongodb" },
          { name: "GraphQL", iconKey: "graphql" },
          { name: "Zustand", iconKey: "unknown" },
          { name: "Git", iconKey: "git" },
        ],
        link: "https://team-cv.vazco.eu/",
        location: {
          city: "Wroclaw",
          country: "Poland",
          lat: 51.1079,
          lng: 17.0385,
        },
      },
      {
        image: "/shipco.jpg",
        title: { en: "Ship&Co", pl: "Ship&Co" },
        period: "2024-07 – 2024-09",
        description: {
          en: "Two parallel streams: end-user documentation in Docusaurus + a major Meteor upgrade (heavy breaking changes). My toughest project: upgrading the framework, auditing code, fixing performance, and stabilizing production.",
          pl: "Dwie ścieżki równolegle: dokumentacja (Docusaurus) + duży upgrade Meteora (masa breaking changes). Najtrudniejszy projekt: upgrade, audyt, performance i stabilizacja produkcji.",
        },
        technologies: [
          { name: "JavaScript", iconKey: "javascript" },
          { name: "Meteor", iconKey: "meteor" },
          { name: "Node.js", iconKey: "nodejs" },
          { name: "Docusaurus", iconKey: "docusaurus" },
          { name: "Git", iconKey: "git" },
        ],
        link: "https://www.shipandco.com/en/",
        location: {
          city: "Japan",
          country: "Japan",
          lat: 35.6762,
          lng: 139.6503,
        },
      },
      {
        image: "/zremb.jpg",
        title: { en: "ZREMB – ADA", pl: "ZREMB – ADA" },
        period: "project",
        description: {
          en: "A fully reactive audit form for lift auditors, engineers, and the sales team, accompanied by a reporting module and a pricing engine. Focused on fast data entry and reliable data flow across the app.",
          pl: "W pełni reaktywny formularz audytowy dla audytorów dźwigów, inżynierów i zespołu sprzedaży, uzupełniony o moduł raportowania oraz silnik wyceny. Skupiłem się na szybkim wprowadzaniu danych, wspierających pracę w terenie oraz niezawodnym przepływie danych w aplikacji.",
        },
        technologies: [
          { name: "TypeScript", iconKey: "typescript" },
          { name: "JavaScript", iconKey: "javascript" },
          { name: "React", iconKey: "react" },
          { name: "Meteor", iconKey: "meteor" },
          { name: "Node.js", iconKey: "nodejs" },
          { name: "MongoDB", iconKey: "mongodb" },
          { name: "Git", iconKey: "git" },
          { name: "Jira", iconKey: "jira" },
        ],
        location: {
          city: "Wroclaw",
          country: "Poland",
          lat: 51.1079,
          lng: 17.0385,
        },
      },
      {
        link: "https://vazco.ai/",
        title: {
          en: "Vazco Website (vazco.ai / vazco.eu)",
          pl: "Strona Vazco (vazco.ai / vazco.eu)",
        },
        period: "2024-06 – 2024-08",
        description: {
          en: "Company website built with Next.js + Sanity. I focused on UI modules, SEO, performance, and reusable patterns for content-driven pages.",
          pl: "Strona firmowa na Next.js + Sanity. Skupiałem się na modułach UI, SEO, wydajności i reużywalnych wzorcach pod content.",
        },
        technologies: [
          { name: "TypeScript", iconKey: "typescript" },
          { name: "React", iconKey: "react" },
          { name: "Next.js", iconKey: "nextjs" },
          { name: "Sanity", iconKey: "sanity" },
          { name: "Tailwind", iconKey: "tailwind" },
          { name: "Storybook", iconKey: "storybook" },
          { name: "Git", iconKey: "git" },
        ],
        location: {
          city: "Wroclaw",
          country: "Poland",
          lat: 51.1079,
          lng: 17.0385,
        },
      },
      {
        image: "/torus.jpg",
        title: { en: "Torus", pl: "Torus" },
        period: "2025-01 – 2025-02",
        description: {
          en: "EdTech mobile app helping refugees and immigrants integrate in the US. I built a core messenger feature: groups, roles, permissions, reactions, quoting, and link detection.",
          pl: "Mobilna aplikacja EdTech wspierająca integrację uchodźców i imigrantów w USA. Zbudowałem kluczowy moduł komunikatora: grupy, role, uprawnienia, reakcje, cytowanie i wykrywanie linków.",
        },
        technologies: [
          { name: "TypeScript", iconKey: "typescript" },
          { name: "JavaScript", iconKey: "javascript" },
          { name: "React Native", iconKey: "reactnative" },
          { name: "Firebase", iconKey: "firebase" },
          { name: "OpenAI", iconKey: "openai" },
          { name: "Git", iconKey: "git" },
        ],
        location: {
          city: "USA",
          country: "USA",
          lat: 39.8283,
          lng: -98.5795,
        },
      },
      {
        image: "/livom.jpg",
        title: { en: "Livom 3D Configurator", pl: "Livom – konfigurator 3D" },
        period: "2025-03 – 2025-05",
        description: {
          en: "3D furniture configurator integrated with Shopify. I delivered frontend UX/UI tied to 3D logic, ensured responsive performance on web/mobile, and prepared the base for future AI integrations.",
          pl: "Konfigurator mebli 3D zintegrowany z Shopify. Dostarczyłem UX/UI spięte z logiką 3D, zadbałem o wydajność web/mobile i przygotowałem bazę pod integracje AI.",
        },
        technologies: [
          { name: "TypeScript", iconKey: "typescript" },
          { name: "React", iconKey: "react" },
          { name: "Three.js", iconKey: "threejs" },
          { name: "Shopify", iconKey: "shopify" },
          { name: "OpenAI", iconKey: "openai" },
          { name: "Git", iconKey: "git" },
        ],
        link: "https://livom.de",
        location: {
          city: "Basel",
          country: "Switzerland",
          lat: 47.5596,
          lng: 7.5886,
        },
      },
      {
        title: {
          en: "LAS (Legal Asset Servicing)",
          pl: "LAS (Legal Asset Servicing)",
        },
        period: "2025-06 – present",
        description: {
          en: "Full-stack platform supporting the legal asset servicing lifecycle: onboarding, contract management, invoicing, funding allocation, and audit-ready reporting. I implement features end-to-end, from UI to backend services and data.",
          pl: "Platforma full-stack wspierająca lifecycle legal asset servicing: onboarding, kontrakty, fakturowanie, alokacja finansowania i raportowanie pod audyt. Dostarczam funkcje end-to-end: UI + backend + dane.",
        },
        technologies: [
          { name: "TypeScript", iconKey: "typescript" },
          { name: "React", iconKey: "react" },
          { name: "Next.js", iconKey: "nextjs" },
          { name: "Node.js", iconKey: "nodejs" },
          { name: "PostgreSQL", iconKey: "postgres" },
          { name: "Tailwind", iconKey: "tailwind" },
          { name: "OpenAI", iconKey: "openai" },
          { name: "Git", iconKey: "git" },
        ],
        image: "/las.jpg",
        link: "https://legalassetservicing.com",
        location: {
          city: "Miami",
          country: "USA",
          lat: 25.7617,
          lng: -80.1918,
        },
      },
      {
        image: "/compas.jpg",
        title: { en: "CTO Compass", pl: "CTO Compass" },
        period: "project sprint",
        description: {
          en: "AI-assisted tool to evaluate delivery process via a survey and generate actionable recommendations. I contributed to the app stack, auth, forms, and data flows.",
          pl: "Narzędzie wspierane AI do oceny procesu wytwarzania: ankieta + rekomendacje. Pracowałem nad aplikacją, autoryzacją, formularzami i przepływami danych.",
        },
        technologies: [
          { name: "TypeScript", iconKey: "typescript" },
          { name: "React", iconKey: "react" },
          { name: "Next.js", iconKey: "nextjs" },
          { name: "OpenAI", iconKey: "openai" },
          { name: "Tailwind", iconKey: "tailwind" },
          { name: "Git", iconKey: "git" },
        ],
        link: "https://cto-compass.vercel.app/",
        location: {
          city: "Wroclaw",
          country: "Poland",
          lat: 51.1079,
          lng: 17.0385,
        },
      },
      {
        title: {
          en: "OurPeople (Notion-like improvements)",
          pl: "OurPeople (usprawnienia, Notion-like)",
        },
        period: "2 months",
        description: {
          en: "Designed and implemented a Notion-like UX pattern to significantly improve workflows in a client app: better navigation, editing experience, and component structure.",
          pl: "Zaprojektowałem i wdrożyłem wzorce UX w stylu Notion, które usprawniły workflow w aplikacji klienta: nawigacja, edycja i struktura komponentów.",
        },
        technologies: [
          { name: "TypeScript", iconKey: "typescript" },
          { name: "React", iconKey: "react" },
          { name: "JavaScript", iconKey: "javascript" },
          { name: "Git", iconKey: "git" },
        ],
        location: {
          city: "London",
          country: "United Kingdom",
          lat: 51.5072,
          lng: -0.1276,
        },
      },
    ],
  },
];
