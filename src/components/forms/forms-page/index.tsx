'use client';

import ButtonPrimary from "@/components/common/button-primary";
import { CustomToggleGroup } from "@/components/common/custom-toggle-group";
import { useGetActiveForms, useGetInactiveForms } from "@/hooks/forms/useForms";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormList } from "../forms-list";

interface FormsPageProps {
  companyId: string;
}

export function FormsPage({ companyId }: FormsPageProps) {
  const { data: activeData, isLoading: isLoadingActive } = useGetActiveForms(companyId);
  const {data: inactiveData, isLoading: isLoadingInactive} = useGetInactiveForms(companyId);

  const activeForms = activeData?.content ?? [];
  const inactiveForms = inactiveData?.content ?? [];

  const [isActive, setIsActive] = useState(true);

  const router = useRouter();

  const handleCreateForm = () => {  
    router.push('/empresa/formularios/criar');
  }
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: "row-reverse", justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
        <ButtonPrimary title="+ Novo Formulário" onClick={handleCreateForm} borderRadius={999} fontWeight={600} />
        <CustomToggleGroup value={isActive} onChange={setIsActive} options={[{ value: true, label: 'Ativos' }, { value: false, label: 'Arquivados' }]} />
      </Box>
      <FormList forms={isActive ? activeForms : inactiveForms} companyId={companyId} isActive={isActive} />
    </Box>
  );
}