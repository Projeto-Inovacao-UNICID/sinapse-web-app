import { Suspense } from 'react';
import ConversasClient from './ConversasClient';

export default function Page() {
  return (
    <Suspense fallback={<div>Carregando conversas...</div>}>
      <ConversasClient />
    </Suspense>
  );
}
