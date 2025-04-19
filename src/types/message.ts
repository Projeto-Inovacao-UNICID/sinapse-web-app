export interface Message {
    id: number;
    conversaId: number;
    remetenteTipo: string;
    remetenteId: string;
    conteudo: string;
    createdAt: string;
    editada: boolean;
    removida: boolean;
}