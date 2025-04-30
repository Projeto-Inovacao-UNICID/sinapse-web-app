"use client";

import { useGetGroups } from "@/hooks/group/useGroup";
import { usePostChallengeRegistrationGroup } from "@/hooks/challenge/useChallenge";
import { useSession } from "@/hooks/session/useSession";
import { Group } from "@/types";
import { Box, Button, Card, List, ListItem, Modal, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

interface GroupRegistrationModalProps {
  open: boolean;
  onClose: () => void;
  desafioId: string;
}

export function GroupRegistrationModal({ open, onClose, desafioId }: GroupRegistrationModalProps) {
  const { session } = useSession();
  const { data: groups = [], isLoading } = useGetGroups();
  const { mutate: registerGroup, isPending } = usePostChallengeRegistrationGroup();

  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);

  const userId = session?.id;

  // Filtra apenas grupos em que o usuário é o líder
  const myGroups = groups.filter((group: Group) => group.liderId === userId);

  const handleRegister = () => {
    if (!selectedGroupId) return;
    registerGroup({ desafioId, groupId: selectedGroupId }, { onSuccess: onClose });
  };

  const handleSelectGroup = (id: string) => {
    setSelectedGroupId(id);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        <Box
          sx={{
            bgcolor: "var(--card)",
            borderRadius: 4,
            p: 4,
            m: "auto",
            mt: 10,
            width: "90%",
            maxWidth: 500,
            boxShadow: 24,
          }}
        >
          <Typography variant="h5" mb={2} fontWeight="bold" color="var(--foreground)">
            Inscrever grupo no desafio
          </Typography>

          {isLoading ? (
            <Typography variant="body1" color="var(--muted)">
              Carregando grupos...
            </Typography>
          ) : myGroups.length === 0 ? (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography variant="body1" color="var(--muted)">
                Você ainda não é líder de nenhum grupo.
              </Typography>
              <Link href={`/profile/me/${userId}/criar-grupo`} passHref>
                <Button variant="contained" sx={{ bgcolor: "var(--primary)" }}>
                  Criar grupo
                </Button>
              </Link>
            </Box>
          ) : (
            <List disablePadding>
              {myGroups.map((group: Group) => (
                <ListItem key={group.id} disableGutters disablePadding sx={{ mb: 1 }}>
                  <Card
                    onClick={() => handleSelectGroup(group.id)}
                    sx={{
                      p: 2,
                      width: "100%",
                      cursor: "pointer",
                      borderRadius: 2,
                      border: selectedGroupId === group.id ? "2px solid var(--primary)" : "2px solid transparent",
                      bgcolor: "var(--cardSecondary)",
                      "&:hover": {
                        borderColor: "var(--primary)",
                      },
                    }}
                  >
                    <Typography variant="subtitle1" fontWeight="bold" color="var(--foreground)">
                      {group.nome}
                    </Typography>
                    <Typography variant="body2" color="var(--muted)">
                      {group.publico ? "Público" : "Privado"}
                    </Typography>
                  </Card>
                </ListItem>
              ))}
            </List>
          )}

          {myGroups.length > 0 && (
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 3, bgcolor: "var(--primary)", ":hover": { opacity: 0.8 }, cursor: "pointer" }}  
              disabled={!selectedGroupId || isPending}
              onClick={handleRegister}
            >
              {isPending ? "Inscrevendo..." : "Inscrever grupo"}
            </Button>
          )}
        </Box>
      </motion.div>
    </Modal>
  );
}
