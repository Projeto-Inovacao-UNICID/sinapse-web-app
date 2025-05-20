import { motion } from "framer-motion";
import { Box, Collapse, Typography } from "@mui/material";
import { FormDto } from "@/types";
import { FormFields } from "../fields";
import { useState } from "react";
import ArchiveIcon from '@mui/icons-material/Archive';
import IconButton from "@/components/common/icon-buttons";
import { ConfirmationDialog } from "@/components/common/confirmation-dialog";
import { useInactivateForm } from "@/hooks/forms/useForms";

const MotionBox = motion(Box);

interface FormCardProps {
  companyId: string;
  form: FormDto;
  onSelect?: (form: FormDto) => void;
}

export function FormCard({ form, onSelect, companyId }: FormCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { mutateAsync: inactivateForm } = useInactivateForm(companyId);

  const handleArchiveForm = () => {
    inactivateForm(form.id ?? "");
  }

  const handleClick = () => {
    setIsOpen((prev) => !prev);
    onSelect?.(form);
  }

  return (
    <>
      <MotionBox
        onClick={handleClick}
        whileHover={{ scale: 1.02 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        role="button"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          bgcolor: "var(--card)",
          p: 2,
          borderRadius: 2,
          mb: 2,
          cursor: "pointer",
          opacity: 1,
          outline: "none",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ color: "var(--foreground)", fontWeight: "bold" }}>
            {form.nome}
          </Typography>
          <IconButton
            icon={<ArchiveIcon />}
            onClick={(e) => {
              e?.stopPropagation();
              setIsConfirmOpen(true);
            }}
          />
        </Box>
        <Typography variant="body1" sx={{ color: "var(--muted)", fontWeight: "400", mb: 1 }}>
          Pontuação mínima: {form.minScore}
        </Typography>
        <Typography variant="body1" sx={{ color: "var(--muted)", fontWeight: "400", backgroundColor: "var(--cardTertiary)", p: 1, borderRadius: 2 }}>
          {form.descricao}
        </Typography>
        <Collapse in={isOpen}>
          <FormFields formFields={form.fields} />
        </Collapse>
      </MotionBox>
      <ConfirmationDialog open={isConfirmOpen} title="Deseja realmente arquivar este formulário?" description="Este formulário será inativado, mas poderá ser reativado posteriormente." onCancel={() => setIsConfirmOpen(false)} onConfirm={handleArchiveForm} confirmText="Arquivar" />
    </>
  );
}