import {
    Box,
    Button,
    TextField,
    IconButton
  } from "@mui/material";
  import AttachFileIcon from "@mui/icons-material/AttachFile";
  import { useState } from "react";
  
  export function StageCommentForm() {
    const [text, setText] = useState("");
    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, width: "100%" }}>
        <TextField
          fullWidth
          multiline
          minRows={2}
          placeholder="Digite um comentário..."
          value={text}
          onChange={e => setText(e.target.value)}
          sx={{
            bgcolor: "var(--card)",
            borderRadius: 1,
            "& .MuiOutlinedInput-root fieldset": { border: "none" },
            "& .MuiInputBase-input": { color: "var(--foreground)" }
          }}
        />
        <IconButton sx={{ color: "var(--primary)" }}>
          <AttachFileIcon />
        </IconButton>
        <Button
          variant="contained"
          // onClick={() => { onSubmit(text); setText(""); }}
          sx={{ bgcolor: "var(--primary)", textTransform: "none" }}
        >
          Enviar
        </Button>
      </Box>
    );
  }
  