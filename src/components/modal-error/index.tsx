'use client';

import { modalStyle } from "@/theme/components-styles";
import { Box, Modal } from "@mui/material";

interface ModalErrorProps {
    open: boolean;
    onClose: () => void;
    error: string;
    msg: string;
}

export function ModalError({ open, onClose, error, msg }: ModalErrorProps) {
    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ ...modalStyle, color: 'var(--foreground)' }}>
                <h1>{error}</h1>
                <p>{msg}</p>
            </Box>
        </Modal>
    );
}
