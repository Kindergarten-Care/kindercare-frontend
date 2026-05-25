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
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{
          __html: `
            tailwind.config = {
              theme: {
                extend: {
                  colors: {
                    primary: '#0E793C',
                    brand: {
                      50: '#eefcf3',
                      100: '#d7f7e2',
                      500: '#0E793C',
                      600: '#0C6633',
                    }
                  },
                  fontFamily: {
                    sans: ['Montserrat', 'sans-serif'],
                  }
                }
              }
            }
          `
        }} />
      </head>
      <body className="bg-slate-50 font-sans text-slate-800 antialiased min-h-screen">
        {children}
      </body>
    </html>
  )
}
