import { CardLogin } from "@/components/card-login";
import colors from "@/theme/colors"; 
import { Box } from "@mui/material";

export default function Login() {
  return (
    <div className="h-screen flex justify-center items-center">
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
          maxWidth: 600,
        }}>
          <div style={{color: colors.white}}>
            <h1>Connect<b style={{color: colors.primary}}>Z</b></h1>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta accusamus ipsum nam tempora consequatur ab.</p>
          </div>
          <div>
            <CardLogin />
          </div>
        </Box>
    </div>
  );
}
