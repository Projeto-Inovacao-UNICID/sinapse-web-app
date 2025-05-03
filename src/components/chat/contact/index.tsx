'use client';

import { Box } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

export interface ContactCardProps {
  name: string;
  isSelected: boolean;
  disabled?: boolean;
  onClick: () => void;
}

export function ContactCard({
  name,
  isSelected,
  disabled = false,
  onClick,
}: ContactCardProps) {
  const { theme } = useTheme();

  const motionProps = disabled
    ? {}
    : {
        whileHover: { scale: 1.05 },
        whileTap: { scale: 0.95 },
        transition: { type: 'spring', stiffness: 300 },
      };

  return (
    <motion.div
      onClick={onClick}
      className="flex items-center gap-2 w-full"
      {...motionProps}
      style={{
        opacity: disabled ? 0.5 : 1,
        pointerEvents: disabled ? 'none' : 'auto',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          bgcolor: 'var(--card)',
          borderRadius: 'var(--radius)',
          padding: 'var(--spacing-unit)',
          cursor: disabled ? 'default' : 'pointer',
          width: '100%',
          border: isSelected
            ? `2px solid var(--primary)`
            : '2px solid transparent',
          '&:hover': {
            borderColor: disabled ? undefined : 'var(--primary)',
          },
          transition: 'border-color 0.2s ease',
        }}
      >
        <AccountCircleIcon sx={{ color: 'var(--primary)' }} />
        <p className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>
          {name}
        </p>
      </Box>
    </motion.div>
  );
}
