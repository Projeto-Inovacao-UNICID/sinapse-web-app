// src/components/challenge/common/challenge-filters/index.tsx
'use client';

import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  InputAdornment,
  Typography,
  IconButton,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  Divider
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface ChallengeFilterProps {
  areaOptions: string[];
  statusOptions: string[];
  onSearch: (v: string) => void;
  onAreaChange: (v: string) => void;
  onStatusChange: (v: string) => void;
  areaValue: string;
  statusValue: string;
}

export function ChallengeFilter({
  areaOptions,
  statusOptions,
  onSearch,
  onAreaChange,
  onStatusChange,
  areaValue,
  statusValue
}: ChallengeFilterProps) {
  const [openArea, setOpenArea] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);

  return (
    <Paper
      sx={{
        p: 2,
        bgcolor: 'var(--card)',
        borderRadius: 2,
        height: 'fit-content'      // faz o Paper crescer/encolher
      }}
    >
      {/* 1) Campo de busca redondo com fonte ajustada */}
      <TextField
        fullWidth
        size="small"
        multiline
        maxRows={2}
        placeholder="Pesquisar desafios ou palavra-chave..."
        onChange={e => onSearch(e.target.value)}
        InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'var(--muted)' }} />
                </InputAdornment>
            ),
            sx: {
                bgcolor: 'var(--input)',
                borderRadius: 8,
                fontSize: '0.875rem',
                py: 0.5,
                alignItems: 'center',
                minHeight: 40,
                maxHeight: 56,
                overflow: 'auto'
            }
        }}
        inputProps={{
            style: {
            fontSize: '0.875rem',
            whiteSpace: 'pre-wrap',
            lineHeight: 1.2,
            paddingTop: 8
            }
        }}
        sx={{
            mb: 2,
            '& .MuiOutlinedInput-root fieldset': { border: 'none' },
            '& .MuiInputBase-input': {
                color: 'var(--foreground)',
                fontSize: '0.85rem',
                whiteSpace: 'pre-wrap',
                lineHeight: 1.2,
                paddingTop: 0,
                paddingBottom: 0,
                overflow: 'auto',
                display: 'flex',
                alignItems: 'center',
                minHeight: 40
            },
            '& .MuiInputAdornment-root': {
                alignItems: 'center',
                height: '100%'
            },
            '& .MuiInputBase-input::placeholder': {
                color: 'var(--muted)',
                opacity: 1,
                fontSize: '0.85rem',
                whiteSpace: 'pre-wrap',
                lineHeight: 1.2,
                wordBreak: 'break-word'
            }
        }}
        />

      {/* 2) Contêiner dos filtros */}
      <Box
        sx={{
          bgcolor: 'var(--input)',
          borderRadius: 2,
          height: 'fit-content'    // também responsivo ao conteúdo
        }}
      >
        <List disablePadding>
          {/* Área */}
          <ListItemButton
            onClick={() => setOpenArea(v => !v)}
            sx={{ px: 2, py: 1.5 }}
          >
            <ListItemText
              primary={
                <Typography variant="subtitle2" sx={{ color: 'var(--foreground)' }}>
                  Área
                </Typography>
              }
              secondary={
                <Typography variant="body2" sx={{ color: 'var(--muted)' }}>
                  {areaValue || 'Todas'}
                </Typography>
              }
            />
            <IconButton size="small">
              {openArea ? (
                <ArrowDropUpIcon sx={{ color: 'var(--muted)' }} />
              ) : (
                <ArrowDropDownIcon sx={{ color: 'var(--muted)' }} />
              )}
            </IconButton>
          </ListItemButton>

          <Collapse in={openArea} timeout="auto" unmountOnExit>
            <List disablePadding component="div">
              {['Todas', ...areaOptions].map(opt => (
                <ListItemButton
                  key={opt}
                  onClick={() => {
                    onAreaChange(opt === 'Todas' ? '' : opt);
                    setOpenArea(false);
                  }}
                  sx={{ pl: 4, py: 1 }}
                >
                  <ListItemText
                    primary={
                      <Typography
                        variant="body2"
                        sx={{
                          color:
                            (opt === 'Todas' && !areaValue) || opt === areaValue
                              ? 'var(--primary)'
                              : 'var(--foreground)'
                        }}
                      >
                        {opt}
                      </Typography>
                    }
                  />
                </ListItemButton>
              ))}
            </List>
          </Collapse>

          <Divider sx={{ borderColor: 'var(--border)' }} />

          {/* Status */}
          <ListItemButton
            onClick={() => setOpenStatus(v => !v)}
            sx={{ px: 2, py: 1.5 }}
          >
            <ListItemText
              primary={
                <Typography variant="subtitle2" sx={{ color: 'var(--foreground)' }}>
                  Status
                </Typography>
              }
              secondary={
                <Typography variant="body2" sx={{ color: 'var(--muted)' }}>
                  {statusValue || 'Todos'}
                </Typography>
              }
            />
            <IconButton size="small">
              {openStatus ? (
                <ArrowDropUpIcon sx={{ color: 'var(--muted)' }} />
              ) : (
                <ArrowDropDownIcon sx={{ color: 'var(--muted)' }} />
              )}
            </IconButton>
          </ListItemButton>

          <Collapse in={openStatus} timeout="auto" unmountOnExit>
            <List disablePadding component="div">
              {['Todos', ...statusOptions].map(opt => (
                <ListItemButton
                  key={opt}
                  onClick={() => {
                    onStatusChange(opt === 'Todos' ? '' : opt);
                    setOpenStatus(false);
                  }}
                  sx={{ pl: 4, py: 1 }}
                >
                  <ListItemText
                    primary={
                      <Typography
                        variant="body2"
                        sx={{
                          color:
                            (opt === 'Todos' && !statusValue) || opt === statusValue
                              ? 'var(--primary)'
                              : 'var(--foreground)'
                        }}
                      >
                        {opt}
                      </Typography>
                    }
                  />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </List>
      </Box>
    </Paper>
  );
}
