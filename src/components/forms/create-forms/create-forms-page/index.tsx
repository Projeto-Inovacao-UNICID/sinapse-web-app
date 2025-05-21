'use client';

import { Box, Typography } from "@mui/material";
import { FormCreationCard } from "../create-forms-card";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from "@/components/common/icon-buttons";

interface CreateFormsPageProps {
  companyId: string;
}

export function CreateFormsPage({ companyId }: CreateFormsPageProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2}}>
        <IconButton icon={<ArrowBackIcon />} onClick={() => window.history.back()} />
        <Typography variant="h5" sx={{ fontWeight: 600, color: 'var(--foreground)' }}>
          Criar Novo Formulário
        </Typography>
      </Box>
      <FormCreationCard empresaId={companyId} />
    </Box>
  );
}