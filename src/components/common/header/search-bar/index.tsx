import {
  Autocomplete,
  Avatar,
  CircularProgress,
  InputAdornment,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  TextField
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/navigation';
import { useSearch } from '@/hooks/header/useSearch';

export function SearchBar({ onSelect }: { onSelect?: () => void }) {
  const { open, setOpen, options, loading, inputValue, setInputValue } = useSearch();
  const router = useRouter();

  return (
    <Autocomplete
      freeSolo
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      options={options}
      getOptionLabel={opt => (typeof opt === 'string' ? opt : opt.nome)}
      loading={loading}
      inputValue={inputValue}
      onInputChange={(_, v) => setInputValue(v)}
      onChange={(_, val) => {
        if (typeof val === 'string' || !val) return;
        const path =
          val.type === 'empresa'
            ? `/empresa/me/${val.id}`
            : `/profile/me/${val.id}`;
        router.push(path);
        onSelect?.();
      }}
      sx={{
        backgroundColor: 'var(--card)',
        width: '100%',
        '& input': { color: 'var(--foreground)' }
      }}
      slotProps={{
        popper: {
          modifiers: [{ name: 'offset', options: { offset: [0, 8] } }],
        },
        paper: {
          sx: {
            backgroundColor: 'var(--card)',
            color: 'var(--foreground)',
            borderRadius: 2,
            boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
          },
        },
        listbox: {
          sx: {
            backgroundColor: 'var(--card)',
            color: 'var(--foreground)',
          },
        },
      }}
      renderOption={(props, opt) => (
        <li {...props} key={typeof opt === 'string' ? opt : `${opt.type}-${opt.id}`}>
          <ListItemButton
            sx={{
              backgroundColor: 'var(--card)',
              color: 'var(--foreground)',
              '&:hover': {
                backgroundColor: 'var(--muted)',
              }
            }}
          >
            {typeof opt !== 'string' && (
              <>
                <ListItemAvatar>
                  <Avatar src={opt.imageUrl} />
                </ListItemAvatar>
                <ListItemText primary={opt.nome} />
              </>
            )}
          </ListItemButton>
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          placeholder="Buscar..."
          size="small"
          fullWidth
          sx={{
            backgroundColor: 'var(--card)',
            borderRadius: 2,
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'var(--card)',
              '& fieldset': { borderColor: 'transparent' },
              '&:hover fieldset': { borderColor: 'var(--primary)' },
              '&.Mui-focused fieldset': { borderColor: 'var(--primary)' },
            },
          }}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'var(--muted-search)' }} />
              </InputAdornment>
            ),
            endAdornment: (
              <>
                {loading && (
                  <CircularProgress size={20} sx={{ color: 'var(--foreground)' }} />
                )}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}
