import StyledComponentsRegistry from '@/lib/registry';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { SocketProvider } from '@/contexts/SocketContext';
import { AuthProvider } from '@/contexts/AuthContext';
import type { Metadata } from 'next';
import { Montserrat, Plus_Jakarta_Sans } from 'next/font/google';
import '../globals.css';

const montserrat = Montserrat({
  subsets: ['vietnamese', 'latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-montserrat',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['vietnamese', 'latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-plus-jakarta',
});

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Site' });

  return {
    title: t('title'),
    description: t('description'),
    icons: {
      icon: '/favicon.ico',
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  console.log("LAYOUT LOCALE IS:", locale);

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    console.log("NOT FOUND LOCALE", locale);
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${montserrat.variable} ${plusJakarta.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <StyledComponentsRegistry>
            <AuthProvider>
              <SocketProvider>
                {children}
              </SocketProvider>
            </AuthProvider>
          </StyledComponentsRegistry>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
