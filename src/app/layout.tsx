import './globals.css';
import ThemeProvider from '@/providers/theme-provider';
import QueryProviders from '@/providers/query-provider'; 

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br" className="h-full" suppressHydrationWarning>
      <body className="h-full antialiased" style={{ margin: 0 }}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <QueryProviders>
            {children}
          </QueryProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
