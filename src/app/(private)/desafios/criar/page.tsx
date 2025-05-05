'use client';

import { CreationChallengeCard } from "@/components/challenge/company/creation-challenge-card";
import { useGetCompanyProfile } from "@/hooks/profile/company/useCompanyProfile";
import { useSession } from "@/hooks/session/useSession";
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

export default function CriarDesafio() {
  const { session, loading } = useSession();
  const role = session?.roles;
  const empresaId = session ? session.id : '';
  const { data: company, isLoading } = useGetCompanyProfile(empresaId);
  const isCompany = role ? role.includes('ROLE_COMPANY') : false;
  
  const isCompanyApproved = company?.aprovadaPelaAdministracao ?? false;

  if (loading) return <div>Carregando...</div>;

  return (
    isCompany && isCompanyApproved
      ? <CreationChallengeCard empresaId={empresaId} />
      : <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2, borderRadius: 2, gap: 2 }}>
          <motion.img
            src="/assets/logo.png"
            alt="Logo"
            style={{ height: '4rem' }}
            animate={{
              rotate: 360,
            }}
            transition={{
              repeat: Infinity,
              repeatType: 'loop',
              duration: 10,
              ease: 'linear',
            }}
          />
          <Typography color="var(--foreground)" variant="h5" sx={{ fontWeigh: 'bold' }}>Você não tem autorização para criar desafios</Typography>
        </Box>
  );
}
