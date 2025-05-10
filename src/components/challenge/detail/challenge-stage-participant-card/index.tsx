"use client";

import { ConfirmationDialog } from "@/components/common/confirmation-dialog";
import DeleteButton from "@/components/common/icon-buttons/delete-button";
import { UserProfileImage } from "@/components/common/user-avatar";
import { usePostChallengeWinner, useRemoveParticipant } from "@/hooks/challenge/useChallenge";
import { useGetGroupById } from "@/hooks/group/useGroup";
import { useUserProfile } from "@/hooks/profile/user/useUserProfile";
import { ParticipantResponseDto } from "@/types";
import { Box, Divider, ListItemButton, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import EmojiEvents from '@mui/icons-material/EmojiEvents';
import IconButton from "@/components/common/icon-buttons";

interface ChallengeStageParticipantCardProps {
  participant: ParticipantResponseDto;
  challengeId: number;
}

export function ChallengeStageParticipantCard({ participant, challengeId }: ChallengeStageParticipantCardProps) {
  const { data: grupo } = useGetGroupById(participant.grupoId ?? 0);
  const { data: user } = useUserProfile(participant.usuarioId);
  const { mutateAsync: removeParticipant } = useRemoveParticipant();
  const [openWinnerModal, setOpenWinnerModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { mutateAsync: electWinner } = usePostChallengeWinner();
  const router = useRouter();

  const nome = grupo ? grupo.nome : user?.nome ?? "";

  const handleRemoveParticipant = async () => {
    await removeParticipant({ challengeId: challengeId, participantId: participant.id});
  };

  const handleElectWinner = async () => {
    await electWinner({ challengeId: challengeId, participantId: participant.id});
  };

  const handleViewParticipant = () => {
    router.push(`/profile/me/${participant.usuarioId}`);
  }

  return (
    <Box sx={{ width: '100%' }}>
      <ListItemButton 
        onClick={(e) => e.stopPropagation()}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          bgColor: "var(--cardSecondary)",
          p: 2,
          mb: 1
        }}
      >
        <Box sx={{ display: "flex", gap: 2, width: '100%' }}>
          <Box sx={{ width: '2rem', height: '2rem' }}>
            <UserProfileImage userId={participant.usuarioId} temImagem={user?.temImagem ?? false} />
          </Box>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center", justifyContent: "space-between", width: '100%' }}>
            <Box>
              <Typography onClick={handleViewParticipant} variant="h5" sx={{ color: "var(--foreground)", fontWeight: "bold" }}>
                {nome}
              </Typography>
              <Typography variant="body2" sx={{ color: "var(--muted)" }}>
                Status: {participant.status}
              </Typography>
              <Typography variant="body2" sx={{ color: "var(--muted)" }}>
                Avaliação: {participant.avaliacao}
              </Typography>
              <Typography variant="body2" sx={{ color: "var(--muted)" }}>
                Feedback: {participant.feedback}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton icon={<EmojiEvents />} onClick={() => setOpenWinnerModal(true)} />
              <DeleteButton size="small" onClick={() => setOpenDeleteModal(true)} />
            </Box>
          </Box>
        </Box>
      </ListItemButton>
      <Divider sx={{ bgColor: "var(--muted)", my: 2 }} />
      <ConfirmationDialog open={openWinnerModal} title="Deseja eleger participante como vencedor?" description="Você está prestes a eleger o participante como um dos vencedores do desafio." onCancel={() => setOpenWinnerModal(false)} onConfirm={handleElectWinner} confirmText="Confirmar" /> 
      <ConfirmationDialog open={openDeleteModal} title="Deseja remover o participante?" description="Essa ação é irreversível e removerá todos os dados do participante." onCancel={() => setOpenDeleteModal(false)} onConfirm={handleRemoveParticipant} confirmText="Deletar" />
    </Box>
  );
}
