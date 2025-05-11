'use client';

import { FormCreationCard } from "@/components/forms/create-forms-card";
import { useSession } from "@/hooks/session/useSession";

export default function Forms() {
  const { session } = useSession();
  const id = session?.id;
  const isCompany = session ? session.roles.includes("ROLE_COMPANY") : false;

  if (isCompany && id) {
    return (
      <FormCreationCard empresaId={id} />
    );
  }

  return <div>Você não tem permissão para acessar esta página.</div>;
}