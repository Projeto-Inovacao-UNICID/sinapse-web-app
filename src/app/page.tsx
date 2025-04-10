import { Box } from "@mui/material";
import { CardLogin } from "@/components/card-login";
import { text } from "stream/consumers";

export default function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: 'rgba(0, 0, 0, 0.2)',
          gap: 12,
          p: 3,
          borderRadius: 4,
          width: "fit-content",
        }}
      >
        <h1 style={{ color: '#FF6A00' }}>SINAPSE</h1>
        <div>
          <CardLogin />
        </div>
      </Box>
    </Box>
  );
}
