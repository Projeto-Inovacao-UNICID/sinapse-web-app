import { colors } from "@/theme/colors";
import { modalStyle } from "@/theme/components-styles";
import { Box, Modal } from "@mui/material";

interface ModalErrorProps {
    open: boolean;
    onClose: () => void;
    error: string; 
    msg: string;
}

export function ModalError({open, onClose, error, msg}: ModalErrorProps) {
    return (
        <>
            <Modal open={open} onClose={onClose}>
                <Box sx={modalStyle}>
                    <h1 style={{color: colors.white}}>{error}</h1>
                    <p style={{color: colors.white}}>{msg}</p>
                </Box>
            </Modal>
        </>
    );
}