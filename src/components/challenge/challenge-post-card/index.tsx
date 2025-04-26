import { useGetCompanyProfile } from "@/hooks/company/useCompanyProfile";
import { Challenge } from "@/types";
import { Avatar, Box, Divider, Typography } from "@mui/material";

interface ChallengePostCardProps {
  desafio: Challenge;
}

export function ChallengePostCard({ desafio }: ChallengePostCardProps) {
  const empresaId = desafio.empresaId;
  const { data: company, isLoading } = useGetCompanyProfile(empresaId);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  console.log(company);
  console.log(empresaId);

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, backgroundColor: "var(--card)", borderRadius: 2, padding: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar src="/assets/logo.png" alt="Logo" sx={{ width: 100, height: 100 }} />
        <Typography variant="h5" color="var(--foreground)" className="font-bold">
          {company?.username}
        </Typography>
        <Typography variant="body1" color="var(--muted)">
          {company?.nome}
        </Typography>
      </Box>
      <Divider/>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, bgcolor: "var(--cardSecondary)", borderRadius: 2, padding: 4 }}>
        <Typography variant="h5" color="var(--foreground)" className="font-bold">
          {desafio.titulo}
        </Typography>
        <Typography variant="body1" color="var(--foreground)">
          {desafio.descricao}
        </Typography>
        <Typography variant="body1" color="var(--muted)">
          {desafio.dataInicio} - {desafio.dataFim}
        </Typography>
        <Typography variant="body1" color="var(--muted)">
          {desafio.modalidade}
        </Typography>
      </Box>
    </Box>  
  );
}