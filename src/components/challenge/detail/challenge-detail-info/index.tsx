import { Box, Typography, Chip } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";

export function ChallengeDetailInfo({
  title, area, location, start, end, status, statusColor, statusBg
}: {
  title: string;
  area: string;
  location: string;
  start: string;
  end: string;
  status: string;
  statusColor: string;
  statusBg: string;
}) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h4" sx={{ color: "var(--primary)", fontWeight: "bold" }}>
        {title}
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4, mt: 1, color: "var(--muted)" }}>
        <Typography>Área: {area}</Typography>
        <Typography>Localização: {location}</Typography>
        <Typography>Início: {start}</Typography>
        <Typography>Fim: {end}</Typography>
      </Box>
      <Chip
        label={status}
        icon={<CircleIcon sx={{ color: statusColor, fontSize: 12 }} />}
        sx={{
          mt: 2,
          backgroundColor: statusBg,
          color: statusColor,
          fontWeight: 500,
          borderRadius: 1
        }}
      />
    </Box>
  );
}
