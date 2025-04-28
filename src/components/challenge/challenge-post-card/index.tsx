'use client';

import { CompanyProfileImage } from "@/components/profile/company/avatar";
import { useGetCompanyProfile } from "@/hooks/company/useCompanyProfile";
import { Challenge } from "@/types";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Divider,
  CircularProgress,
} from "@mui/material";
import { format } from "date-fns";

interface ChallengePostCardProps {
  desafio: Challenge;
  gridColumn: number;
}

export function ChallengePostCard({ desafio, gridColumn }: ChallengePostCardProps) {
  const empresaId = desafio.empresaId;
  const { data: company, isLoading } = useGetCompanyProfile(empresaId);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4, gridColumn: `${gridColumn} / span 1` }}>
        <CircularProgress />
      </Box>
    );
  }

  const inicio = format(new Date(desafio.dataInicio), "dd/MM/yyyy");
  const fim = format(new Date(desafio.dataFim), "dd/MM/yyyy");

  return (
    <Card sx={{ bgcolor: 'var(--card)', borderRadius: 2, mb: 2, overflow: 'visible', gridColumn: `${gridColumn} / span 1` }}>
      <CardHeader
        avatar={
          <Avatar
            src={company?.temImagem ? `/api/empresa/avatar/${empresaId}` : undefined}
            alt={company?.nome}
          >
            {!company?.temImagem && company?.nome?.[0]}
          </Avatar>
        }
        title={
          <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 'bold' }}>
            {company?.nome}
          </Typography>
        }
        subheader={
          <Typography variant="caption" sx={{ color: 'var(--muted)' }}>
            @{company?.username}
          </Typography>
        }
        sx={{ pb: 0 }}
      />

      <CardContent sx={{ pt: 1 }}>
        <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', mb: 1 }}>
          {desafio.titulo}
        </Typography>
        <Typography variant="body2" sx={{ color: 'white', mb: 2 }}>
          {desafio.descricao}
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Typography variant="caption" sx={{ color: 'var(--muted)' }}>
            Início: {inicio}
          </Typography>
          <Typography variant="caption" sx={{ color: 'var(--muted)' }}>
            Fim: {fim}
          </Typography>
          <Typography variant="caption" sx={{ color: 'var(--muted)' }}>
            Modalidade: {desafio.modalidade}
          </Typography>
        </Box>
      </CardContent>

      <Divider sx={{ bgcolor: 'var(--muted)' }} />

      <CardActions disableSpacing sx={{ px: 1, py: 1, justifyContent: 'flex-end' }}>
        {/* Aqui pode ter futuras ações, tipo botão de participar */}
        {/* Exemplo: */}
        {/* <Button size="small" variant="contained" color="primary">Participar</Button> */}
      </CardActions>
    </Card>
  );
}
