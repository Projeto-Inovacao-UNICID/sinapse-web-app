import { useQuery } from "@tanstack/react-query";
import { SessionService } from "@/service/session/SessionService";
import { SessionResponse } from "@/types";

const fetchSession = async (): Promise<SessionResponse> => {
  const service = new SessionService();
  return service.getSession();
};

export function useSession() {
  const {
    data: session,
    isLoading: loading,
    error,
    refetch,
  } = useQuery<SessionResponse>({
    queryKey: ["session"],
    queryFn: fetchSession,
    staleTime: 1000 * 60 * 5, // cache por 5 minutos
    refetchOnWindowFocus: false,
  });

  return { session, loading, error, refetch };
}
