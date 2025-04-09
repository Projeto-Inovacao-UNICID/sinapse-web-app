import { Box, Button, TextField, Typography } from "@mui/material";

const inputStyle = {
    color: '#fff',
    backgroundColor: '#141414',
    borderRadius: '8px',
    input: { color: '#fff' }, // cor do texto digitado
    '& .MuiFilledInput-root': {
    backgroundColor: '#141414',
    borderRadius: '8px',
    },
    '& .MuiInputLabel-root': {
    color: '#888',
    },
    '& .Mui-focused': {
    color: '#FFDA00', // cor da label quando foca
    },
    '& .MuiFilledInput-underline:before': {
    borderBottom: '2px solid #FFDA00',
    },
    '& .MuiFilledInput-underline:after': {
    borderBottom: '2px solid #FFDA00',
    },
};

export function CardLogin() {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, bgcolor: "#141414", p: 3, borderRadius: 4, width: "fit-content", maxWidth: 400 }}>
            <Typography sx={{ color: '#FFF', fontWeight: 'bold', fontSize: '1.5rem' }}>Login</Typography>
                <TextField
                    id="filled-basic" type="text" label="Email" variant="filled"
                sx={inputStyle}
            />
            <TextField 
                id="filled-basic" type="password" label="Senha" autoComplete="current-password" variant="filled"
                sx={inputStyle}
             />
            <Button sx={{ bgcolor: "#FFDA00", ":hover": { bgcolor: "#dba904" } }} variant="contained">Enviar</Button>
        </Box>
    );
}