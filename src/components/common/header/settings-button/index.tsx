'use client';

import { ThemeSwitch } from '@/components/switch';
import { usePostLogout } from '@/hooks/logout/useLogout';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import SeetingsIconOutlined from '@mui/icons-material/SettingsOutlined';
import { Box, Divider, Popover, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

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

export function SettingsButton() {
  const router = useRouter();
  const {
    mutate: postLogout,
    status, // usado para definir o estado de carregamento
  } = usePostLogout();

  const isPending = status === 'pending';

  const [settingsAnchorEl, setSettingsAnchorEl] = useState<null | HTMLElement>(null);
  const openSettings = Boolean(settingsAnchorEl);

  const handleClickSettings = (event: React.MouseEvent<HTMLElement>) => {
    setSettingsAnchorEl(event.currentTarget);
  };

  const handleCloseSettings = () => {
    setSettingsAnchorEl(null);
  };

  const handleLogout = () => {
    postLogout(undefined, {
      onSuccess: () => {
        document.cookie = 'token=; path=/; max-age=0';
        router.push('/login');
      },
      onError: (error) => {
        console.error('Erro ao fazer logout:', error);
      },
    });
  };

  return (
    <>
      <motion.button
        style={iconButtonStyles}
        whileHover={{ scale: 1.3 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 300 }}
        onClick={handleClickSettings}
      >
        {openSettings ? <SettingsIcon sx={iconStyles} /> : <SeetingsIconOutlined sx={iconStyles} />}
      </motion.button>

      <Popover
        open={openSettings}
        anchorEl={settingsAnchorEl}
        onClose={handleCloseSettings}
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
            width: 200,
            backgroundColor: 'var(--card)',
            color: 'var(--foreground)',
          },
        }}
      >
        <Box
          sx={{
            width: '100%',
            backgroundColor: 'var(--cardSecondary)',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            p: 2,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ThemeSwitch />
        </Box>
        <Divider />
        <Box
          sx={{
            width: '100%',
            backgroundColor: 'var(--cardSecondary)',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            p: 2,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              color: 'var(--foreground)',
              backgroundColor: 'var(--cardSecondary)',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '0.5rem',
              opacity: isPending ? 0.7 : 1,
              pointerEvents: isPending ? 'none' : 'auto',
            }}
            disabled={isPending}
          >
            <LogoutIcon sx={{ color: 'var(--primary)', fontSize: '2rem' }} />
            <Typography variant="button" color="var(--foreground)">
              {isPending ? 'Saindo...' : 'Sair'}
            </Typography>
          </motion.button>
        </Box>
      </Popover>
    </>
  );
}
