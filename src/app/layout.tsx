'use client';

import './globals.css';
import { usePathname } from 'next/navigation';
import { Header } from '@/components/header';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  return (
    <html lang="pt-br">
      <body className="antialiased" style={{ margin: 0 }}>
        {!isLoginPage && <Header />}

        {/* Grid container com margens de 1 coluna */}
        <div
          style={{
            paddingTop: !isLoginPage ? '65px' : 0,
            display: isLoginPage ? 'block' : 'grid',
            gridTemplateColumns: isLoginPage ? 'none' : '1fr minmax(0, 10fr) 1fr',
            minHeight: '100vh',
          }}
        >
          <main
            style={{
              gridColumn: isLoginPage ? 'auto' : '2',
            }}
          >
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
