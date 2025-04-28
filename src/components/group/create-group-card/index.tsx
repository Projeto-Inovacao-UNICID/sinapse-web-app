import React, { useState } from 'react';
import { Button, Box, Typography, TextField, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { usePostGroup } from '@/hooks/group/useGroup';
import { useFriendship } from '@/hooks/friendship/useFriendship';

const CreateGroupCard = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<{ userId: string, nome: string }[]>([]);

  const { data: friends, isLoading, error } = useFriendship();
  const { mutate: createGroup, isPending } = usePostGroup();

  const handleCreateGroup = () => {
    createGroup({ nome, descricao, isPublic });
  };

  const handleUserSelect = (userId: string, nome: string) => {
    if (!selectedUsers.some(user => user.userId === userId)) {
      setSelectedUsers([...selectedUsers, { userId, nome }]);
    }
  };

  const handleUserRemove = (userId: string) => {
    setSelectedUsers(selectedUsers.filter(user => user.userId !== userId));
  };

  if (isLoading) {
    return (
      <div className="bg-card p-6 rounded-lg shadow-md max-w-sm mx-auto h-full flex justify-center items-center">
        <CircularProgress sx={{ color: "var(--muted)" }} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-card p-6 rounded-lg shadow-md max-w-sm mx-auto">
        <Typography variant="h6" color="error">Erro ao carregar amigos.</Typography>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-card p-6 rounded-lg shadow-md max-w-sm mx-auto">
        <Typography variant="h6" gutterBottom className="text-primary font-semibold">
          Criar Grupo
        </Typography>

        <TextField
          label="Nome do Grupo"
          fullWidth
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          margin="normal"
          className="mb-4"
          slotProps={{
            htmlInput: {
              style: { 
                background: 'var(--input)', 
                borderRadius: 'var(--radius)', 
                color: 'var(--muted)',  // Texto do input
              },
            },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: 'var(--primary)',  // Cor da borda quando o input é hover
              },
              '&.Mui-focused fieldset': {
                borderColor: 'var(--primary)',  // Cor da borda quando o input está em foco
              },
            },
            '& .MuiInputLabel-root': {
              color: 'var(--muted)', // Cor do label quando não está em foco
              '&.Mui-focused': {
                color: 'var(--primary)', // Cor do label quando o input está em foco
              },
            },
          }}
        />

        <TextField
          label="Descrição"
          fullWidth
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          margin="normal"
          className="mb-4"
          slotProps={{
            htmlInput: {
              style: { 
                background: 'var(--input)', 
                borderRadius: 'var(--radius)', 
                color: 'var(--muted)',  // Texto do input
              },
            },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: 'var(--primary)',  // Cor da borda quando o input é hover
              },
              '&.Mui-focused fieldset': {
                borderColor: 'var(--primary)',  // Cor da borda quando o input está em foco
              },
            },
            '& .MuiInputLabel-root': {
              color: 'var(--muted)', // Cor do label quando não está em foco
              '&.Mui-focused': {
                color: 'var(--primary)', // Cor do label quando o input está em foco
              },
            },
          }}
        />

        <Box display="flex" alignItems="center" className="mb-4">
          <Button
            variant={isPublic ? 'contained' : 'outlined'}
            onClick={() => setIsPublic(!isPublic)}
            sx={{ 
              marginRight: 2, 
              color: "var(--foreground)",
              bgcolor: isPublic ? "var(--primary)" : "var(--cardSecondary)",
              borderRadius: 2,
              borderColor: "var(--border)",
            }}
          >
            {isPublic ? 'Público' : 'Privado'}
          </Button>
          <Typography variant="body2" sx={{color: 'var(--muted)'}}>
            Visibilidade do grupo
          </Typography>
        </Box>

        <TextField
          label="Convite de Amigos"
          fullWidth
          margin="normal"
          className="mb-4"
          slotProps={{
            htmlInput: {
              style: { 
                background: 'var(--input)', 
                borderRadius: 'var(--radius)', 
                color: 'var(--muted)',  // Texto do input
              },
            },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: 'var(--primary)',  // Cor da borda quando o input é hover
              },
              '&.Mui-focused fieldset': {
                borderColor: 'var(--primary)',  // Cor da borda quando o input está em foco
              },
            },
            '& .MuiInputLabel-root': {
              color: 'var(--muted)', // Cor do label quando não está em foco
              '&.Mui-focused': {
                color: 'var(--primary)', // Cor do label quando o input está em foco
              },
            },
          }}
        />

        <Box display="flex" flexWrap="wrap" mb={2}>
          {friends?.map(friend => (
            <Button
              key={friend.usuarioId}
              variant="outlined"
              onClick={() => handleUserSelect(friend.usuarioId, friend.nome)} // Passa o nome também
              sx={{ marginRight: 1, marginBottom: 1 }}
              className="text-accent border-accent hover:bg-accent-foreground"
              style={{
                borderRadius: 4,
                color: 'var(--foreground)',
                borderColor: 'var(--primary)',
              }}
            >
              {friend.nome}
            </Button>
          ))}
        </Box>

        <Box mt={2}>
          <Typography variant="body2" sx={{color: 'var(--muted)'}}>Usuários selecionados</Typography>
          <Box display="flex" flexWrap="wrap">
            {selectedUsers.map(({ userId, nome }) => ( // Agora mapeia userId e nome
              <Button
                key={userId}
                variant="contained"
                color="secondary"
                onClick={() => handleUserRemove(userId)}
                sx={{ margin: 1 }}
                className="bg-destructive text-destructive-foreground"
                style={{
                  backgroundColor: 'var(--destructive)',
                  color: 'var(--destructive-foreground)',
                  borderRadius: 'var(--radius)',
                }}
              >
                {nome} X 
              </Button>
            ))}
          </Box>
        </Box>

        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateGroup}
            fullWidth
            disabled={isPending || !nome || !descricao}
            sx={{
              backgroundColor: 'var(--primary)',
              color: 'var(--foreground)',
              borderRadius: 2,
              '&:hover': {
                opacity: 0.8,
                cursor: 'pointer',
              },
              '&:disabled': {
                opacity: 0.5,
                cursor: 'not-allowed',
                bgcolor: 'var(--primary)',
                color: 'var(--foreground)',
              },
            }}
          >
            {isPending ? 'Criando...' : 'Criar Grupo'}
          </Button>

        </Box>
      </div>
    </motion.div>
  );
};

export default CreateGroupCard;
