import { axiosInstance } from "../api";

export class RegisterService {
    async registerService(tipo: string, nome: string, username: string, email: string, senha: string) {
        const response = await axiosInstance.post(`/auth/registrar`, { tipo, nome, username, email, senha });
        return response.data;
    }
  }