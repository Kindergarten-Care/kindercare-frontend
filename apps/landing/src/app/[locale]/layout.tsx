import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { StyledRegistry } from '@/theme';

const inter = Inter({
  subsets: ['vietnamese', 'latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

type Locale = 'vi' | 'en';

const SITE_URL = 'https://kindercare.app';

const META: Record<Locale, { title: string; description: string }> = {
  vi: {
    title: 'KinderCare – Nơi ươm mầm & Phát triển tương lai',
    description:
      'Trường mầm non KinderCare: môi trường học tập an toàn, yêu thương; ứng dụng kết nối phụ huynh; tuyển sinh 2025–2026.',
  },
  en: {
    title: 'KinderCare – Nurturing Seeds & Growing Futures',
    description:
      'KinderCare Kindergarten: a safe, loving learning environment; parent-connected app; admissions 2025–2026.',
  },
};

export function generateStaticParams(): Array<{ locale: string }> {
  return [{ locale: 'vi' }, { locale: 'en' }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = rawLocale === 'en' ? 'en' : 'vi';
  const { title, description } = META[locale];
  const canonicalPath = locale === 'vi' ? '/' : '/en';

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: canonicalPath,
      languages: {
        vi: '/',
        en: '/en',
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalPath,
      siteName: 'KinderCare',
      locale: locale === 'vi' ? 'vi_VN' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps): Promise<React.ReactElement> {
  const { locale } = await params;
  const validLocale: Locale = locale === 'en' ? 'en' : 'vi';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'KinderCare',
    url: SITE_URL,
    logo: 'https://media.kindercare.app/KinderCare%20Logo/KinderCare_LogoTextHorizontal.png',
    description: META[validLocale].description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '65 Huỳnh Thúc Kháng',
      addressLocality: 'Hồ Chí Minh',
      addressCountry: 'VN',
    },
    telephone: '+84901234567',
  };

  return (
    <html lang={validLocale} className={inter.className}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <StyledRegistry>{children}</StyledRegistry>
      </body>
    </html>
  );
}
