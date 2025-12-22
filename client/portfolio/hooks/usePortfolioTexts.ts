import { useMemo } from "react";

import { portfolioTexts } from "@/client/portfolio/data";
import type { Locale } from "@/client/portfolio/types";

type LocalizedRecord = Record<Locale, string>;

type TextTree =
  | string
  | number
  | boolean
  | null
  | undefined
  | LocalizedRecord
  | TextTree[]
  | { [key: string]: TextTree };

type LocalizedTree<T> = T extends LocalizedRecord
  ? string
  : T extends (infer U)[]
    ? LocalizedTree<U>[]
    : T extends (...args: string[]) => string
      ? T
      : T extends object
        ? { [K in keyof T]: LocalizedTree<T[K]> }
        : T;

/**
 * Returns a localized subtree from portfolioTexts for the given locale and root key.
 * - Any `Record<Locale, string>` becomes a string.
 * - Arrays and objects are deeply mapped.
 * - Functions are preserved as-is (use `t()` helper to localize their return values).
 */
export function usePortfolioTexts<
  TKey extends keyof typeof portfolioTexts,
>(params: { locale: Locale; key: TKey }) {
  const { key, locale } = params;

  return useMemo(() => {
    const source = portfolioTexts[key] as TextTree;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const localizeNode = (node: TextTree): any => {
      if (!node) return node;

      if (typeof node !== "object") return node;

      if (Array.isArray(node)) {
        return node.map((child) => localizeNode(child));
      }

      // Keep functions (they might be nested in objects)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (typeof node === "function") return node as any;

      const maybeLocalized = node as Partial<LocalizedRecord>;
      if (
        typeof maybeLocalized.en === "string" ||
        typeof maybeLocalized.pl === "string"
      ) {
        return (maybeLocalized[locale] ?? maybeLocalized.en) as string;
      }

      const result: Record<string, unknown> = {};
      for (const [childKey, childValue] of Object.entries(node)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        result[childKey] = localizeNode(childValue as any);
      }

      return result;
    };

    return localizeNode(source);
  }, [key, locale]) as LocalizedTree<(typeof portfolioTexts)[TKey]>;
}

/**
 * Localizes a `Record<Locale, string>` returned by a text factory function.
 * Use it for cases like: `texts.image.profileAlt(name)` or `texts.copyright(year, name)`.
 */
export function t(locale: Locale, value: LocalizedRecord) {
  return value[locale] ?? value.en;
}
