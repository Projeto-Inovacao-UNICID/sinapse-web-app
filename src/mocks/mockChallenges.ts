// mockChallenge1.ts
import { ChallengeResponseDto } from "@/types";

export const mockChallenge1: ChallengeResponseDto = {
  id: 201,
  empresaId: "empresa_xyz789",
  funcionarioId: "func_123abc",
  titulo: "Desafio de Eficiência em Processos Internos",
  descricao: "Analise fluxos operacionais e proponha melhorias para aumentar a produtividade e reduzir retrabalhos em setores administrativos.",
  dataInicio: "2025-07-01T00:00:00Z",
  dataFim: "2025-07-31T23:59:59Z",
  status: "ABERTO",
  interno: true,
  modalidade: "processos",
  createdAt: "2025-06-10T09:00:00Z",
  updatedAt: "2025-06-12T13:30:00Z",
};

export const mockChallenge2: ChallengeResponseDto = {
  id: 202,
  empresaId: "empresa_def456",
  funcionarioId: null,
  titulo: "Hackathon de Produto Digital",
  descricao: "Colabore no desenvolvimento de um novo produto digital com foco em acessibilidade e experiência do usuário.",
  dataInicio: "2025-08-10T00:00:00Z",
  dataFim: "2025-08-20T23:59:59Z",
  status: "ENCERRADO",
  interno: false,
  modalidade: "produto",
  createdAt: "2025-05-01T16:20:00Z",
  updatedAt: "2025-08-21T08:00:00Z",
};
