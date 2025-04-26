import { useQuery, useMutation } from "@tanstack/react-query";
import { CompanyProfileService } from "@/service/company/CompanyProfileService";
import { CompanyInfo } from "@/types";

const companyProfileService = new CompanyProfileService();

// Buscar perfil da empresa
export const useGetCompanyProfile = (empresaId: string) => {
  return useQuery<CompanyInfo>({
    queryKey: ["company-profile", empresaId],
    queryFn: () => companyProfileService.getCompanyProfile(empresaId),
  });
};

// Buscar imagem de perfil da empresa
export function useGetCompanyProfileImage(companyId: string, enabled: boolean = true) {
  return useQuery<string>({
    queryKey: ["company-profile-image", companyId],
    queryFn: () => companyProfileService.getCompanyProfileImage(companyId),
    staleTime: 1000 * 60 * 5, // 5 minutos
    refetchOnWindowFocus: false,
    enabled,
  });
}

// Atualizar perfil da empresa
export const usePatchCompanyProfile = () => {
  return useMutation({
    mutationFn: ({ companyId, data }: { companyId: string; data: Partial<CompanyInfo> }) => 
      companyProfileService.patchCompanyProfile(companyId, data),
  });
};

// Enviar imagem de perfil da empresa
export const usePostCompanyProfileImage = () => {
  return useMutation({
    mutationFn: ({ companyId, image }: { companyId: string; image: File }) => 
      companyProfileService.postCompanyProfileImage(companyId, image),
  });
};

// Deletar imagem de perfil da empresa
export const useDeleteCompanyProfileImage = () => {
  return useMutation({
    mutationFn: (companyId: string) => 
      companyProfileService.deleteCompanyProfileImage(companyId),
  });
};
