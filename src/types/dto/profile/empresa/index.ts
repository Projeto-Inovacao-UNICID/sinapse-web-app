// DTO para atualização de perfil da empresa
export interface UpdateCompanyProfileDto {
  nome: string;
  username: string;
  email: string;
  descricao: string;
  website: string;
}

// DTO de prévia de avaliação feita por usuário
export interface CompanyReviewPreviewDto {
  nota: number;             // valor entre 1 e 5
  comentario: string | null;
  autor: string;            // nome do autor ou "Usuário Anônimo"
}

// DTO para perfil privado da empresa (visível para o dono/admins)
export interface CompanyPrivateProfileDto {
  id: string;                         // UUID
  nome: string;
  username: string;
  email: string;
  descricao: string;
  website: string;
  temImagem: boolean;
  aprovadaPelaAdministracao: boolean | null;
  ativo: boolean | null;
  criadoEm: string;                  // ISO date
  atualizadoEm: string;             // ISO date
}

// DTO para pré-visualização de postagens
export interface PostPreviewDto {
  id: number;
  conteudo: string;
  arquivos: string[];
  criadoEm: string;                 // ISO date
}

// DTO para perfil público da empresa (visível para qualquer usuário)
export interface CompanyPublicProfileDto {
  id: string;                       // UUID
  nome: string;
  username: string;
  descricao: string;
  website: string;
  temImagem: boolean;
  verificada: boolean | null;
  criadoEm: string;                // ISO date
  postagensRecentes: PostPreviewDto[];
  totalPostagens: number;
  totalReacoes: number;
  totalFuncionarios: number;
  notaMedia: number | null;        // Média de 1.0 a 5.0
}
