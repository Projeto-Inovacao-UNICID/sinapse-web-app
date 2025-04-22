'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useTheme } from 'next-themes';

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === 'dark';

  const showDarkIcon = (isDark && !hovered) || (!isDark && hovered);
  const showLightIcon = (!isDark && !hovered) || (isDark && hovered);

  return (
    <motion.button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative flex items-center justify-center rounded-full transition-colors duration-300"
      aria-label="Alternar tema"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
      style={{
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        height: '2rem',
        width: '2rem',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.1 }}
    >
      {/* Ícone da lua (modo escuro) */}
      <motion.div
        animate={{ opacity: showDarkIcon ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <DarkModeIcon sx={{ fontSize: '2rem', color: 'var(--primary)' }} />
      </motion.div>

      {/* Ícone do sol (modo claro) */}
      <motion.div
        animate={{ opacity: showLightIcon ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <LightModeIcon sx={{ fontSize: '2rem', color: 'var(--primary)' }} />
      </motion.div>
    </motion.button>
  );
}
