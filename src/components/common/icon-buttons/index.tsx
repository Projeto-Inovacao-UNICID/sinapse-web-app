import { Box } from "@mui/material";
import { motion } from "framer-motion";

interface Props {
  icon: React.ReactNode;
  onClick: () => void;
  disable?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export default function IconButton({ icon, onClick, disable = false, size = 'small' }: Props) {
  const w = size === 'small' ? '1.5rem' : '2rem';
  const h = size === 'small' ? '1.5rem' : '2rem';
  return (
    <motion.button
      whileHover={{ scale: 1.3 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300 }}
      onClick={onClick}
      disabled={disable}
      style={{ backgroundColor: 'transparent', border: 'none', padding: 0, cursor: 'pointer' }}
    >
      <Box sx={{color: 'var(--muted)', width:w, height:h, ':hover': { color: 'var(--primary)' }}}>
        {icon}
      </Box>
    </motion.button>
  );
}