import { usePostGroup } from '@/hooks/group/useGroup';
import { Alert, Box, Button, TextField, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useState } from 'react';

const CreateGroupCard = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  const { mutate: createGroup, isPending, isSuccess, isError } = usePostGroup();

  const handleCreateGroup = () => {
    createGroup({ nome, descricao, isPublic });
  };

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

        {/* Exibição das mensagens de sucesso ou erro */}
        {isSuccess && (
          <Alert severity="success">Grupo criado com sucesso!</Alert>
        )}
        {isError && (
          <Alert severity="error">Erro ao criar grupo. Tente novamente.</Alert>
        )}

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
                color: 'var(--foreground)',
              },
            },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
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
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          margin="normal"
          className="mb-4"
          slotProps={{
            htmlInput: {
              style: { 
                background: 'var(--input)', 
                borderRadius: 'var(--radius)', 
                color: 'var(--foreground)',
              },
            },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
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
