import { Button } from "@mui/material";
import { motion } from "framer-motion";

interface Props {
  title: string;
  icon?: React.ReactNode;
  disable?: boolean;
  onClick: () => void;
}

export default function ButtonPrimary({ title, icon, disable = false, onClick }: Props) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Button
        startIcon={icon}
        onClick={onClick}
        variant="outlined"
        disabled={disable}
        sx={{
          backgroundColor: "var(--primary)",
          color: "white",
          border: "none",
          borderRadius: 1,
          textTransform: "none",
        }}
      >
        {title}
      </Button>
    </motion.div>
  );
}
