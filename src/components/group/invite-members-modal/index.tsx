import { useFriendship } from "@/hooks/friendship/useFriendship";
import { usePostGroupInvite } from "@/hooks/group/useGroup";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Friend } from "@/types";

interface InviteMembersModalProps {
  open: boolean;
  onClose: () => void;
  groupId: number;
}

export function InviteMembersModal({ open, onClose, groupId }: InviteMembersModalProps) {
  const { data: friends = [], isLoading } = useFriendship();
  const { mutateAsync: inviteToGroup, isPending } = usePostGroupInvite(groupId);

  const [selectedFriends, setSelectedFriends] = useState<Friend[]>([]);

  useEffect(() => {
    if (!open) setSelectedFriends([]);
  }, [open]);

  const handleInvite = async () => {
    if (selectedFriends.length > 0) {
      for (const friend of selectedFriends) {
        await inviteToGroup(friend.usuarioId);
      }
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      transitionDuration={300}
      slotProps={{ 
        paper: { sx: { backgroundColor: 'var(--card)', borderRadius: 2 } }
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3 }}
        style={{ backgroundColor: 'var(--card)', borderRadius: 16, padding: 16 }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
          <Typography sx={{ color: 'var(--foreground)', fontWeight: 'bold', fontSize: '1.2rem' }}>
            Convidar Amigos
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon sx={{ color: 'var(--foreground)' }} />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Autocomplete
            multiple
            options={friends}
            value={selectedFriends}
            onChange={(_, newValue) => setSelectedFriends(newValue)}
            isOptionEqualToValue={(option, value) => option.usuarioId === value.usuarioId}
            getOptionLabel={(option) => option.nome}
            loading={isLoading}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Buscar amigos"
                placeholder="Digite o nome"
                margin="normal"
                fullWidth
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    background: 'var(--input)',
                    borderRadius: 'var(--radius)',
                    color: 'var(--foreground)',
                    '&:hover fieldset': { borderColor: 'var(--primary)' },
                    '&.Mui-focused fieldset': { borderColor: 'var(--primary)' },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'var(--muted)',
                    '&.Mui-focused': { color: 'var(--primary)' },
                  },
                }}
              />
            )}
            slotProps={{
              paper: {
                sx: {
                  backgroundColor: 'var(--card)',
                  color: 'var(--foreground)',
                  borderRadius: 'var(--radius)',
                  mt: 1,
                  '& .MuiAutocomplete-option': {
                    color: 'var(--foreground)',
                    '&[aria-selected="true"]': {
                      backgroundColor: 'var(--primary)',
                      color: '#fff',
                    },
                    '&:hover': {
                      backgroundColor: 'var(--primary)',
                      color: '#fff',
                    },
                  },
                },
              },
            }}
            sx={{
              '& .MuiChip-root': {
                backgroundColor: 'transparent',
                border: '1px solid var(--primary)',
                color: 'var(--foreground)',
              },
              '& .MuiChip-deleteIcon': {
                color: 'var(--foreground)',
              },
            }}
          />

          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleInvite}
              disabled={isPending || selectedFriends.length === 0}
              sx={{
                backgroundColor: 'var(--primary)',
                color: 'white',
                borderRadius: 2,
                '&:hover': { opacity: 0.9 },
                '&:disabled': {
                  opacity: 0.5,
                  cursor: 'not-allowed',
                },
              }}
            >
              {isPending ? 'Enviando convites...' : 'Convidar'}
            </Button>
          </Box>
        </DialogContent>
      </motion.div>
    </Dialog>
  );
}
