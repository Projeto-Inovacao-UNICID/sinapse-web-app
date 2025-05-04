import { Avatar, Box, IconButton, Typography, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";

export function ChallengeDetailHeader({
  company,
  onFollow,
  isFollowing,
  isCompanyUser
}: {
  company: { id: string; nome: string; avatarUrl?: string; username: string };
  onFollow(): void;
  isFollowing: boolean;
  isCompanyUser: boolean;
}) {
  const router = useRouter();
  return (
    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
      <IconButton onClick={() => router.back()} sx={{ color: "var(--foreground)" }}>
        <ArrowBackIcon />
      </IconButton>
      <Avatar
        src={company.avatarUrl}
        sx={{ bgcolor: "var(--primary)", ml: 1, mr: 2 }}
      >
        {company.nome[0]}
      </Avatar>
      <Typography variant="h6" sx={{ color: "var(--foreground)", fontWeight: "bold" }}>
        {company.nome}
      </Typography>
      <Box flexGrow={1}/>
      {!isCompanyUser && (
        <Button
          size="small"
          variant="text"
          sx={{ color: "var(--primary)", textTransform: "none" }}
          onClick={onFollow}
        >
          {isFollowing ? "Seguindo" : "+ Seguir"}
        </Button>
      )}
    </Box>
  );
}
