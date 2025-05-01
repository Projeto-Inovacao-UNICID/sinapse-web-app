import { Box, Modal, Typography } from "@mui/material";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EditGroupModal({ isOpen, onClose }: ModalProps) {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Editar Grupo
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>

        </Typography>
      </Box>
    </Modal>
  );
}