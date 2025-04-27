'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Stack,
  Button
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';

interface PostShareDialogProps {
  open: boolean;
  onClose: () => void;
  postId: string;
}

export function PostShareDialog({ open, onClose, postId }: PostShareDialogProps) {
  const [copied, setCopied] = useState(false);
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/post/${postId}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // silenciar
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        sx: {
          backgroundColor: 'var(--card)',
          color: 'var(--foreground)',
          borderRadius: 2
        }
      }}
    >
      <DialogTitle
        sx={{ m: 0, p: 2, position: 'relative', color: 'var(--foreground)' }}
      >
        Compartilhar Publicação
        <IconButton
          aria-label="fechar"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8, color: 'var(--muted)' }}
          size="large"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ px: 3, pt: 1, pb: 3 }}>
        <Typography variant="body2" sx={{ color: 'var(--muted)', mb: 2 }}>
          Use o link abaixo ou compartilhe em sua rede social:
        </Typography>

        <TextField
          fullWidth
          variant="outlined"
          value={url}
          InputProps={{
            readOnly: true,
            sx: {
              backgroundColor: 'var(--input)',
              color: 'var(--foreground)',
              borderRadius: 'var(--radius)',
              '& .MuiOutlinedInput-root fieldset': {
                borderColor: 'var(--primary)'
              },
              '& .MuiOutlinedInput-root:hover fieldset': {
                borderColor: 'var(--primary)'
              }
            },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleCopy} edge="end" size="large" sx={{ color: 'var(--primary)' }}>
                  <ContentCopyIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
          sx={{ mb: 3 }}
        />

        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 3 }}>
          <Button
            startIcon={<TwitterIcon />}
            variant="outlined"
            component="a"
            href={`https://twitter.com/share?url=${encodeURIComponent(url)}`}
            target="_blank"
            sx={{
              flex: 1,
              textTransform: 'none',
              borderColor: 'var(--primary)',
              color: 'var(--primary)',
              '&:hover': { backgroundColor: 'var(--input)' }
            }}
          >
            Twitter
          </Button>
          <Button
            startIcon={<FacebookIcon />}
            variant="outlined"
            component="a"
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
            target="_blank"
            sx={{
              flex: 1,
              textTransform: 'none',
              borderColor: 'var(--primary)',
              color: 'var(--primary)',
              '&:hover': { backgroundColor: 'var(--input)' }
            }}
          >
            Facebook
          </Button>
        </Stack>

        <Button
          fullWidth
          variant={copied ? 'contained' : 'outlined'}
          onClick={handleCopy}
          disabled={copied}
          sx={{
            textTransform: 'none',
            ...(copied
              ? { backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }
              : { borderColor: 'var(--primary)', color: 'var(--primary)' }
            ),
            '&:hover': copied ? {} : { backgroundColor: 'var(--input)' }
          }}
        >
          {copied ? 'Link copiado!' : 'Copiar link'}
        </Button>
      </DialogContent>
    </Dialog>
  );
}