'use client';

import { useState } from 'react';
import { Button, Popover } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

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

  const [settingsAnchorEl, setSettingsAnchorEl] = useState<null | HTMLElement>(null);
  const openSettings = Boolean(settingsAnchorEl);

  const handleClickSettings = (event: React.MouseEvent<HTMLElement>) => {
    setSettingsAnchorEl(event.currentTarget);
  };

  const handleCloseSettings = () => {
    setSettingsAnchorEl(null);
  };

  const handleLogout = () => {
    // Remover o cookie de token para fazer o logout
    document.cookie = 'token=; path=/; max-age=0';
    // Redirecionar para a página de login
    router.push('/login');
  };

  return (
    <>
      {/* Botão de Configurações */}
      <motion.button
        style={iconButtonStyles}
        whileHover={{ scale: 1.3 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 300 }}
        onClick={handleClickSettings}
      >
        <SettingsIcon sx={iconStyles} />
      </motion.button>

      {/* Popover de Configurações */}
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
            color: 'var(--card-foreground)',
          },
        }}
      >
        <Button onClick={handleLogout} sx={{ width: '100%' }}>
          Logout
        </Button>
      </Popover>
    </>
  );
}
