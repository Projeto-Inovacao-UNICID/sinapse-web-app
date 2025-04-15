'use client';

import { Box } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { bgColors, colors } from "@/theme/colors";

interface ContactProps {
    name: string;
}

export function Contact({ name }: ContactProps) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, bgcolor: bgColors.darkSecondary, borderRadius: 4, p:1, cursor: 'pointer' }}>
        <AccountCircleIcon sx={{ color: colors.primary }} />
        <p>{name}</p>
      </Box>
    );
  }
  