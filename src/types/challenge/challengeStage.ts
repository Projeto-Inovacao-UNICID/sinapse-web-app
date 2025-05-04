import { ChallengeStatus } from "./challengeStatus";

export interface ChallengeStage {
  estagio_atual: string;
  status: ChallengeStatus;
  anotacoes: string;
}