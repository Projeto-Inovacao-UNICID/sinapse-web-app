export interface Contact {
    name: string | undefined;
    avatarUrl: string | Blob | undefined;
    conversaId: number;
    participanteId: string;
    imagemPerfil: string;
    nome: string;
    username: string;
    tipo: string;
    ultimaInteracao: string;
}