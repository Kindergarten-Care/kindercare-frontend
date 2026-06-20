import '../globals.css';
import { Inter } from 'next/font/google';
import StyledComponentsRegistry from '@/lib/registry';

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-inter',
  display: 'swap',
});
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { SocketProvider } from '@/contexts/SocketContext';
import { AuthProvider } from '@kindercare/core';
import { ParentProvider } from '@/contexts/ParentContext';
import { StudentProvider } from '@/contexts/StudentContext';
import ClientAppWrapper from '@/components/ClientAppWrapper';
import { ToastContainer } from '@kindercare/ui';
import GlobalChatFab from '@/components/GlobalChatFab';
import NextTopLoader from 'nextjs-toploader';
import type { Metadata } from 'next';

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

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body style={{ margin: 0, padding: 0, backgroundColor: '#f8fafc' }}>
        <NextTopLoader
          color="#10b981"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #10b981, 0 0 5px #10b981"
        />
        <NextIntlClientProvider messages={messages}>
          <StyledComponentsRegistry>
            <AuthProvider>
              <ParentProvider>
                <StudentProvider>
                  <SocketProvider>
                    <ClientAppWrapper>
                      {children}
                    </ClientAppWrapper>
                    <ToastContainer />
                    <GlobalChatFab />
                  </SocketProvider>
                </StudentProvider>
              </ParentProvider>
            </AuthProvider>
          </StyledComponentsRegistry>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
