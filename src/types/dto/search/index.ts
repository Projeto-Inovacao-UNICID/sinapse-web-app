// search-dtos.ts

export interface CompanySearchDto {
  id: string; // UUID como string
  nome: string;
  imageUrl: string;
}

export interface UserSearchDto {
  id: string;
  nome: string;
  imageUrl: string;
}

export interface SearchResultDto {
  empresas: CompanySearchDto[];
  usuarios: UserSearchDto[];
}
