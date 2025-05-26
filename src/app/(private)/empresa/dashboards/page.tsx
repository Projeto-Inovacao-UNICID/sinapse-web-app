'use client';

import DashboardPage from "@/components/analytics";
import { useSession } from "@/hooks/session/useSession";

export default function Forms() {
  const { session } = useSession();
  const id = session?.id;
  const isCompany = session ? session.roles.includes("ROLE_COMPANY") : false;

  if (isCompany && id) {
    return (
      <DashboardPage />
    );
  }

  return <div>Você não tem permissão para acessar esta página.</div>;
}