import { UsersList } from "@/components/profile/user/users-list";
import { useGetGroupById, useGetGroupMembers, usePatchGroup } from "@/hooks/group/useGroup";
import { useUserProfile } from "@/hooks/user/useUserProfile";
import { Box, Card, Divider, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { motion } from "framer-motion";
import { GroupCardEditor } from "../group-card-editor";
import { useState } from "react";
import { InviteMembersModal } from "@/components/group/invite-members-modal";

interface GroupCardProps {
  groupId: number;
  viewDescription?: boolean;
}

export function GroupCard({ groupId, viewDescription }: GroupCardProps) {
  const { data: group, isLoading } = useGetGroupById(groupId);
  const leaderId = group ? group.liderId : '';
  const { data: leaderProfile } = useUserProfile(leaderId);
  const { data: groupMembers } = useGetGroupMembers(groupId);
  const { mutateAsync: editGroup } = usePatchGroup();

  const [isEditing, setIsEditing] = useState(false);
  const [isMembersModalOpen, setIsMembersModalOpen] = useState(false);

  const membersIds = groupMembers?.map(member => member.usuarioId);
  const members = <UsersList ids={membersIds ?? []} type="group" />;

  const createdAt = new Date(group?.createdAt ?? '');
  const createdAtStr = createdAt.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const updatedAt = new Date(group?.updatedAt ?? '');
  const updatedAtStr = updatedAt.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  if (isLoading) {
    return <Typography>Carregando...</Typography>;
  }

  return (
    <>
      <Card
        sx={{
          bgcolor: 'var(--cardSecondary)',
          borderRadius: 2,
          p: 2,
          overflow: 'visible',
          display: 'flex',
          flexDirection: 'column',
          minWidth: "100%",
        }}
      >
        {isEditing ? (
          <GroupCardEditor
            initialName={group?.nome || ""}
            initialDescription={group?.descricao || ""}
            initialIsPublic={group?.publico || false}
            onCancel={() => setIsEditing(false)}
            onSave={async (name, desc, isPublic) => {
              await editGroup({ id: groupId, nome: name, descricao: desc, publico: isPublic });
              setIsEditing(false);
            }}
          />
        ) : (
          <>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h6" color="var(--foreground)" className="font-bold">
                {group?.nome}
              </Typography>
              <motion.button
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 300 }}
                onClick={() => setIsEditing(true)}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                }}
              >
                <EditIcon
                  sx={{
                    color: 'var(--muted)',
                    ':hover': { color: 'var(--primary)' },
                    width: '1.5rem',
                    height: '1.5rem',
                  }}
                />
              </motion.button>
            </Box>

            <Divider sx={{ bgcolor: 'var(--muted)', my: 2 }} />

            <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
              <Typography variant="body1" color="var(--muted)">
                Líder: {leaderProfile?.nome}
              </Typography>
              <Typography variant="body1" color="var(--muted)">
                {group?.publico ? 'Público' : 'Privado'}
              </Typography>
              <Typography variant="body1" color="var(--muted)">
                Criado em: {createdAtStr}
              </Typography>
              {group?.updatedAt && (
                <Typography variant="body1" color="var(--muted)">
                  Última atualização: {updatedAtStr}
                </Typography>
              )}
            </Box>

            {viewDescription && (
              <>
                <Box sx={{ display: 'flex', gap: 2, mt: 2, flexDirection: 'column' }}>
                  <Typography variant="body1" color="var(--foreground)">
                    Descrição:
                  </Typography>
                  <Typography
                    variant="body1"
                    color="var(--foreground)"
                    sx={{
                      backgroundColor: 'var(--card)',
                      borderRadius: 2,
                      padding: 2,
                      maxHeight: '4rem',
                      overflow: 'hidden',
                    }}
                  >
                    {group?.descricao}
                  </Typography>
                </Box>

                <Divider sx={{ bgcolor: 'var(--muted)', my: 2 }} />

                <Box sx={{ display: 'flex', gap: 2, mt: 2, flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="body1" color="var(--foreground)">
                      Membros:
                    </Typography>
                    <motion.button
                      whileHover={{ scale: 1.3 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      onClick={() => setIsMembersModalOpen(true)}
                      style={{ backgroundColor: 'transparent', border: 'none', padding: 0, cursor: 'pointer' }}
                    >
                      <GroupAddIcon sx={{ color: 'var(--muted)', ':hover': { color: 'var(--primary)' }, width: '1.5rem', height: '1.5rem' }} />
                    </motion.button>
                  </Box>
                  <Box sx={{ width: "100%" }}>
                    {members}
                  </Box>
                </Box>
              </>
            )}
          </>
        )}
      </Card>

      <InviteMembersModal
        open={isMembersModalOpen}
        onClose={() => setIsMembersModalOpen(false)}
        groupId={groupId}
      />
    </>
  );
}
