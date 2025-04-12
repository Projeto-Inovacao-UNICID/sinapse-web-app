import { bgColors, colors } from "./colors";

export const inputFormStyle = {
    color: colors.white,
    backgroundColor: bgColors.dark,
    borderRadius: '8px',
    input: { color: colors.white }, // cor do texto digitado
    '& .MuiFilledInput-root': {
      backgroundColor: bgColors.dark,
      borderRadius: '8px',
    },
    '& .MuiInputLabel-root': {
      color: colors.lightGray,
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: colors.primary, // cor da label quando foca
    },
    '& .MuiFilledInput-underline:before': {
      borderBottom: `2px solid ${colors.primary}`,
    },
    '& .MuiFilledInput-underline:after': {
      borderBottom: `2px solid ${colors.primary}`,
    },
  };  

export const buttonFormStyle = {
    bgcolor: colors.primary, 
    ":hover": { bgcolor: colors.primaryDark }, 
    width: '100%'
}

export const modalStyle = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: bgColors.darkSecondary,
    borderRadius: 4,
    p: 4,
  };

export const radioStyle = {
    color: colors.lightGray,
    '&.Mui-checked': {
      color: colors.primary,
    },
    '& .MuiSvgIcon-root': {
      fontSize: '1.5rem',
    },
  };