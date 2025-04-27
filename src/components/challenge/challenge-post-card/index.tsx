import { CompanyProfileImage } from "@/components/profile/company/avatar";
import { useGetCompanyProfile } from "@/hooks/company/useCompanyProfile";
import { Challenge } from "@/types";
import { Box, Divider, Typography } from "@mui/material";

interface ChallengePostCardProps {
  desafio: Challenge;
}

export function ChallengePostCard({ desafio }: ChallengePostCardProps) {
  const empresaId = desafio.empresaId;
  const { data: company, isLoading } = useGetCompanyProfile(empresaId);

  if (isLoading) {
    return <div>Carregando...</div>;
  }
  console.log(empresaId);
  return (
    <Box sx={{ display: "flex", gap: 1, backgroundColor: "var(--card)", borderRadius: 2, padding: 4, flexDirection: "column" }}>
      <Box sx={{ display: "flex", gap: 2 }}>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2, width: "3rem", height: "3rem" }}>
          <CompanyProfileImage companyId={empresaId} temImagem={company?.temImagem ?? false} />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h5" color="var(--foreground)" className="font-bold">
            {company?.username}
          </Typography>

          <Typography variant="body1" color="var(--muted)">
            {company?.nome}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", padding: 4, gap: 1, ml: 4 }}>
        <Typography variant="h6" color="var(--foreground)" className="font-bold">
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