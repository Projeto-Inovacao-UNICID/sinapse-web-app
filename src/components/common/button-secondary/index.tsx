import { Button } from "@mui/material";
import { motion } from "framer-motion";

interface Props {
  title: string;
  borderRadius?: number | string;
  fontWeight?: number | string;
  icon?: React.ReactNode;
  disable?: boolean;
  onClick: () => void;
}

export default function ButtonSecondary({ title, borderRadius = 1, fontWeight = 400, icon, disable, onClick }: Props) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Button
        startIcon={icon}
        onClick={onClick}
        disabled={disable}
        variant="outlined"
        sx={{
          borderColor: "var(--secondary)",
          color: "var(--foreground)",
          borderRadius: borderRadius,
          fontWeight: fontWeight,
          textTransform: "none",
        }}
      >
        {title}
      </Button>
    </motion.div>
  );
}
