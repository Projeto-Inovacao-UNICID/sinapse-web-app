import { axiosInstance } from "../api";
import type { ApprovalRequestDto, CompanyDocumentDto } from "@/types";

export class AdminService {
    async postCreateAdministrator(nome: string, email: string, senha: string): Promise<number> {
        const response = await axiosInstance.post(`/administradores`, { nome, email, senha }, { withCredentials: true });
        return response.status;
    }

    async postLoginAdministrator(email: string, senha: string): Promise<number> {
        const response = await axiosInstance.post(`/admin/login`, { email, senha }, { withCredentials: true });
        return response.status;
    }

    async getListLogs(page: number): Promise<any> {
        const response = await axiosInstance.get('/logs', {
            params: { page },
            withCredentials: true
        });
        return response.data;
    }

    async getListPendingDocuments(status: string): Promise<CompanyDocumentDto[]> {
        const response = await axiosInstance.get<CompanyDocumentDto[]>(`/documentos`, {
            params: { status },
            withCredentials: true
        });
        return response.data;
    }

    async postApproveCompany(empresaId: string, dto: ApprovalRequestDto): Promise<number> {
        const response = await axiosInstance.post(`/empresas/aprovar`, {
            empresaId,
            aprovada: dto.approved,
            anotacoesAprovacao: dto.approvalNotes
        }, { withCredentials: true });
        return response.status;
    }
}
