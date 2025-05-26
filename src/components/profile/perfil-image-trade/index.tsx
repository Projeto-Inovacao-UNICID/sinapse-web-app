import { useRef, useState, useEffect } from "react";
import {
  Box,
  Avatar,
  IconButton,
  Tooltip,
  CircularProgress,
  Modal,
  Button,
  Typography,
  Stack,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from '@mui/icons-material/Close';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { useQueryClient } from "@tanstack/react-query"; // useQueryClient might not be needed here if hook handles invalidation
import { useSession } from "@/hooks/session/useSession";
import { useUploadUserProfileImage } from "@/hooks/profile/user/useUserProfile";// Import your hook

interface ProfileImageUploaderProps {
  imagemSrc: string | null;
  isProfileOwner: boolean;
}

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 400 },
  bgcolor: 'background.paper',
  borderRadius: '8px',
  boxShadow: 24,
  p: { xs: 2, sm: 3, md: 4 },
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 2,
};

export function ProfileImageUploader({
  imagemSrc,
  isProfileOwner,
}: ProfileImageUploaderProps) {
  const { session, loading: loadingSession } = useSession();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient(); // Keep if you need to invalidate outside the hook's onSuccess

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Use the hook, ensure session and session.id are available before enabling/calling
  const uploadMutation = useUploadUserProfileImage(session?.id || "");

  const handleOpenModal = () => {
    if (loadingSession || !session) return;
    setSelectedFile(null);
    setPreviewUrl(null);
    setUploadError(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFile(null);
    setPreviewUrl(null);
    setUploadError(null); // Clear error on close
  };

  const handleFileSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setUploadError("O arquivo é muito grande (limite: 5MB).");
        setSelectedFile(null);
        setPreviewUrl(null);
        if(e.target) e.target.value = "";
        return;
      }
      if (!file.type.startsWith("image/")) {
        setUploadError("Por favor, selecione um arquivo de imagem válido.");
        setSelectedFile(null);
        setPreviewUrl(null);
        if(e.target) e.target.value = "";
        return;
      }
      setSelectedFile(file);
      setUploadError(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
      setPreviewUrl(null);
    }
    if(e.target) e.target.value = "";
  };

  const handleUploadImage = () => {
    if (selectedFile && session?.id) {
      // The hook's mutationFn already knows the userId
      uploadMutation.mutate(selectedFile, {
        // onSuccess is now ideally handled within the useUploadUserProfileImage hook.
        // If not, or for additional component-specific success logic:
        onSuccess: (data) => { // data here would be PerfilPrivadoDto
          console.log("Upload successful, data:", data);
        
          queryClient.invalidateQueries({ queryKey: ["user-profile-image", session.id] });
          queryClient.invalidateQueries({ queryKey: ["profile-image", session.id] });
          handleCloseModal();
        },
        onError: (error: Error) => {
          setUploadError(error.message || "Falha no upload. Verifique o console para detalhes.");
          // The hook might also have its own onError logging.
        },
      });
    } else if (!session?.id) {
      setUploadError("Sessão inválida ou ID do usuário não encontrado.");
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const isOuterButtonDisabled = loadingSession || !session;
  const isModalInteractionDisabled = uploadMutation.isPending || loadingSession || !session || !session.id;

  return (
    <Box sx={{ position: "relative", display: "inline-block" }}>
      <Avatar src={imagemSrc || undefined} alt="Foto de perfil" sx={{ width: 100, height: 100 }} />
      {isProfileOwner && (
        <>
          <Tooltip title={loadingSession ? "Carregando sessão..." : (!session ? "Login necessário" : "Alterar foto de perfil")}>
            <span>
              <IconButton
                onClick={handleOpenModal}
                sx={{
                  position: "absolute", bottom: 0, right: 0,
                  backgroundColor: "var(--background, #fff)",
                  border: "2px solid var(--primary, #1976d2)",
                  width: 36, height: 36,
                  "&:hover": { backgroundColor: "var(--primary, #1976d2)", color: "var(--primary-contrast, #fff)" },
                }}
                aria-label="Alterar foto de perfil"
                disabled={isOuterButtonDisabled}
              >
                {loadingSession ? <CircularProgress size={20} sx={{ color: "var(--primary, #1976d2)" }} /> : <EditIcon fontSize="small" />}
              </IconButton>
            </span>
          </Tooltip>

          <Modal open={isModalOpen} onClose={handleCloseModal} aria-labelledby="profile-image-modal-title">
            <Box sx={modalStyle}>
              <IconButton aria-label="Fechar modal" onClick={handleCloseModal} sx={{ position: 'absolute', top: 8, right: 8, color: 'grey.700' }}>
                <CloseIcon />
              </IconButton>
              <Typography id="profile-image-modal-title" variant="h6" component="h2" gutterBottom>
                Editar Foto de Perfil
              </Typography>
              <Avatar
                src={previewUrl || imagemSrc || undefined}
                alt="Prévia da foto de perfil"
                sx={{ width: 150, height: 150, my: 2, border: '1px solid lightgray', objectFit: 'cover' }}
                variant="rounded"
              />
              <input
                type="file" accept="image/*,.heic,.heif" hidden ref={fileInputRef}
                onChange={handleFileSelectChange} id="modal-upload-profile-image"
                disabled={isModalInteractionDisabled}
              />
              <Stack direction="column" spacing={2} sx={{width: '100%'}}>
                <Button
                  variant="outlined" component="label" htmlFor="modal-upload-profile-image"
                  startIcon={<PhotoCameraIcon />} disabled={isModalInteractionDisabled} fullWidth
                >
                  Escolher Nova Imagem
                </Button>
                {selectedFile && (
                  <Button
                    variant="contained" color="primary" onClick={handleUploadImage}
                    disabled={isModalInteractionDisabled || !selectedFile || uploadMutation.isPending}
                    startIcon={uploadMutation.isPending ? <CircularProgress size={20} color="inherit" /> : null}
                    fullWidth
                  >
                    {uploadMutation.isPending ? "Enviando..." : "Salvar Nova Foto"}
                  </Button>
                )}
              </Stack>
              {uploadError && (
                 <Typography color="error" variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
                   {uploadError}
                 </Typography>
              )}
              {/* Display error from the hook if not already set in uploadError */}
              {uploadMutation.isError && !uploadError && (
                 <Typography color="error" variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
                   Erro ao enviar: {(uploadMutation.error as Error)?.message || "Tente novamente."}
                 </Typography>
              )}
            </Box>
          </Modal>
        </>
      )}
    </Box>
  );
}