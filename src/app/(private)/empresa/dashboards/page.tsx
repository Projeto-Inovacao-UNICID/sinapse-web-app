'use client';

import ChallengeMetrics from "@/components/analytics/challenge-metrics";
import { useSession } from "@/hooks/session/useSession";

export default function Forms() {
  const { session } = useSession();
  const id = session?.id;
  const isCompany = session ? session.roles.includes("ROLE_COMPANY") : false;

  if (isCompany && id) {
    return (
      <div
      style={{  
        display: 'grid',
        gridTemplateColumns: '2fr minmax(0, 8fr) 2fr',
        minHeight: '100vh',
      }}
    >
      <div style={{ gridColumn: 2 }}>
        <ChallengeMetrics />
      </div>
    </div>
    );
  }

  return <div>Você não tem permissão para acessar esta página.</div>;
}