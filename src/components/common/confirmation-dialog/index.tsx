import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  PaperProps,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { forwardRef } from "react";

interface ConfirmationDialogProps {
  open: boolean;
  title: string;
  description: string;
  onCancel: () => void;
  onConfirm: () => void;
  confirmText?: string;
}

const MotionDialogPaper = forwardRef<HTMLDivElement, PaperProps>((props, ref) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95, y: -10 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95, y: -10 }}
    transition={{ type: "spring", stiffness: 260, damping: 20 }}
  >
    <Paper ref={ref} {...props} />
  </motion.div>
));

export function ConfirmationDialog({
  open,
  title,
  description,
  onCancel,
  onConfirm,
  confirmText = "Confirmar",
}: ConfirmationDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onCancel}
      PaperComponent={MotionDialogPaper}
      PaperProps={{
        sx: {
          backgroundColor: 'var(--card)',
          color: 'var(--foreground)',
          borderRadius: 'var(--radius)',
          p: 'var(--spacing-unit)',
          border: '1px solid var(--border)',
          maxWidth: 400,
          margin: 'auto',
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 'bold', color: 'var(--foreground)' }}>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: 'var(--muted)', fontSize: '1rem', paddingBottom: '1rem' }}>
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "flex-end" }}>
        <Button
          onClick={onCancel}
          sx={{ color: 'var(--muted)', fontWeight: 500, textTransform: 'none' }}
        >
          Cancelar
        </Button>
        <Button
          onClick={onConfirm}
          sx={{
            backgroundColor: 'var(--primary)',
            color: 'var(--primary-foreground)',
            fontWeight: 500,
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#e65e00',
            },
          }}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
