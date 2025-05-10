import { Box, IconButton, useTheme } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { motion } from "framer-motion";

interface Props {
  size?: 'small' | 'medium' | 'large';
  disable?: boolean;
  onClick: () => void;
}

export default function EditButton({ size = 'small', disable = false, onClick }: Props) {
  const theme = useTheme();
  const MotionIcon = motion(DeleteIcon);
  return (
      <IconButton onClick={onClick} size={size} disabled={disable} sx={{ borderRadius: 0.5, ":hover": { bgColor: theme.palette.error.light }}}>
        <MotionIcon
          whileHover={{ scale: 1.3, color: theme.palette.error.main }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300 }}
          style={{ color: "var(--muted)" }}
        />
      </IconButton>
  );
}