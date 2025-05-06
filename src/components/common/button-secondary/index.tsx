import { Button } from "@mui/material";
import { motion } from "framer-motion";

interface Props {
  title: string;
  icon?: React.ReactNode;
  disable?: boolean;
  onClick: () => void;
}

export default function ButtonSecondary({ title, icon, disable = false, onClick }: Props) {
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
          borderRadius: 1,
          textTransform: "none",
        }}
      >
        {title}
      </Button>
    </motion.div>
  );
}
