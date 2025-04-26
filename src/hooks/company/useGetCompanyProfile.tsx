import { useQuery } from "@tanstack/react-query";
import { CompanyProfileService } from "@/service/company/CompanyProfileService";
import { CompanyInfo } from "@/types";

const companyProfileService = new CompanyProfileService();

export const useGetCompanyProfile = (empresaId: string) => {
  return useQuery<CompanyInfo>({
    queryKey: ["company-profile", empresaId],
    queryFn: () => companyProfileService.getCompanyProfile(empresaId),
  });
};