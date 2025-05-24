import { Header } from '@/components/common/header';

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div
        style={{ paddingTop: 'calc(65px + 1rem)' }}>
        <main>
          {children}
        </main>
      </div>
    </>
  );
}
