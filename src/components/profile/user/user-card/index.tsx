import { useUserProfile } from "@/hooks/profile/user/useUserProfile";
import { Box, Button, Card, Typography } from "@mui/material";
import { UserProfileImage } from "@/components/common/user-avatar";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { useDeleteFriendshipRequest, useFriendship } from "@/hooks/friendship/useFriendship";
import { motion } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";

interface UserCardProps {
  id: string;
  type? : "friend" | "group";
}

export function UserCard({ id, type }: UserCardProps) {
  const {data: profile} = useUserProfile(id);
  const { data: friends } = useFriendship();
  const friend = friends?.find(f => f.usuarioId === id);
  const { mutateAsync: removeFriend } = useDeleteFriendshipRequest(friend?.amizadeId);
  const queryClient = useQueryClient();

  const removeFriendship = async() => {
    if (friend) {
      removeFriend();
      await queryClient.invalidateQueries({ queryKey: ['friendship'] });
    }
  };
  return (
    <Card sx={{ bgcolor: "var(--cardSecondary)", display: "flex", flexDirection: "row", gap: 2, p: 4, borderRadius: 2, minWidth: "100%", justifyContent: "space-between" }}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Box sx={{ width: '3rem', height: '3rem' }}>
          <UserProfileImage userId={id} temImagem={profile ? profile.temImagem : false} />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="h6" color="var(--foreground)">
            {profile?.nome}
          </Typography>
          <Typography variant="body2" color="var(--muted)">
            {profile?.username}
          </Typography>
        </Box>
      </Box>
      {type === "friend" && (
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <motion.button
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300 }}
              onClick={removeFriendship}
              style={{ backgroundColor: 'transparent', border: 'none', padding: 0, cursor: 'pointer' }}
          >
            <PersonRemoveIcon sx={{ color: 'var(--muted)', ':hover': { color: 'var(--primary)' }, width: '1.5rem', height: '1.5rem' }} />
          </motion.button>
        </Box>
      )}
    </Card>
  );
}