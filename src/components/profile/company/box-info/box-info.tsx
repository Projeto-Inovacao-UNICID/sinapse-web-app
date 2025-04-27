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