'use client';

import { useState } from 'react';
import { Badge, CircularProgress, Popover } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsIconOutlined from '@mui/icons-material/NotificationsOutlined';
import { motion } from 'framer-motion';
import { Notifications } from '@/components/notifications'; 
import { useGetFriendshipInvitations } from '@/hooks/friendship/useFriendship';

const iconStyles = {
  color: 'var(--primary)',
  fontSize: '2rem',
};

const iconButtonStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0',
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
};

export function NotificationButton() {
  const { data: friendshipInvitations, isLoading: isFriendshipInvitationsLoading } = useGetFriendshipInvitations('recebidos');

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const contNotifications = friendshipInvitations ? friendshipInvitations.content.length : 0;
  const hasUnreadNotifications = contNotifications > 0;

  return (
    <>
      <motion.button
        style={iconButtonStyles}
        whileHover={open ? {} : { scale: 1.3 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 300 }}
        onClick={handleClick}
      >
        <Badge
          badgeContent={contNotifications}
          color='error'
          overlap='circular'
          invisible={!hasUnreadNotifications}
        >
          {open ? (<NotificationsIcon sx={iconStyles} />) : (<NotificationsIconOutlined sx={iconStyles} />)}
        </Badge>
      </motion.button>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            mt: 1,
            borderRadius: 2,
            boxShadow: 3,
            width: 360,
            backgroundColor: 'var(--card)',
            color: 'var(--card-foreground)',
          },
        }}
      >
        {isFriendshipInvitationsLoading ? (
          <CircularProgress />
        ) : friendshipInvitations ? (
          <Notifications friendshipInvitations={friendshipInvitations} />
        ) : (
          <></>
        )}
      </Popover>
    </>
  );
}
