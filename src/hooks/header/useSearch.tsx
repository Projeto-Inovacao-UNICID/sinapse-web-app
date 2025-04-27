import { useState, useEffect, useCallback } from 'react';

export interface SearchOption {
  id: string;
  nome: string;
  imageUrl: string;
  type: 'empresa' | 'usuario';
}

export function useSearch() {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<SearchOption[]>([]);
  const [inputValue, setInputValue] = useState('');

  const loading = open && inputValue !== '' && options.length === 0;
  const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080').replace(/\/$/, '');

  const fetchSearch = useCallback(async (q: string) => {
    if (!q) {
      setOptions([]);
      return;
    }
    try {
      const res = await fetch(
        `${API_BASE}/search?q=${encodeURIComponent(q)}`,
        { credentials: 'include' }
      );
      const data: {
        empresas: { id: string; nome: string; imageUrl: string }[];
        usuarios: { id: string; nome: string; imageUrl: string }[];
      } = await res.json();
      const empresas = data.empresas.map(e => ({ ...e, type: 'empresa' as const }));
      const usuarios = data.usuarios.map(u => ({ ...u, type: 'usuario' as const }));
      setOptions([...empresas, ...usuarios]);
    } catch (err) {
      console.error('Search error:', err);
    }
  }, [API_BASE]);

  useEffect(() => {
    const handler = setTimeout(() => fetchSearch(inputValue), 300);
    return () => clearTimeout(handler);
  }, [inputValue, fetchSearch]);

  return { open, setOpen, inputValue, setInputValue, options, loading };
}
