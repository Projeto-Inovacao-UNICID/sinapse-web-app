import ThemeProvider from '@/providers/theme-provider';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="pt-br" className="h-full">
      <body className="antialiased h-full" style={{ margin: 0 }}>
        <ThemeProvider attribute={'class'} defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
