// DTO para criação de um novo cargo em um grupo
export interface CreateGroupRoleDto {
  nome: string;
}

// DTO de resposta com dados de um cargo
export interface GroupRoleDto {
  id: number;
  nome: string;
  createdAt: string;     // ISO date
  updatedAt: string;     // ISO date
}

// DTO representando um convite de grupo
export interface GroupInviteDto {
  conviteId: number;
  grupoId: number;
  quemConvidou: string;  // UUID
  status: string;
  criadoEm: string;      // ISO date
}

// DTO para criação/edição de grupo
export interface GroupDto {
  nome: string;
  descricao: string;
  publico: boolean;
  liderId: string;       // UUID
}

// DTO de requisição para criação ou edição de grupo
export interface GroupRequestDto {
  nome: string;
  descricao: string;
  publico: boolean;
}

// DTO de resposta com dados completos de um grupo
export interface Group {
  id: number;
  nome: string;
  descricao: string;
  liderId: string;       // UUID
  publico: boolean;
  createdAt: string;     // ISO date
  updatedAt: string;     // ISO date
}

// DTO representando um membro do grupo
export interface GroupMemberDto {
  usuarioId: string;     // UUID
  cargoId: number;
  dataEntrada: string;   // ISO date
}

// DTO para atribuição de permissões a um cargo de grupo
export interface GroupRolePermissionsDto {
  permissoesIds: number[];
}

export interface GroupResponseDto {
  content: Group[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  empty: boolean;
}
