import IconButton from "@/components/common/icon-buttons";
import DeleteButton from "@/components/common/icon-buttons/delete-button";
import EditButton from "@/components/common/icon-buttons/edit-button";
import { ConfirmationDialog } from "@/components/common/confirmation-dialog";
import { InviteMembersModal } from "@/components/group/invite-members-modal";
import { UsersList } from "@/components/profile/user/users-list";
import { useDeleteGroup, useGetGroupById, useGetGroupMembers, usePatchGroup, usePostQuitGroup } from "@/hooks/group/useGroup";
import { useUserProfile } from "@/hooks/profile/user/useUserProfile";
import { useSession } from "@/hooks/session/useSession";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box, Card, Divider, Typography } from "@mui/material";
import { useState } from "react";
import { GroupCardEditor } from "../group-card-editor";

interface GroupCardProps {
  groupId: number;
  viewDescription?: boolean;
}

export function GroupCard({ groupId, viewDescription }: GroupCardProps) {
  const { data: group, isLoading } = useGetGroupById(groupId);
  const leaderId = group ? group.liderId : '';
  const { data: leaderProfile } = useUserProfile(leaderId);
  const { data: groupMembers } = useGetGroupMembers(groupId);
  const { mutateAsync: editGroup } = usePatchGroup(groupId);
  const { session } = useSession();
  const { mutateAsync: deleteGroup } = useDeleteGroup(groupId);
  const { mutateAsync: quitGroup } = usePostQuitGroup(groupId);

  const isLeader = session?.id === leaderId;
  const isUser = session ? session.roles.includes('ROLE_USER') : false;

  const [isEditing, setIsEditing] = useState(false);
  const [isMembersModalOpen, setIsMembersModalOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openQuitModal, setOpenQuitModal] = useState(false);

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

  const handleDelete = async () => {
    await deleteGroup();
    setOpenDeleteModal(false);
  };

  const handleQuit = async () => {
    await quitGroup();
    setOpenQuitModal(false);
  };

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
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" color="var(--foreground)" className="font-bold">
            {!isEditing && group?.nome}
          </Typography>
          {isLeader && (
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <EditButton size="small" onClick={() => setIsEditing(!isEditing)} isEditing={isEditing} />
              <DeleteButton size="small" onClick={() => setOpenDeleteModal(true)} />
            </Box>
          )}
          {!isLeader && isUser && (
            <IconButton
              icon={<LogoutIcon />}
              onClick={() => setOpenQuitModal(true)}
            />
          )}
        </Box>

        {isEditing ? (
          <GroupCardEditor
            initialName={group?.nome || ""}
            initialDescription={group?.descricao || ""}
            initialIsPublic={group?.publico || false}
            onCancel={() => setIsEditing(false)}
            onSave={async (name, desc, isPublic) => {
              await editGroup({ nome: name, descricao: desc, publico: isPublic });
              setIsEditing(false);
            }}
          />
        ) : (
          <>
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
                    {isLeader && (
                      <IconButton
                        icon={<GroupAddIcon />}
                        onClick={() => setIsMembersModalOpen(true)}
                      />
                    )}
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

      <ConfirmationDialog
        open={openDeleteModal}
        title="Deseja deletar o grupo?"
        description="Essa ação é irreversível e removerá todos os dados do grupo."
        onCancel={() => setOpenDeleteModal(false)}
        onConfirm={handleDelete}
        confirmText="Deletar"
      />

      <ConfirmationDialog
        open={openQuitModal}
        title="Deseja sair do grupo?"
        description="Você não terá mais acesso a este grupo."
        onCancel={() => setOpenQuitModal(false)}
        onConfirm={handleQuit}
        confirmText="Sair"
      />
    </>
  );
}