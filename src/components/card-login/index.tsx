import { Box, Button, TextField, Typography } from "@mui/material";
import colors from "@/theme/colors";

const inputStyle = {
    color: colors.white,
    backgroundColor: colors.darkGrey,
    borderRadius: '8px',
    input: { color: colors.white}, // cor do texto digitado
    '& .MuiFilledInput-root': {
    backgroundColor: colors.darkGrey,
    borderRadius: '8px',
    },
    '& .MuiInputLabel-root': {
    color: '#888',
    },
    '& .Mui-focused': {
    color: colors.primary, // cor da label quando foca
    },
    '& .MuiFilledInput-underline:before': {
    borderBottom: `2px solid ${colors.primary}`,
    },
    '& .MuiFilledInput-underline:after': {
    borderBottom: `2px solid ${colors.primary}`,                   
    },
};

export function CardLogin() {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, bgcolor: colors.darkGrey, p: 3, borderRadius: 4, width: "fit-content", maxWidth: 400 }}>
            <Typography sx={{ color: colors.white, fontWeight: 'bold', fontSize: '1.5rem' }}>Login</Typography>
                <TextField
                    id="filled-basic" type="text" label="Email" variant="filled"
                sx={inputStyle}
            />
            <TextField 
                id="filled-basic" type="password" label="Senha" autoComplete="current-password" variant="filled"
                sx={inputStyle}
             />
            <Box sx={{display: 'flex', flexDirection: 'row', gap: 2, justifyContent: 'center'}}>
                <Button sx={{ bgcolor: colors.primary, ":hover": { bgcolor: colors.primaryDark } }} variant="contained">Enviar</Button>
                <Button sx={{ bgcolor: colors.gray, ":hover": { bgcolor: colors.darkGrey } }} variant="contained">Registre-se</Button>
            </Box>
        </Box>
    );
}