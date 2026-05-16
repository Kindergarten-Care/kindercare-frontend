export const metadata = {
  title: 'KinderCare Landing Page',
  description: 'Hệ thống quản lý mầm non toàn diện',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}
