import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import localFont from 'next/font/local';
import { headers } from 'next/headers';
import { defaultLocale, isLocale } from '@/lib/i18n/config';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: siteConfig.product.metadata.title.en,
  description: siteConfig.product.metadata.description.en
};

export const viewport: Viewport = {
  maximumScale: 1
};

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans'
});

const titleFont = localFont({
  src: './fonts/LexendExa_400Regular.ttf',
  display: 'swap',
  variable: '--font-title'
});

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const requestHeaders = await headers();
  const requestedLocale = requestHeaders.get('x-locale');
  const locale =
    requestedLocale && isLocale(requestedLocale)
      ? requestedLocale
      : defaultLocale;

  return (
    <html
      lang={locale}
      className={`${manrope.variable} ${titleFont.variable} bg-white text-black`}
    >
      <body className="min-h-[100dvh] bg-background font-sans text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
