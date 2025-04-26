import { axiosInstance } from "@/service/api";
import { Challenge, ChallengeStage, ChallengeToPost } from "@/types";


export class ChallengeService {
  async getChallenges() {
    const response = await axiosInstance.get<Challenge[]>(`/desafios`, { withCredentials: true });
    return response.data;
  }

  async postChallenge(empresaId: string, desafio: ChallengeToPost) {
    const response = await axiosInstance.post(`/desafios/${empresaId}/criar`, desafio, { withCredentials: true });
    return response.data;
  }

  async patchChallenge(desafioId: string, desafio: Partial<Challenge>) {
    const response = await axiosInstance.patch(`/desafios/${desafioId}`, desafio, { withCredentials: true });
    return response.status;
  }

  async postChallengeStage (desafioId: string, stage: ChallengeStage) {
    const response = await axiosInstance.post(`/desafios/${desafioId}/estagios`, stage, { withCredentials: true });
    return response.data;
  }

  async getChallengeStages (desafioId: string) {
    const response = await axiosInstance.get(`/desafios/${desafioId}/estagios`, { withCredentials: true });
    return response.data;
  }

  async postChallengeRegistrationGroup (desafioId: string, groupId: string, mensagem: string = "") {
    const response = await axiosInstance.post(`/desafios/${desafioId}/candidatar/${groupId}`, { mensagem }, { withCredentials: true });
    return response.data;
  }

  async getChallengeStageParticipants (stageId: string) {
    const response = await axiosInstance.get(`/estagios-recrutamento/${stageId}/participantes`, { withCredentials: true });
    return response.data;
  }
}