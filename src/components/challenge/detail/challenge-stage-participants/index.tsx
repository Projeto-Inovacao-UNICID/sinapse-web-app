import { useBatchMoveParticipants } from '@/hooks/challenge/useStageChallenge';
import { stagesChallengeService } from '@/service/challenge/StagesChallengeService';
import { DND_ITEM_TYPES, ParticipantResponseDto } from '@/types';
import InboxIcon from '@mui/icons-material/Inbox';
import { Box, List, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import { ChallengeStageParticipantCard } from '../challenge-stage-participant-card';

interface ChallengeStageParticipantsProps {
  stageId: number;
  challengeId: number;
}

const ChallengeParticipantsListComponent = (
  { stageId, challengeId }: ChallengeStageParticipantsProps,
  ref: React.Ref<HTMLDivElement>
) => {
  const service = stagesChallengeService;
  const [participants, setParticipants] = useState<ParticipantResponseDto[]>([]);

  // Função para buscar os participantes da API
  const fetchParticipants = async () => {
    try {
      const res = await service.getParticipants(stageId);
      setParticipants(res ?? []);
    } catch (error) {
      console.error('Erro ao buscar participantes:', error);
    }
  };

  // Busca inicial
  useEffect(() => {
    fetchParticipants();
  }, [stageId]);

  // Hook atualizado com callback
  const { mutate: batchMove } = useBatchMoveParticipants(() => {
    fetchParticipants(); // Recarrega os dados após movimentar
  });

  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: DND_ITEM_TYPES.PARTICIPANT,
    drop: (item: { participantId: number; currentStageId: number }) => {
      if (item.currentStageId === stageId) return;

      batchMove({
        stageId: item.currentStageId,
        dto: {
          participanteIds: [item.participantId],
          novoEstagioId: stageId,
          mensagem: 'Movido via drag-and-drop',
        },
      });
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const combinedRef = (node: HTMLDivElement) => {
    if (ref) {
      if (typeof ref === 'function') {
        ref(node);
      } else {
        ref.current = node;
      }
    }
    dropRef(node);
  };

  const filtered = participants.filter((p) => p.estagioRecrutamentoId === stageId);

  return (
    <Box
      ref={combinedRef}
      sx={{
        width: '100%',
        minHeight: '150px',
        border: isOver && canDrop ? '2px dashed #26c6da' : '2px dashed transparent',
        borderRadius: 2,
        backgroundColor: isOver && canDrop ? '#e0f7fa' : 'transparent',
        transition: 'all 0.2s ease',
        position: 'relative',
        p: 2,
      }}
    >
      {isOver && canDrop && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            color: '#007c91',
            pointerEvents: 'none',
          }}
        >
          <InboxIcon />
          <Typography variant="body1">Solte aqui para mover</Typography>
        </Box>
      )}

      {!filtered.length && !isOver ? (
        <Typography sx={{ color: 'var(--muted)', mt: 2 }}>
          Nenhum participante neste estágio.
        </Typography>
      ) : (
        <List sx={{ mt: 2, width: '100%' }}>
          {filtered.map((participant) => (
            <ChallengeStageParticipantCard
              participant={participant}
              challengeId={challengeId}
              key={participant.id}
            />
          ))}
        </List>
      )}
    </Box>
  );
};

export const ChallengeParticipantsList = React.forwardRef(ChallengeParticipantsListComponent);
