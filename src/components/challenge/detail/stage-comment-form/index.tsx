// src/components/challenge/detail/stage-comment-form/index.tsx
'use client';

import React, { ChangeEvent, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  IconButton,
  Typography
} from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useUploadStageFile } from '@/hooks/challenge/useStageChallenge';

export interface StageCommentFormProps {
  stageId: number;
  participantId: string;
  onSent?: () => void;
}

export function StageCommentForm({
  stageId,
  participantId,
  onSent
}: StageCommentFormProps) {
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const upload = useUploadStageFile(stageId, participantId);
  const isUploading = upload.status === 'pending';

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (file) {
      try {
        await upload.mutateAsync(file);
        setFile(null);
        onSent?.();
      } catch (err) {
        console.error("Falha no upload:", err);
      }
    }
    setText('');
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
      <TextField
        fullWidth
        multiline
        minRows={2}
        placeholder="Digite um comentário..."
        value={text}
        onChange={e => setText(e.target.value)}
        sx={{
          bgcolor: 'var(--card)',
          borderRadius: 1,
          '& .MuiOutlinedInput-root fieldset': { border: 'none' },
          '& .MuiInputBase-input': { color: 'var(--foreground)' }
        }}
      />

      <IconButton component="label" sx={{ color: 'var(--primary)' }}>
        <AttachFileIcon />
        <input type="file" hidden onChange={handleFileChange} />
      </IconButton>

      {file && (
        <Typography
          variant="caption"
          sx={{ flexGrow: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          {file.name}
        </Typography>
      )}

      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={isUploading}
        sx={{ bgcolor: 'var(--primary)', textTransform: 'none' }}
      >
        {isUploading ? 'Enviando…' : 'Enviar'}
      </Button>
    </Box>
  );
}
