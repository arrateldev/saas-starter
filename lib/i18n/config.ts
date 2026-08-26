export const locales = ['de', 'en'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getLocaleFromPathname(pathname: string): Locale | null {
  const [, maybeLocale] = pathname.split('/');
  return maybeLocale && isLocale(maybeLocale) ? maybeLocale : null;
}

export function stripLocaleFromPathname(pathname: string): string {
  const locale = getLocaleFromPathname(pathname);
  if (!locale) {
    return pathname || '/';
  }

  const nextPath = pathname.slice(`/${locale}`.length);
  return nextPath || '/';
}

export function localizePath(locale: Locale, pathname: string) {
  if (/^https?:\/\//.test(pathname)) {
    return pathname;
  }

  if (getLocaleFromPathname(pathname)) {
    return pathname;
  }

  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return normalized === '/' ? `/${locale}` : `/${locale}${normalized}`;
}

export function replaceLocaleInPathname(pathname: string, locale: Locale) {
  const stripped = stripLocaleFromPathname(pathname);
  return localizePath(locale, stripped);
}

export function getPreferredLocale(
  acceptLanguage: string | null | undefined,
  cookieLocale?: string | null
): Locale {
  if (cookieLocale && isLocale(cookieLocale)) {
    return cookieLocale;
  }

  const normalized = (acceptLanguage || '').toLowerCase();
  if (normalized.includes('de')) {
    return 'de';
  }

  if (normalized.includes('en')) {
    return 'en';
  }

  return defaultLocale;
}

export function getLocaleFromFormData(formData: FormData): Locale {
  const locale = formData.get('locale');
  return typeof locale === 'string' && isLocale(locale) ? locale : defaultLocale;
}
