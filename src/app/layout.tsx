import StyledComponentsRegistry from '@/lib/registry';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'KinderCare - Hệ Thống Quản Lý Mầm Non',
  description: 'Nền tảng quản lý mầm non toàn diện, hiện đại và bảo mật.',
  icons: {
    icon: '/favicon.ico', // Bạn có thể thay đổi icon tại đây
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
