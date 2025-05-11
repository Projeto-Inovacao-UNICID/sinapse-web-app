import { useDrop } from 'react-dnd';
import { List, Typography, Box } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import { ChallengeStageParticipantCard } from '../challenge-stage-participant-card';
import { useGetChallengeParticipants } from '@/hooks/challenge/useStageChallenge';
import { useBatchMoveParticipants } from '@/hooks/challenge/useStageChallenge';
import { DND_ITEM_TYPES } from '@/types';
import React from 'react';

interface ChallengeStageParticipantsProps {
  stageId: number;
  challengeId: number;
}

const ChallengeParticipantsListComponent = (
  { stageId, challengeId }: ChallengeStageParticipantsProps,
  ref: React.Ref<HTMLDivElement>
) => {
  const { data: participants, isLoading } = useGetChallengeParticipants(stageId);
  const { mutate: batchMove } = useBatchMoveParticipants();

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

  // Combine o ref do Box com o ref do dropRef
  const combinedRef = (node: HTMLDivElement) => {
    if (ref) {
      // Caso o componente pai tenha um ref, passamos ele aqui
      if (typeof ref === 'function') {
        ref(node);
      } else {
        ref.current = node;
      }
    }
    dropRef(node); // Passamos o dropRef também para o componente
  };

  if (isLoading) {
    return <Typography sx={{ color: 'var(--muted)', mt: 2 }}>Carregando participantes...</Typography>;
  }

  const filtered = participants?.filter((p) => p.estagioRecrutamentoId === stageId) ?? [];

  return (
    <Box
      ref={combinedRef} // Usando o ref combinado
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
        <Typography sx={{ color: 'var(--muted)', mt: 2 }}>Nenhum participante neste estágio.</Typography>
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

// Usando forwardRef para permitir o uso de ref no componente
export const ChallengeParticipantsList = React.forwardRef(ChallengeParticipantsListComponent);
