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
        <div style={{ paddingTop: !isLoginPage ? '65px' : 0 }}>
          {children}
        </div>
      </body>
    </html>
  );
}
