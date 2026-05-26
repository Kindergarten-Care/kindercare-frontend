import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { StyledRegistry } from '@/theme';

const inter = Inter({
  subsets: ['vietnamese', 'latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'KinderCare – Nơi ươm mầm & Phát triển tương lai',
  description:
    'Trường mầm non KinderCare: môi trường học tập an toàn, yêu thương; ứng dụng kết nối phụ huynh; tuyển sinh 2025–2026.',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): React.ReactElement {
  return (
    <html lang="vi" className={inter.className}>
      <body>
        <StyledRegistry>{children}</StyledRegistry>
      </body>
    </html>
  );
}
