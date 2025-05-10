import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { motion } from "framer-motion";

interface Props {
  size?: 'small' | 'medium' | 'large';
  isEditing?: boolean;
  onClick: () => void;
}

export default function EditButton({ size = 'small', isEditing = false, onClick }: Props) {
  const MotionIcon = motion(EditIcon);
  return (
    <IconButton onClick={onClick} size={size}>
      <MotionIcon
        animate={{
          rotate: isEditing ? 90 : 0,
          color: isEditing ? "var(--primary)" : "var(--muted)",
        }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.3, color: "var(--primary)" }}
        whileTap={{ scale: 0.9 }}
      />
    </IconButton>
  );
}