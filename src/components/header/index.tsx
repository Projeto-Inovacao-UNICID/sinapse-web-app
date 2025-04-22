'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

import { bgColors, colors } from '@/theme/colors';
import ChatIcon from '@mui/icons-material/Chat';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';

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
    router.push(`/${route}`);
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.5rem 1rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    }}
    >

      {/* Logo animada com rotação infinita no hover */}
      <motion.img
        src="/assets/logo.png"
        alt="Logo"
        style={{ height: '2.5rem', cursor: 'pointer' }}
        onClick={() => navClick('')}
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

      {/* Ícones do menu */}
      <div style={{ display: 'flex', gap: 16 }}>
        {[
          { icon: <HomeIcon sx={iconStyles} />, route: '' },
          { icon: <NotificationsIcon sx={iconStyles} /> },
          { icon: <EmojiEventsIcon sx={iconStyles} /> },
          { icon: <ChatIcon sx={iconStyles} />, route: 'conversas' },
          { icon: <PersonIcon sx={iconStyles} />, route: 'profile/me' },
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
    </header>
  );
}
