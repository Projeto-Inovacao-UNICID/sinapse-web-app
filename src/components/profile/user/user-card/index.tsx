import { useUserProfile } from "@/hooks/user/useUserProfile";
import { Box, Card, Typography } from "@mui/material";
import { UserProfileImage } from "../avatar";

interface UserCardProps {
  friendId: string;
}

export function UserCard({ friendId }: UserCardProps) {
  const {data: profile} = useUserProfile(friendId);
  return (
    <Card sx={{ bgcolor: "var(--cardSecondary)", display: "flex", flexDirection: "row", gap: 2, p: 2, borderRadius: 2, minWidth: "100%" }}>
      <Box sx={{ width: '3rem', height: '3rem' }}>
        <UserProfileImage userId={friendId} temImagem={profile ? profile.temImagem : false} />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography variant="h6" color="var(--foreground)">
          {profile?.nome}
        </Typography>
        <Typography variant="body2" color="var(--muted)">
          {profile?.username}
        </Typography>
      </Box>
    </Card>
  );
}