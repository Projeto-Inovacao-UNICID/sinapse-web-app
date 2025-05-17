import { motion } from "framer-motion";
import { Box, Collapse, Typography } from "@mui/material";
import { FormDto } from "@/types";
import { FormFields } from "../fields";
import { useState } from "react";

const MotionBox = motion(Box);

interface FormCardProps {
  form: FormDto;
  onSelect?: (form: FormDto) => void;
}

export function FormCard({ form, onSelect }: FormCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen((prev) => !prev);
    onSelect?.(form);
  }

  return (
    <MotionBox
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      role="button"
      sx={{
        bgcolor: "var(--card)",
        p: 2,
        borderRadius: 2,
        mb: 2,
        cursor: "pointer",
        opacity: 1,
        outline: "none",
      }}
    >
      <Typography variant="h5" sx={{ color: "var(--foreground)", fontWeight: "bold" }}>
        {form.nome}
      </Typography>
      <Typography variant="body1" sx={{ color: "var(--foreground)", fontWeight: "bold" }}>
        {form.descricao}
      </Typography>
      <Typography variant="body1" sx={{ color: "var(--foreground)", fontWeight: "bold" }}>
        Pontuação mínima: {form.minScore}
      </Typography>
      <Collapse in={isOpen}>
        <FormFields formFields={form.fields} />
      </Collapse>
    </MotionBox>
  );
}