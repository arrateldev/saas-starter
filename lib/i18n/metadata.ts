import type { Metadata } from 'next';
import { defaultLocale, locales, localizePath, type Locale } from './config';
import { getBaseUrl, getSiteMetadata } from '@/lib/site-config';

const metadataBase = getBaseUrl();

export function buildLocalizedMetadata(
  locale: Locale = defaultLocale,
  pathname = '/'
): Metadata {
  const metadata = getSiteMetadata(locale);
  const canonicalPath = localizePath(locale, pathname);

  return {
    metadataBase: new URL(metadataBase),
    title: metadata.title,
    description: metadata.description,
    alternates: {
      canonical: canonicalPath,
      languages: Object.fromEntries(
        locales.map((entry) => [entry, localizePath(entry, pathname)])
      )
    }
  };
}
