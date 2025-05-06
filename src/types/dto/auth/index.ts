// DTO de login: tipo de conta, username e senha
export interface LoginDto {
  tipo: string;
  username: string;
  senha: string;
}

// DTO de registro de conta (usuário ou empresa)
export interface RegisterDto {
  tipo: string;
  nome: string;
  username: string;
  email: string;
  senha: string;
  description?: string; // opcional (empresa)
  website?: string;     // opcional (empresa)
}

// DTO para criação ou atualização de usuário
export interface UserAuthDto {
  username: string;
  email: string;
  senha: string;
  nome: string;
}
