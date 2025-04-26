import { Header } from '@/components/header';

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div
        style={{
          paddingTop: 'calc(65px + 1rem)',
          display: 'grid',
          gridTemplateColumns: '2fr minmax(0, 8fr) 2fr',
          minHeight: '100vh',
        }}
      >
        <main style={{ gridColumn: '2' }}>
          {children}
        </main>
      </div>
    </>
  );
}
