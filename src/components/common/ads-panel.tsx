// src/components/common/ads-panel.tsx
'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';

export function AdsPanel() {
  return (
    <Box
      sx={{
        bgcolor: 'var(--card)',
        borderRadius: 2,
        p: 2,
        mb: 3,
        textAlign: 'center',
        minHeight: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--muted)',
      }}
    >
      <Typography variant="h6">Ads</Typography>
    </Box>
  );
}
