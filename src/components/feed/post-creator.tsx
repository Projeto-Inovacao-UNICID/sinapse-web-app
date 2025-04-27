// src/components/feed/post-creator.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Avatar,
  CircularProgress,
  styled
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloseIcon from '@mui/icons-material/Close';
import { useCreatePost, PostagemArquivoPayload } from '@/hooks/posts/useCreatePost';

const PreviewContainer = styled(Box)({
  display: 'grid',
  gap: 8
});

const PreviewItem = styled(Box)({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: 4,
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  '& .remove-btn': {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: 'rgba(0,0,0,0.5)',
    color: 'white',
    padding: 4,
    borderRadius: '50%',
    zIndex: 1
  }
});

export function PostCreator() {
  const [text, setText] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const { mutate: createPost, status } = useCreatePost();
  const isLoading = status === 'pending';

  // gerar previews
  useEffect(() => {
    const urls = files.map(file => URL.createObjectURL(file));
    setPreviews(urls);
    return () => urls.forEach(url => URL.revokeObjectURL(url));
  }, [files]);

  // converter para payload
  const prepareArquivos = async (): Promise<PostagemArquivoPayload[]> =>
    Promise.all(
      files.map(
        file =>
          new Promise<PostagemArquivoPayload>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
              const b64 = (reader.result as string).split(',', 2)[1];
              resolve({
                dados_arquivo: b64,
                nome_arquivo: file.name,
                tipo_arquivo: file.type,
                tamanho_arquivo: file.size
              });
            };
            reader.onerror = () => reject(reader.error);
            reader.readAsDataURL(file);
          })
      )
    );

  const handleSubmit = async () => {
    if (!text.trim()) return;
    const payload = {
      conteudo: text,
      repost_id: null,
      arquivos: files.length ? await prepareArquivos() : undefined
    };
    createPost(payload, {
      onSuccess: () => {
        setText('');
        setFiles([]);
      }
    });
  };

  const handleRemove = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  // grid settings
  const gridCols =
    previews.length === 1 ? '1fr' : previews.length === 2 ? '1fr 1fr' : '1fr 1fr';
  const gridRows = previews.length === 3 ? '150px 150px' : '150px';

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        backgroundColor: 'var(--card)',
        borderRadius: 2,
        p: 2,
        width: '100%'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ bgcolor: 'var(--muted)', width: 32, height: 32, fontSize: 14 }}>
          U
        </Avatar>
        <TextField
          placeholder="Poste algo que vai mudar o game..."
          variant="filled"
          fullWidth
          multiline
          minRows={1}
          maxRows={4}
          value={text}
          onChange={e => setText(e.target.value)}
          InputProps={{
            disableUnderline: true,
            sx: {
              bgcolor: 'var(--background)',
              borderRadius: '999px',
              px: 3,
              py: 1.5,
              color: 'var(--muted)',
              fontSize: 14
            },
            endAdornment: (
              <IconButton component="label" size="small" sx={{ mr: 1 }}>
                <AttachFileIcon sx={{ color: 'var(--muted)' }} />
                <input
                  type="file"
                  hidden
                  multiple
                  accept="image/*"
                  onChange={e =>
                    setFiles(e.target.files ? Array.from(e.target.files) : [])
                  }
                />
              </IconButton>
            )
          }}
        />
        <IconButton
          onClick={handleSubmit}
          disabled={isLoading}
          size="medium"
          sx={{
            bgcolor: 'var(--primary)',
            '&:hover': { bgcolor: 'rgba(255,120,0,0.8)' },
            color: 'white',
            width: 36,
            height: 36
          }}
        >
          {isLoading ? <CircularProgress size={20} color="inherit" /> : <ArrowForwardIosIcon fontSize="small" />}
        </IconButton>
      </Box>

      {previews.length > 0 && (
        <PreviewContainer
          sx={{
            gridTemplateColumns: gridCols,
            gridAutoRows: gridRows
          }}
        >
          {previews.slice(0, 4).map((src, i) => (
            <PreviewItem key={i} sx={ i === 0 && previews.length === 3 ? { gridRow: '1 / span 2' } : {} }>
              <IconButton
                size="small"
                className="remove-btn"
                onClick={() => handleRemove(i)}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
              <img src={src} alt={`preview-${i}`} />
            </PreviewItem>
          ))}
        </PreviewContainer>
      )}
    </Box>
  );
}