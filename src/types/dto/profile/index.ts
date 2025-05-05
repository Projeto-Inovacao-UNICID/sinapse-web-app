export * from "./empresa";
export * from "./user";

// Comment displayed on the public profile
export interface ProfileCommentDto {
  id: number;
  autorId: string;       // UUID
  conteudo: string;
  criadoEm: string;      // ISO date
}

