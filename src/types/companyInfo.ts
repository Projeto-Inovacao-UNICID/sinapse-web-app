export interface CompanyInfo {
  id: string;
  nome: string;
  username: string;
  email: string;
  descricao: string | null;
  website: string | null;
  temImagem: boolean;
  aprovadaPelaAdministracao: boolean;
  ativo: boolean;
  criadoEm: string;
  atualizadoEm: string | null;
}