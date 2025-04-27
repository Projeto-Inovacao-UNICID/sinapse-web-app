// src/components/ui/SquareImage.tsx
'use client';

import { Box } from '@mui/material';
import React from 'react';

interface SquareImageProps {
  src: string;
  alt?: string;
}

/**
 * Container quadrado que redimensiona a imagem com object-fit: contain,
 * garantindo que ela caiba inteira sem ultrapassar os limites.
 */
export function SquareImage({ src, alt = '' }: SquareImageProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        paddingTop: '100%',  // mantém proporção 1:1
        overflow: 'hidden',
        borderRadius: 1,
        backgroundColor: 'var(--background)' // cor de fundo enquanto carrega
      }}
    >
      <Box
        component="img"
        src={src}
        alt={alt}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100%',
          height: '100%',
          transform: 'translate(-50%, -50%)',
          objectFit: 'contain'  // mudar de cover para contain
        }}
      />
    </Box>
  );
}
