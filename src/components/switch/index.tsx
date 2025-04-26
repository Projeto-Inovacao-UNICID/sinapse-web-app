'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useTheme } from 'next-themes';
import { Typography } from '@mui/material';

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === 'dark';
  const showDark = (isDark && !hovered) || (!isDark && hovered);
  const showLight = !showDark;

  const iconSize = '2rem';

  return (
    <motion.button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.05 }}
      className="flex items-center gap-2 px-3 py-1 rounded-full transition-colors duration-300"
      style={{
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        color: 'var(--foreground)',
      }}
    >
      <AnimatePresence mode="wait">
        {showDark && (
          <motion.div
            key="dark"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
          >
            <DarkModeIcon sx={{ fontSize: iconSize, color: 'var(--primary)' }} />
            <span> 
              <Typography variant="button" color="var(--foreground)">
                Tema escuro
              </Typography>
            </span>
          </motion.div>
        )}

        {showLight && (
          <motion.div
            key="light"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
          >
            <LightModeIcon sx={{ fontSize: iconSize, color: 'var(--primary)' }} />
            <span>
              <Typography variant="button" color="var(--foreground)">
                Tema claro
              </Typography>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
