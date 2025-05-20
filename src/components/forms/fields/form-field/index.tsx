import { FormFieldDto } from "@/types";
import { Box, Collapse, Divider, Typography } from "@mui/material";
import { FormOptions } from "../options";
import { useState } from "react";
import { motion } from "framer-motion";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

interface FormFieldProps {
  field: FormFieldDto;
}

const MotionBox = motion(Box);

export function FormField({ field }: FormFieldProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };
  
  const haveOptions = field.options ? field.options.length > 0 : false;

  const ArrowDropIcon = isOpen ? ArrowDropUpIcon : ArrowDropDownIcon;

  return (
    <MotionBox
      onClick={handleClick}
      whileHover={haveOptions ? { scale: 1.02 } : {}}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      role="button"
      sx={{
        display: "flex",
        flexDirection: "column",
        bgcolor: "var(--cardTertiary)",
        p: 2,
        borderRadius: 2,
        mb: 2,
        cursor: haveOptions ? "pointer" : "default",
        opacity: 1,
        outline: "none",
      }}
    >
      <Typography variant="body1" sx={{ color: "var(--foreground)", fontWeight: "bold" }}>
        {field.label}
      </Typography>
      <Box sx={{ display: "flex", gap: 1, alignItems: "center", ml: 1 }}>
        <Typography variant="body2" sx={{ color: "var(--muted)" }}>
          Tipo: {field.fieldType}
        </Typography>
        <Divider orientation="vertical" flexItem sx={{ borderColor: "var(--muted)" }} />
        <Typography variant="body2" sx={{ color: "var(--muted)" }}>
          Categoria: {field.category}
        </Typography>
        <Divider orientation="vertical" flexItem sx={{ borderColor: "var(--muted)" }} />
        <Typography variant="body2" sx={{ color: "var(--muted)" }}>
          Peso: {field.weight}
        </Typography>
      </Box>
      {haveOptions && field.options && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 1, ml: 1 }}>
          <Collapse in={isOpen}>
            <FormOptions options={field.options} />
          </Collapse>
          <ArrowDropIcon sx={{ alignSelf: "center", color: "var(--muted)" }} />
        </Box>
      )}
    </MotionBox>
  );
}
