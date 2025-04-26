import { Opacity } from "@mui/icons-material";

export const inputFormStyle = {
  color: 'var(--foreground)',
  backgroundColor: 'var(--input)',
  borderRadius: '8px',
  input: { color: 'var(--foreground)' }, // cor do texto digitado
  '& .MuiFilledInput-root': {
    backgroundColor: 'var(--input)',
    borderRadius: '8px',
  },
  '& .MuiInputLabel-root': {
    color: 'var(--muted)',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: 'var(--primary)', // cor da label quando foca
  },
  '& .MuiFilledInput-underline:before': {
    borderBottom: `2px solid var(--primary)`,
  },
  '& .MuiFilledInput-underline:after': {
    borderBottom: `2px solid var(--primary)`,
  },
};

export const buttonFormStyle = {
  bgcolor: 'var(--primary)',
  ':hover': {
    opacity: 0.8,
  },
  color: 'var(--primary-foreground)',
  width: '100%',
};

export const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'var(--card)',
  color: 'var(--card-foreground)',
  borderRadius: '1rem',
  padding: '2rem',
};

export const radioStyle = {
  color: 'var(--muted)',
  '&.Mui-checked': {
    color: 'var(--primary)',
  },
  '& .MuiSvgIcon-root': {
    fontSize: '1.5rem',
  },
};
