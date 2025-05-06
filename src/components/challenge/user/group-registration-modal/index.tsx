import { UserProfileImage } from "@/components/common/user-avatar";
import {
  usePostChallengeRegistrationGroup,
  usePostChallengeRegistrationSolo,
} from "@/hooks/challenge/useChallenge";
import { useGetMyGroups } from "@/hooks/group/useGroup";
import { useUserProfile } from "@/hooks/profile/user/useUserProfile";
import { useSession } from "@/hooks/session/useSession";
import { Group } from "@/types";
import {
  Alert,
  Box,
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { useState } from "react";

interface RegisterModalProps {
  open: boolean;
  onClose: () => void;
  desafioId: number;
}

export function RegisterModal({ open, onClose, desafioId }: RegisterModalProps) {
  const { session } = useSession();
  const userId = session?.id;

  const { data: userProfile } = useUserProfile(userId ?? "");
  const { data: groups } = useGetMyGroups();
  const myGroups = groups ? groups.content.filter((group: Group) => group.liderId === userId) : [];

  const { mutate: registerSolo, isPending: isRegisteringSolo } = usePostChallengeRegistrationSolo();
  const { mutate: registerGroup, isPending: isRegisteringGroup } = usePostChallengeRegistrationGroup();

  const [selectedId, setSelectedId] = useState<string | number | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const isRegistering = isRegisteringSolo || isRegisteringGroup;

  const handleRegister = () => {
    if (!selectedId) return;
    setIsSuccess(false);
    setIsError(false);

    const commonCallbacks = {
      onSuccess: () => {
        setIsSuccess(true);
        setTimeout(onClose, 1500); // fecha o modal após sucesso
      },
      onError: () => {
        setIsError(true);
      },
    };

    if  (typeof selectedId === "string" ) {
      registerSolo({ challengeId: desafioId, mensagem: "Inscricao solo" }, commonCallbacks);
    } 
    else {
      registerGroup({ challengeId: desafioId, groupId: selectedId, mensagem: "Inscricao grupo" }, commonCallbacks);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: "var(--card)",
          borderRadius: 4,
          boxShadow: "none",
          p: 4,
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: "bold", color: "var(--foreground)", px: 0 }}>
        Inscrever-se no desafio
      </DialogTitle>
      <DialogContent sx={{ px: 0 }}>
        {isError && <Alert severity="error" sx={{ mb: 2 }}>Erro ao se inscrever no desafio.</Alert>}
        {isSuccess && <Alert severity="success" sx={{ mb: 2 }}>Inscrição realizada com sucesso!</Alert>}

        <Typography variant="body2" sx={{ color: "var(--muted)", mb: 2 }}>
          Você pode se inscrever sozinho ou com um grupo.
        </Typography>

        <List disablePadding>
          {/* Solo */}
          <ListItem disableGutters disablePadding sx={{ mb: 1 }}>
            <Card
              onClick={() => setSelectedId(userId!)}
              sx={{
                p: 2,
                width: "100%",
                cursor: "pointer",
                borderRadius: 2,
                border: selectedId === userId ? "2px solid var(--primary)" : "2px solid transparent",
                bgcolor: "var(--cardSecondary)",
                "&:hover": { borderColor: "var(--primary)" },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1, width: "2rem", height: "2rem" }}>
                <UserProfileImage
                  userId={userId ?? ""}
                  temImagem={userProfile?.temImagem ?? false}
                />
                <Typography variant="subtitle1" fontWeight="bold" color="var(--foreground)">
                  {userProfile?.nome ?? ""}
                </Typography>
              </Box>
              <Typography variant="body2" color="var(--muted)">
                Inscreva-se solo no desafio
              </Typography>
            </Card>
          </ListItem>

          {/* Grupos */}
          {myGroups.map((group: Group) => (
            <ListItem key={group.id} disableGutters disablePadding sx={{ mb: 1 }}>
              <Card
                onClick={() => setSelectedId(group.id)}
                sx={{
                  p: 2,
                  width: "100%",
                  cursor: "pointer",
                  borderRadius: 2,
                  border: selectedId === group.id ? "2px solid var(--primary)" : "2px solid transparent",
                  bgcolor: "var(--cardSecondary)",
                  "&:hover": { borderColor: "var(--primary)" },
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "var(--foreground)" }}>
                  {group.nome}
                </Typography>
                <Typography variant="body2" sx={{ color: "var(--muted)" }}>
                  {group.publico ? "Público" : "Privado"}
                </Typography>
              </Card>
            </ListItem>
          ))}
        </List>

        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
            bgcolor: "var(--primary)",
            color: "white",
            ":hover": { opacity: 0.8 },
            textTransform: "none",
          }}
          disabled={!selectedId || isRegistering}
          onClick={handleRegister}
        >
          {isRegistering
            ? "Inscrevendo..."
            : typeof selectedId === "string"
              ? "Inscrever-se solo"
              : "Inscrever grupo"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
