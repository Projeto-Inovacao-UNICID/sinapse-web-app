// DTO para criação de cargo
export interface CreateCompanyRoleDto {
  nome: string;
}

// DTO de retorno de empresa
export interface CompanyDto {
  id: string; // UUID
  nome: string;
  username: string;
  email: string;
  descricao: string;
  website: string;
}

// DTO para vincular funcionário à empresa
export interface CreateEmployeeDto {
  usuarioId: string; // UUID
  cargoId: number;
}

// DTO com dados completos do funcionário
export interface EmployeeDto {
  id: number;
  usuarioId: string; // UUID
  nomeUsuario: string;
  cargoId: number;
  nomeCargo: string;
  ativo: boolean;
  dataContratacao: string; // ISO Date
}

// DTO para requisição de vínculo funcionário
export interface EmployeeRequestDto {
  usuarioId: string;
  cargoId: number;
}

// DTO para atualizar funcionário
export interface UpdateEmployeeDto {
  cargoId?: number;
  ativo?: boolean;
}

// DTO de login da empresa
export interface CompanyLoginDto {
  username: string;
  senha: string;
}

// DTO para avaliação de empresa
export interface CompanyRatingDto {
  nota: number;
  empresaId: string; // UUID
  comentario?: string;
}

// DTO para atualizar permissões de cargo
export interface UpdateCompanyRolePermissionsDto {
  permissoesIds: number[];
}
