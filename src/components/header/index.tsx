'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { bgColors, colors } from '@/theme/colors';
import ChatIcon from '@mui/icons-material/Chat';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';

const iconStyles = {
  color: colors.primary,
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

export function Header() {
  const router = useRouter();

  const navClick = (route: string) => {
    router.push(`${route}`);
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '65px',
        zIndex: 1000,
        backgroundColor: bgColors.darkSecondary,
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        display: 'grid',
        gridTemplateColumns: '1fr minmax(0, 10fr) 1fr',
        alignItems: 'center',
      }}
    >
      <div style={{ gridColumn: '2', display: 'flex', alignItems: 'center', gap: 16 }}>
        {/* Logo animada com rotação infinita no hover */}
        <motion.img
          src="/assets/logo.png"
          alt="Logo"
          style={{ height: '2.5rem', cursor: 'pointer' }}
          onClick={() => navClick('/')}
          whileHover={{
            scale: 1.3,
            rotate: 360,
            transition: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 3,
              ease: 'linear',
            },
          }}
          whileTap={{ scale: 0.95 }}
        />

        {/* Barra de busca */}
        <motion.div
          style={{ flexGrow: 1, margin: '0 1rem' }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Buscar..."
            size="small"
            sx={{
              backgroundColor: colors.gray2,
              border: 'none',
              borderRadius: 2,
              input: { color: colors.white },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'transparent',
                },
                '&:hover fieldset': {
                  borderRadius: 2,
                  borderColor: colors.primary,
                },
                '&.Mui-focused fieldset': {
                  borderRadius: 2,
                  borderColor: colors.primary,
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: colors.primary }} />
                </InputAdornment>
              ),
            }}
          />
        </motion.div>

        {/* Ícones do menu */}
        <div style={{ display: 'flex', gap: 16 }}>
          {[
            { icon: <HomeIcon sx={iconStyles} />, route: '/' },
            { icon: <NotificationsIcon sx={iconStyles} /> },
            { icon: <EmojiEventsIcon sx={iconStyles} /> },
            { icon: <ChatIcon sx={iconStyles} />, route: '/conversas' },
            { icon: <PersonIcon sx={iconStyles} />, route: '/profile/me' },
            { icon: <SettingsIcon sx={iconStyles} /> },
          ].map(({ icon, route }, index) => (
            <motion.button
              key={index}
              style={iconButtonStyles}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300 }}
              onClick={() => route && navClick(route)}
            >
              {icon}
            </motion.button>
          ))}
        </div>
      </div>
    </header>
  );
}
