import { axiosInstance } from "@/service/api";
import {
  Challenge,
  ChallengesCountsCompany,
  ChallengesCountsUser,
  ChallengeStage,
  ChallengeToPost
} from "@/types";

export class ChallengeService {
  async getChallenges() {
    const response = await axiosInstance.get<Challenge[]>(`/desafios`, {
      withCredentials: true,
    });
    return response.data;
  }

  async getChallengeById(id: string) {
    const response = await axiosInstance.get<Challenge>(
      `/desafios/${id}`,
      { withCredentials: true }
    );
    return response.data;
  }
  

  async postChallenge(empresaId: string, desafio: ChallengeToPost) {
    const response = await axiosInstance.post(
      `/desafios/${empresaId}/criar`,
      desafio,
      { withCredentials: true }
    );
    return response.data;
  }

  async patchChallenge(desafioId: string, desafio: Partial<Challenge>) {
    const response = await axiosInstance.patch(
      `/desafios/${desafioId}/editar`,
      desafio,
      { withCredentials: true }
    );
    return response.data;
  }

  async postChallengeStage(desafioId: string, stage: ChallengeStage) {
    const response = await axiosInstance.post(
      `/desafios/${desafioId}/estagios`,
      stage,
      { withCredentials: true }
    );
    return response.data;
  }

  async getChallengeStages(desafioId: string) {
    const response = await axiosInstance.get(
      `/desafios/${desafioId}/estagios`,
      { withCredentials: true }
    );
    return response.data;
  }

  async postChallengeRegistrationGroup(
    desafioId: string,
    groupId: string,
    mensagem: string = ""
  ) {
    const response = await axiosInstance.post(
      `/desafios/${desafioId}/candidatar/${groupId}`,
      { mensagem },
      { withCredentials: true }
    );
    return response.data;
  }

  async postChallengeRegistrationSolo(desafioId: string) {
    const response = await axiosInstance.post(
      `/desafios/${desafioId}/candidatar`,
      {},
      { withCredentials: true }
    );
    return response.data;
  }

  async getMyChallengeRegistration(desafioId: string) {
    const response = await axiosInstance.get(
      `/desafios/${desafioId}/inscricao-minha`,
      { withCredentials: true }
    );
    return response.data;
  }

  async postChallengeWinner(desafioId: string, participantId: string) {
    const response = await axiosInstance.post(
      `/desafios/${desafioId}/vencedores/${participantId}`,
      {},
      { withCredentials: true }
    );
    return response.status;
  }

  async getChallengeStageParticipants(stageId: string) {
    const response = await axiosInstance.get(
      `/estagios-recrutamento/${stageId}/participantes`,
      { withCredentials: true }
    );
    return response.data;
  }

  async getChallengesCountsCompany(companyId: string) {
    const response = await axiosInstance.get<ChallengesCountsCompany>(
      `/desafios/contagem`,
      {
        params: { empresaId: companyId },
        withCredentials: true,
      }
    );
    return response.data;
  }

  async getChallengesCountsUser(userId: string) {
    const response = await axiosInstance.get<ChallengesCountsUser>(
      `/desafios/contagem/usuario`,
      {
        params: { usuarioId: userId },
        withCredentials: true,
      }
    );
    return response.data;
  }

  async removeParticipant(desafioId: string, participanteId: string) {
    const response = await axiosInstance.delete(
      `/desafios/${desafioId}/participantes/${participanteId}`,
      { withCredentials: true }
    );
    return response.status;
  }
}

export const challengeService = new ChallengeService();
