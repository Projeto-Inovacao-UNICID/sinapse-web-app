import { useQuery, useMutation } from "@tanstack/react-query";
import { CompanyProfileService } from "@/service/profile/company/CompanyProfileService";
import {
  CompanyPrivateProfileDto,
  UpdateCompanyProfileDto,
} from "@/types";

const companyProfileService = new CompanyProfileService();

// Buscar perfil da empresa
export const useGetCompanyProfile = (companyId: string) => {
  return useQuery<CompanyPrivateProfileDto>({
    queryKey: ["company-profile", companyId],
    queryFn: () => companyProfileService.getCompanyProfile(companyId),
    enabled: !!companyId,
  });
};

// Buscar imagem de perfil da empresa
export function useGetCompanyProfileImage(companyId: string, enabled = true) {
  return useQuery<string, Error>({
    queryKey: ["company-profile-image", companyId],
    queryFn: () => companyProfileService.getCompanyProfileImage(companyId),
    enabled,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });
}

// Atualizar perfil da empresa
export const usePatchCompanyProfile = () => {
  return useMutation({
    mutationFn: ({
      companyId,
      data,
    }: {
      companyId: string;
      data: UpdateCompanyProfileDto;
    }) => companyProfileService.patchCompanyProfile(companyId, data),
  });
};

// Enviar imagem de perfil da empresa
export const usePostCompanyProfileImage = () => {
  return useMutation({
    mutationFn: ({
      companyId,
      image,
    }: {
      companyId: string;
      image: File;
    }) => companyProfileService.postCompanyProfileImage(companyId, image),
  });
};

// Deletar imagem de perfil da empresa
export const useDeleteCompanyProfileImage = () => {
  return useMutation({
    mutationFn: (companyId: string) =>
      companyProfileService.deleteCompanyProfileImage(companyId),
  });
};
