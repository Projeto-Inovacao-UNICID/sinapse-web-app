import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';

interface GroupCardEditorProps {
  initialName: string;
  initialDescription: string;
  initialIsPublic: boolean;
  onCancel: () => void;
  onSave: (newName: string, newDescription: string, isPublic: boolean) => void;
}

export function GroupCardEditor({
  initialName,
  initialDescription,
  initialIsPublic,
  onCancel,
  onSave,
}: GroupCardEditorProps) {
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);
  const [isPublic, setIsPublic] = useState(initialIsPublic);

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <TextField
        label="Nome do Grupo"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{
          '& .MuiOutlinedInput-root': {
            background: 'var(--input)',
            borderRadius: 'var(--radius)',
            color: 'var(--foreground)',
            '&:hover fieldset': {
              borderColor: 'var(--primary)',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'var(--primary)',
            },
          },
          '& .MuiInputLabel-root': {
            color: 'var(--muted)',
            '&.Mui-focused': {
              color: 'var(--primary)',
            },
          },
        }}
      />

      <TextField
        label="Descrição"
        fullWidth
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        minRows={3}
        sx={{
          '& .MuiOutlinedInput-root': {
            background: 'var(--input)',
            borderRadius: 'var(--radius)',
            color: 'var(--foreground)',
            '&:hover fieldset': {
              borderColor: 'var(--primary)',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'var(--primary)',
            },
          },
          '& .MuiInputLabel-root': {
            color: 'var(--muted)',
            '&.Mui-focused': {
              color: 'var(--primary)',
            },
          },
        }}
      />

      <Box display="flex" alignItems="center">
        <Button
          variant={isPublic ? 'contained' : 'outlined'}
          onClick={() => setIsPublic(!isPublic)}
          sx={{
            marginRight: 2,
            color: isPublic ? 'white' : 'var(--muted)',
            bgcolor: isPublic ? 'var(--primary)' : 'var(--cardSecondary)',
            borderRadius: 2,
            borderColor: 'var(--border)',
          }}
        >
          {isPublic ? 'Público' : 'Privado'}
        </Button>
        <Typography variant="body2" sx={{ color: 'var(--muted)' }}>
          Visibilidade do grupo
        </Typography>
      </Box>

      <Box  sx={{ display: 'flex', gap: 1, mt: 1 }}>
        <Button
          variant="contained"
          onClick={() => onSave(name, description, isPublic)}
          disabled={!name || !description}
          sx={{
            backgroundColor: 'var(--primary)',
            color: 'white',
            borderRadius: 2,
            '&:hover': {
              opacity: 0.8,
            },
            '&:disabled': {
              opacity: 0.5,
              cursor: 'not-allowed',
            },
          }}
        >
          Salvar
        </Button>
        <Button
          variant="text"
          onClick={onCancel}
          sx={{ color: 'var(--muted)', borderRadius: 2 }}
        >
          Cancelar
        </Button>
      </Box>
    </Box>
  );
}
