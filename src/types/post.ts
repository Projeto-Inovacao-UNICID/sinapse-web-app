export interface Post {
    id: string;
    repostId?: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    files?: any[];
}