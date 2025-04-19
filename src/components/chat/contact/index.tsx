'use client';

import { bgColors, colors } from "@/theme/colors";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box } from "@mui/material";

interface ContactCardProps {
    name: string;
    isSelected: boolean;
    onClick: () => void;
}

export function ContactCard({ name, isSelected, onClick }: ContactCardProps) {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        bgcolor: bgColors.darkSecondary,
        borderRadius: 4,
        p: 1,
        cursor: 'pointer',
        border: isSelected ? `2px solid ${colors.primary}` : '2px solid transparent',
        '&:hover': {
          borderColor: isSelected ? colors.primary : colors.gray,
        },
        transition: 'border-color 0.2s ease',
      }}
    >
      <AccountCircleIcon sx={{ color: colors.primary }} />
      <p>{name}</p>

    </Box>
  );
}
