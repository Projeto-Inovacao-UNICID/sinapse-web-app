import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FormDto, FormResponseDto } from "@/types";
import { FormService } from "@/service/form/FormService";

// Criação de formulário
export const useCreateForm = (empresaId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: FormDto) => FormService.createForms(dto, empresaId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forms", empresaId] });
    },
  });
};

// Envio de respostas
export const usePostResponseForm = (estagioId: number, participantId: number) =>
  useMutation({
    mutationFn: (dto: FormResponseDto) =>
      FormService.postResponseForm(estagioId, participantId, dto),
  });

// Obter formulário privado
export const useGetForm = (formId: string) =>
  useQuery({
    queryKey: ["form", formId],
    queryFn: () => FormService.getForms(formId),
  });

// Obter formulário público
export const useGetPublicForm = (formId: string) =>
  useQuery({
    queryKey: ["publicForm", formId],
    queryFn: () => FormService.getPublicForms(formId),
  });

// Listar formulários inativos
export const useGetInactiveForms = (empresaId: string, page = 0, size = 20) =>
  useQuery({
    queryKey: ["forms", "inactive", empresaId, page, size],
    queryFn: () => FormService.getInativeForms(empresaId, page, size),
  });

// Listar formulários ativos
export const useGetActiveForms = (empresaId: string, page = 0, size = 20) =>
  useQuery({
    queryKey: ["forms", "active", empresaId, page, size],
    queryFn: () => FormService.getActiveForms(empresaId, page, size),
  });

// Inativar formulário
export const useInactivateForm = (empresaId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formId: string) =>
      FormService.inativateForm(formId, empresaId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forms", "active", empresaId] });
      queryClient.invalidateQueries({ queryKey: ["forms", "inactive", empresaId] });
    },
  });
};

// Ativar formulário
export const useActivateForm = (empresaId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formId: string) => FormService.activateForm(formId, empresaId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forms", "active", empresaId] });
      queryClient.invalidateQueries({ queryKey: ["forms", "inactive", empresaId] });
    },
  });
};
