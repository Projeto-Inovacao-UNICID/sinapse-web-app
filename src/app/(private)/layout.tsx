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
          paddingTop: '65px',
          display: 'grid',
          gridTemplateColumns: '1fr minmax(0, 10fr) 1fr',
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
