import { Box, Button, Link, TextField, Typography } from "@mui/material";
import colors from "@/theme/colors";

const inputStyle = {
    color: colors.white,
    backgroundColor: colors.darkGrey,
    borderRadius: '8px',
    input: { color: colors.white }, // cor do texto digitado
    '& .MuiFilledInput-root': {
      backgroundColor: colors.darkGrey,
      borderRadius: '8px',
    },
    '& .MuiInputLabel-root': {
      color: colors.gray,
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

export function PostMainCard() {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, bgcolor: colors.darkGrey, p: 3, borderRadius: 4, width: "fit-content", maxWidth: 400}}>
            <Typography sx={{ color: colors.white, fontWeight: 'bold', fontSize: '1.5rem' }}>Login</Typography>
            <TextField
                fullWidth
                id="filled-basic" type="text" label="Email" variant="filled"
                sx={inputStyle}
            />
            <TextField 
                fullWidth
                id="filled-basic" type="password" label="Senha" autoComplete="current-password" variant="filled"
                sx={inputStyle}
             />
            <Button sx={{ bgcolor: colors.primary, ":hover": { bgcolor: colors.primaryDark }, width: '100%' }} variant="contained"><b>Entrar</b></Button>
            <Typography sx={{ whiteSpace: 'nowrap', fontSize: '0.9rem', color: colors.gray}}>Não tem uma conta? <Link href="/register" style={{color: colors.primary, textDecoration: 'none'}}>Registre-se</Link></Typography>
        </Box>
    );
}