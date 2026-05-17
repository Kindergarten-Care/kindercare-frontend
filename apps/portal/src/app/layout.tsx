export const metadata = {
  title: 'KinderCare Portal Login',
  description: 'Cổng đăng nhập hệ thống KinderCare',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
