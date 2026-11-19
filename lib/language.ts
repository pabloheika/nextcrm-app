import type { Language } from "@prisma/client";

const LOCALE_TO_PRISMA: Record<string, Language> = {
  cz: "cz",
  en: "en",
  de: "de",
  uk: "uk",
  "pt-BR": "pt_BR",
  pt_BR: "pt_BR",
};

const PRISMA_TO_LOCALE: Record<string, string> = {
  cz: "cz",
  en: "en",
  de: "de",
  uk: "uk",
  pt_BR: "pt-BR",
};

/**
 * Converts an application/next-intl locale (e.g. "pt-BR") to the Prisma Language enum value (e.g. "pt_BR").
 * Returns null if the locale is not a supported Language enum member.
 */
export function toPrismaLanguage(locale: string | null | undefined): Language | null {
  if (!locale) return null;
  return LOCALE_TO_PRISMA[locale] ?? null;
}

/**
 * Converts a Prisma Language enum value (e.g. "pt_BR") to the application/next-intl locale (e.g. "pt-BR").
 */
export function fromPrismaLanguage(language: string | null | undefined, fallback = "en"): string {
  if (!language) return fallback;
  return PRISMA_TO_LOCALE[language] ?? language;
}
