import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { Locale, Theme } from "@/client/portfolio/types";

type PortfolioPreferencesState = {
  hasHydrated: boolean;
  locale: Locale;
  setHasHydrated: (value: boolean) => void;
  setLocale: (nextLocale: Locale) => void;
  setTheme: (nextTheme: Theme) => void;
  theme: Theme;
};

/**
 * Global portfolio preferences store.
 * Persists UI preferences like theme and locale in localStorage.
 */
export const usePortfolioPreferencesStore = create<PortfolioPreferencesState>()(
  persist(
    (setState) => ({
      hasHydrated: false,
      locale: "en",
      setHasHydrated: (value) => setState({ hasHydrated: value }),
      setLocale: (nextLocale) => setState({ locale: nextLocale }),
      setTheme: (nextTheme) => setState({ theme: nextTheme }),
      theme: "dark",
    }),
    {
      name: "portfolio-preferences",
      partialize: (state) => ({
        locale: state.locale,
        theme: state.theme,
      }),
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
