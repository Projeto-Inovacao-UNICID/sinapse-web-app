import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className="antialiased" style={{ margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
