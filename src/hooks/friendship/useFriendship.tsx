import { useEffect, useState } from 'react';
import { FriendshipService } from '@/service/friendship/FriendshipService';
import { User } from '@/types';

export function useFriendship() {
  const [friends, setFriends] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const service = new FriendshipService();
        const result = await service.getFriendship();
        setFriends(result);
      } catch (err: any) {
        setError(err.message ?? 'Erro ao carregar amizades');
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  return { friends, loading, error };
}
