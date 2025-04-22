'use client';

import { bgColors, colors } from "@/theme/colors";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box } from "@mui/material";
import { motion } from 'framer-motion';

interface ContactCardProps {
  name: string;
  isSelected: boolean;
  onClick: () => void;
}

export function ContactCard({ name, isSelected, onClick }: ContactCardProps) {
  return (
    <motion.div
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        width: '100%' 
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          bgcolor: bgColors.darkSecondary,
          borderRadius: 4,
          p: 1,
          cursor: 'pointer',
          width: '100%',
          border: isSelected ? `2px solid ${colors.primary}` : '2px solid transparent',
          '&:hover': {
            borderColor: colors.primary,
          },
          transition: 'border-color 0.2s ease',
        }}
      >
        <AccountCircleIcon sx={{ color: colors.primary }} />
        <p>{name}</p>
      </Box>
    </motion.div>
  );
}
