import { FormFieldDto } from "@/types";
import { Box, Collapse, Typography } from "@mui/material";
import { FormOptions } from "../options";
import { useState } from "react";
import { motion } from "framer-motion";

interface FormFieldProps {
  field: FormFieldDto;
}

const MotionBox = motion(Box);

export function FormField({ field }: FormFieldProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };
  
  const haveOptions = field.options && field.options.length > 0;

  return (
    <MotionBox
      onClick={handleClick}
      whileHover={ haveOptions ? { scale: 1.02 } : {} }
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      role="button"
      sx={{
        bgcolor: "var(--input)",
        p: 2,
        borderRadius: 2,
        mb: 2,
        cursor: haveOptions ? "pointer" : "default",
        opacity: 1,
        outline: "none",
      }}
    >
      <Typography variant="body1" sx={{ color: "var(--foreground)" }}>
        {field.label}
      </Typography>
      <Typography variant="body1" sx={{ color: "var(--foreground)" }}>
        Tipo: {field.fieldType}
      </Typography>
      <Typography variant="body1" sx={{ color: "var(--foreground)" }}>  
        Categoria: {field.category}
      </Typography>
      <Typography variant="body1" sx={{ color: "var(--foreground)" }}>
        Peso: {field.weight}
      </Typography>
      {field.options && (
        <Collapse in={isOpen}>
          <FormOptions options={field.options} />
        </Collapse>
      )}
    </MotionBox>
  );
}