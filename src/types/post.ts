export interface Post {
    id: string;
    repostId?: string;
    conteudo: string;
    createdAt: string;
    updatedAt: string;
    arquivos?: any[];
}