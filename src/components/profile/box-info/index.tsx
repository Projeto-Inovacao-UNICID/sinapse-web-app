import { Box, Button, Typography } from "@mui/material";

interface BoxInfoProps {
    data:string | number;
    title:string;
}

interface BoxButtonProps {
    data:string;
}

export function BoxInfo({data, title}: BoxInfoProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, border: "1px solid var(--secondary)", borderRadius: 2, padding: 2, height: "100%", width: "100%"}}>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "var(--foreground)" }}>
            {data}
        </Typography>
        <Typography variant="body2" sx={{ color: "var(--muted)" }}>
            {title}
        </Typography>
    </Box>
  );
}

export function BoxButton({data}: BoxButtonProps) {
    return (
        <Button
            variant="contained"
            sx={{
                fontWeight: "bold",
                ":hover": { opacity: 0.8 },
                padding: "4px 8px",  // Ajuste o padding para deixar menor
                fontSize: "0.75rem", // Tamanho da fonte menor
                height: "32px",      // Altura reduzida
                width: "10%",       // Largura total
                border: "1px solid var(--secondary)", // Borda para destacar o botão
                backgroundColor: "var(--primary)", // Cor de fundo do botão
                font: "bold",
                color: "var(--foreground)"
            }}
        >
            {data}
        </Button>
    );
}

export function BoxButton2({data}: BoxButtonProps) {
    return (
            <Button
          variant="contained"
          sx={{
            fontWeight: "bold",
            ":hover": { opacity: 0.8 },
            padding: "4px 8px",  // Ajuste o padding para deixar menor
            fontSize: "0.75rem", // Tamanho da fonte menor
            height: "32px",      // Altura reduzida
            width: "10%",        // Largura total
            border: "1px solid var(--secondary)", // Borda para destacar o botão
            backgroundColor: "var(--secondary)", // Cor de fundo do botão
            color: "var(--foreground)",          // Cor do texto
            fontFamily: "inherit"                // Usando a mesma fonte da BoxInfo
        }}
    >
        {data}
    </Button>
  );
}
