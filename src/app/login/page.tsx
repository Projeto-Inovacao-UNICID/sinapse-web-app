"use client";

import { CardLogin } from "@/components/card-login";
import colors from "@/theme/colors"; 
import { Box } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Login() {
  return (
    <div className="h-screen flex justify-center items-center px-4">
        <Box
          sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 3,
          borderRadius: 4,
          width: "100%", 
          maxWidth: 1000,
          }}
        >
          <div style={{color: colors.white, maxWidth: 400}}>
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
