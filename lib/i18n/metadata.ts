import type { Metadata } from 'next';
import { defaultLocale, locales, localizePath, type Locale } from './config';
import { getBaseUrl, getSiteMetadata } from '@/lib/site-config';

const metadataBase = getBaseUrl();
type LocalizedPathnames = Partial<Record<Locale, string>>;

export function buildLocalizedMetadata(
  locale: Locale = defaultLocale,
  pathname = '/',
  localizedPathnames?: LocalizedPathnames
): Metadata {
  const metadata = getSiteMetadata(locale);
  const getPathname = (entry: Locale) => localizedPathnames?.[entry] ?? pathname;
  const canonicalPath = localizePath(locale, getPathname(locale));

  return {
    metadataBase: new URL(metadataBase),
    title: metadata.title,
    description: metadata.description,
    alternates: {
      canonical: canonicalPath,
      languages: Object.fromEntries(
        locales.map((entry) => [entry, localizePath(entry, getPathname(entry))])
      )
    }
  };
}
