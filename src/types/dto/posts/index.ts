// dtos/posts-dtos.ts

// ========== Comentários ==========

// Base comum de comentário usado em árvore
export interface BaseCommentDto {
  id: number;
  conteudo: string;
  autorId: string;
  autorNome: string;
  autorAvatarUrl?: string;
  createdAt: string;
}

export interface Comment extends BaseCommentDto {
  respostas: Comment[];
}

// Comentário em árvore (respostas aninhadas)
export interface CommentTreeDto extends BaseCommentDto {
  postagemId: number;
  comentarioPaiId?: number;
  filhos: CommentTreeDto[];
}

// Payload para criação de comentário
export interface CommentCreateDto {
  postagemId: number;
  conteudo: string;
  comentarioPaiId?: number;
}

// Payload para atualização de comentário
export interface CommentUpdateDto {
  comentarioId: number;
  conteudo: string;
}

// Resposta paginada de comentários em árvore
export interface CommentTreePageResponse {
  content: Comment[];
  page: number;
  size: number;
  totalElements: number;
}

// ========== Postagens ==========

export interface PostFileDto {
  dados_arquivo: Uint8Array;
  nome_arquivo: string;
  tipo_arquivo: string;
  tamanho_arquivo: number;
}

export interface PostCreateDto {
  conteudo: string;
  repost_id?: number;
  arquivos?: PostFileDto[];
}

export interface PostResponseDto {
  id: number;
  autorId: string; // UUID
  autorNome: string;
  autorAvatarUrl: string;
  conteudo: string;
  createdAt: string;
  arquivoIds: number[];
  publico: boolean;
}

export interface PrivacyDto {
  publico: boolean;
}

export type ReactionType = 'CURTIR' | 'AMAR' | 'HAHA' | 'TRISTE' | 'RAIVA';


export interface ReactionsCount {
  CURTIR: number;
  AMAR:   number;
  HAHA:   number;
  TRISTE: number;
  RAIVA:  number;
}


export interface RepostDto {
  postagem_id: string;
  repost_id?: number;
  conteudo: string;
}

export interface ReacaoResponse {
  id:         string;
  postagemId: number;
  usuarioId:  string;
  tipo:       ReactionType;
}

// Modelo local para uso interno (não vem da API)
export interface Post {
  id: number
  autorId: string
  autorNome: string
  autorAvatarUrl: string
  conteudo: string
  createdAt: string
  arquivoIds: number[]
  imagemUrl?: string
  publico: boolean
  isCompany: boolean
}

export interface PostagemResponseDto {
  id: number
  autorId: string
  autorNome: string
  autorAvatarUrl: string
  conteudo: string
  createdAt: string
  arquivoIds: number[]
  publico: boolean
  isEmpresa: boolean
}
