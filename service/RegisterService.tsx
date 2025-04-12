import { axiosInstance } from "./api";

export class RegisterService {
    async registerService(tipo: string, nome: string, username: string, email: string, password: string) {
        const response = await axiosInstance.post(`/auth/registrar`, { tipo, nome, username, email, password });
        return response.data;
    }
  }