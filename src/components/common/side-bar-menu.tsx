// src/components/common/side-bar-menu.tsx
'use client';

import React from 'react';
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import PeopleIcon from '@mui/icons-material/People';
import GroupsIcon from '@mui/icons-material/Groups';
import BusinessIcon from '@mui/icons-material/Business';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const menuItems = [
  { label: 'Meus Desafios', Icon: WhatshotIcon },
  { label: 'Amigos',       Icon: PeopleIcon    },
  { label: 'Grupos',       Icon: GroupsIcon    },
  { label: 'Empresas',     Icon: BusinessIcon  },
  { label: 'Salvos',       Icon: BookmarkIcon  },
];

export function SidebarMenu() {
  return (
    <Box
      sx={{
        bgcolor: 'var(--card)',
        borderRadius: 2,
        width: 260,
        height: '100vh',
        p: 3,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Título com o "Z" em laranja */}
      <Typography
        variant="h4"
        sx={{ 
          color: 'var(--foreground)', 
          fontWeight: 'bold', 
          mb: 4,
          lineHeight: 1,
        }}
      >
        Connect
        <Box component="span" sx={{ color: 'var(--primary)' }}>
          Z
        </Box>
      </Typography>

      <List sx={{ flex: 1 }}>
        {menuItems.map(({ label, Icon }) => (
          <ListItemButton
            key={label}
            selected={label === 'Meus Desafios'}
            sx={{
              mb: 1,
              py: 1.25,
              px: 2,
              borderRadius: 2,
              color: 'var(--muted)',
              '&:hover': {
                bgcolor: 'var(--bgTertiary)',
              },
              '&.Mui-selected': {
                bgcolor: 'var(--bgTertiary)',
                color: 'var(--foreground)',
                '& .MuiListItemIcon-root': {
                  color: 'var(--primary)',
                }
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <Icon />
            </ListItemIcon>
            <ListItemText
              primary={label}
              primaryTypographyProps={{
                fontSize: '1rem',
                fontWeight: 500,
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
