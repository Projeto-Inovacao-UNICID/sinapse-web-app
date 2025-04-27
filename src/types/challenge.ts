export interface ChallengeToPost {
  titulo: string;
  descricao: string;
  dataInicio: string;
  dataFim: string;
  interno: boolean;
  modalidade: string;
}

export interface Challenge {
  id: string;
  empresaId: string;
  funcionarioId: string;
  titulo: string;
  descricao: string;
  dataInicio: string;
  dataFim: string;
  status: string;
  interno: boolean;
  modalidade: string;
  createdAt: string;
  updatedAt: string;
}
