import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '@/service/api';

export type ReactionType = 'CURTIR' | 'AMAR' | 'HAHA' | 'TRISTE' | 'RAIVA';

export interface ReactionsCount {
  CURTIR: number;
  AMAR:   number;
  HAHA:   number;
  TRISTE: number;
  RAIVA:  number;
}

const DEFAULT_COUNTS: ReactionsCount = {
  CURTIR: 0,
  AMAR:   0,
  HAHA:   0,
  TRISTE: 0,
  RAIVA:  0,
};

export interface ReacaoRequest {
  tipo: ReactionType;
}

export interface ReacaoResponse {
  id:         string;
  postagemId: string;
  usuarioId:  string;
  tipo:       ReactionType;
}

/**
 * Contagem de reações.
 */
export function useReactionsCount(postagemId: string) {
  return useQuery<ReactionsCount, Error>({
    queryKey: ['reacoes', postagemId],
    queryFn: async () => {
      const { data } = await axiosInstance.get<ReactionsCount>(
        `/postagens/${postagemId}/reacoes`,
        { withCredentials: true }
      );
      return { ...DEFAULT_COUNTS, ...data };
    },
    staleTime: 1000 * 10,
    refetchOnWindowFocus: false
  });
}

/**
 * Minha reação atual.
 */
export function useMyReaction(postagemId: string) {
    return useQuery<ReactionType | null, Error>({
      queryKey: ['minha-reacao', postagemId],
      queryFn: async () => {
        const { data } = await axiosInstance.get<ReactionType | null>(
          `/postagens/${postagemId}/reacoes/me`,
          { withCredentials: true }
        );
        return data;
      },
      staleTime: 10_000,
      refetchOnWindowFocus: false,
      refetchOnMount: 'always',
    });
  }
  
/**
 * Curtir / reagir (com optimistic update).
 */
export function useReactPost(postagemId: string) {
  const qc = useQueryClient();
  return useMutation<ReacaoResponse, Error, ReacaoRequest>({
    mutationFn: payload =>
      axiosInstance.post<ReacaoResponse>(
        `/postagens/${postagemId}/reacoes`,
        payload,
        { withCredentials: true }
      ).then(r => r.data),
    onMutate: async ({ tipo }) => {
      await qc.cancelQueries({ queryKey: ['reacoes', postagemId] });
      await qc.cancelQueries({ queryKey: ['minha-reacao', postagemId] });

      const previousCounts = qc.getQueryData<ReactionsCount>(['reacoes', postagemId]);
      const previousMe     = qc.getQueryData<ReactionType | null>(['minha-reacao', postagemId]);

      qc.setQueryData(['minha-reacao', postagemId], tipo);
      qc.setQueryData(['reacoes', postagemId], (old: any) => ({
        ...DEFAULT_COUNTS,
        ...old,
        [tipo]: (old?.[tipo] ?? 0) + 1,
        ...(previousMe ? { [previousMe]: ((old?.[previousMe] ?? 1) - 1) } : {})
      }));

      return { previousCounts, previousMe };
    },
    onError: (_err, _vars, context: any) => {
      qc.setQueryData(['reacoes', postagemId], context.previousCounts);
      qc.setQueryData(['minha-reacao', postagemId], context.previousMe);
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ['reacoes', postagemId] });
      qc.invalidateQueries({ queryKey: ['minha-reacao', postagemId] });
    }
  });
}

/**
 * Remover minha reação (optimistic).
 */
export function useRemoveReaction(postagemId: string) {
  const qc = useQueryClient();
  return useMutation<void, Error, void>({
    mutationFn: () =>
      axiosInstance.delete(
        `/postagens/${postagemId}/reacoes`,
        { withCredentials: true }
      ).then(() => {}),
    onMutate: async () => {
      await qc.cancelQueries({ queryKey: ['reacoes', postagemId] });
      await qc.cancelQueries({ queryKey: ['minha-reacao', postagemId] });

      const previousCounts = qc.getQueryData<ReactionsCount>(['reacoes', postagemId]);
      const previousMe     = qc.getQueryData<ReactionType | null>(['minha-reacao', postagemId]);

      if (previousMe) {
        qc.setQueryData(['minha-reacao', postagemId], null);
        qc.setQueryData(['reacoes', postagemId], (old: any) => ({
          ...DEFAULT_COUNTS,
          ...old,
          [previousMe]: (old?.[previousMe] ?? 1) - 1
        }));
      }

      return { previousCounts, previousMe };
    },
    onError: (_err, _vars, context: any) => {
      qc.setQueryData(['reacoes', postagemId], context.previousCounts);
      qc.setQueryData(['minha-reacao', postagemId], context.previousMe);
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ['reacoes', postagemId] });
      qc.invalidateQueries({ queryKey: ['minha-reacao', postagemId] });
    }
  });
}
