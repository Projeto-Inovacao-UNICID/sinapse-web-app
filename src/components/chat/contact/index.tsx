'use client';

import { Box } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

interface ContactCardProps {
  name: string;
  isSelected: boolean;
  onClick: () => void;
}

export function ContactCard({ name, isSelected, onClick }: ContactCardProps) {
  const { theme } = useTheme(); // Obtém o tema atual (light/dark)

  return (
    <motion.div
      onClick={onClick}
      className="flex items-center gap-2 w-full"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          bgcolor: 'var(--card)', // Usa a variável do tema
          borderRadius: 'var(--radius)',
          padding: 'var(--spacing-unit)',
          cursor: 'pointer',
          width: '100%',
          border: isSelected ? `2px solid var(--primary)` : '2px solid transparent',
          '&:hover': {
            borderColor: 'var(--primary)', // Cor da borda no hover
          },
          transition: 'border-color 0.2s ease',
        }}
      >
        <AccountCircleIcon sx={{ color: 'var(--primary)' }} />
        <p className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>{name}</p> {/* Texto colorido dependendo do tema */}
      </Box>
    </motion.div>
  );
}
