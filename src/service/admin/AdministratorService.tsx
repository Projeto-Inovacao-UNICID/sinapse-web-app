import { axiosInstance } from "../api";

export class AdminService {
    async postCreateAdministrator(nome: string, email: string, senha: string) {
        const response = await axiosInstance.post(`/administradores`, { nome, email, senha }, { withCredentials: true });
        return response.status;
    }

    async postLoginAdministrator(email: string, senha: string) {
        const response = await axiosInstance.post(`/admin/login`, { email, senha }, { withCredentials: true });
        return response.status;
    }

    async getListLogs(page: number) {
        const response = await axiosInstance.get('/logs', {
            params: { page },
            withCredentials: true
        });
        return response.data;
    }

    async getListPendingDocuments(status: string) {
        const response = await axiosInstance.get(`/documentos`, {
            params: { status },
            withCredentials: true
        });
        return response.data;
    }

    async postArppoveCompany(empresaId: string, aprovada: boolean, anotacoesAprovacao: string) {
        const response = await axiosInstance.post(`/empresas/aprovar`, {
            empresaId,
            aprovada,
            anotacoesAprovacao
        }, { withCredentials: true });
        return response.status;
    }
}
