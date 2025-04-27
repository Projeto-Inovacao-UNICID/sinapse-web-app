'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
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
import HomeIcon from '@mui/icons-material/Home';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ChatIcon from '@mui/icons-material/Chat';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import { ThemeSwitch } from '../switch';
import { useSession } from '@/hooks/session/useSession';
import { NotificationButton } from './notification-button';
import { useSearch, SearchOption } from '@/hooks/header/useSearch';

const iconStyles = {
  color: 'var(--primary)',
  fontSize: '2rem'
};

const iconButtonStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer'
};

export function Header() {
  const router = useRouter();
  const { session } = useSession();
  const userId = session?.id!;
  const { open, setOpen, options, loading, inputValue, setInputValue } = useSearch();

  const navClick = (route: string) => {
    router.push(route);
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '65px',
        zIndex: 1000,
        backgroundColor: 'var(--bgSecondary)',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        display: 'grid',
        gridTemplateColumns: '2fr minmax(0, 8fr) 2fr',
        alignItems: 'center'
      }}
    >
      <div style={{ gridColumn: '2', display: 'flex', alignItems: 'center', gap: 16 }}>
        <motion.img
          src="/assets/logo.png"
          alt="Logo"
          style={{ height: '2.5rem', cursor: 'pointer' }}
          onClick={() => navClick('/')}
          whileHover={{
            scale: 1.3,
            rotate: 360,
            transition: { repeat: Infinity, repeatType: 'loop', duration: 3, ease: 'linear' }
          }}
          whileTap={{ scale: 0.95 }}
        />

        <motion.div
          style={{ flexGrow: 1, margin: '0 1rem' }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
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
              navClick(path);
            }}
            renderOption={(props, opt) => (
              <li {...props} key={typeof opt === 'string' ? opt : `${opt.type}-${opt.id}`}>
                <ListItemButton>
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
            renderInput={params => (
              <TextField
                {...params}
                fullWidth
                variant="outlined"
                placeholder="Buscar..."
                size="small"
                sx={{
                  width: '75%',
                  backgroundColor: 'var(--input)',
                  borderRadius: 2,
                  input: { color: 'var(--foreground)' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'transparent' },
                    '&:hover fieldset': { borderColor: 'var(--primary)' },
                    '&.Mui-focused fieldset': { borderColor: 'var(--primary)' }
                  }
                }}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: 'var(--muted)' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <>
                      {loading && <CircularProgress size={20} />}
                      {params.InputProps.endAdornment}
                    </>
                  )
                }}
              />
            )}
          />
        </motion.div>

        <div style={{ display: 'flex', gap: 16 }}>
          <motion.button style={iconButtonStyles} whileHover={{ scale: 1.3 }} whileTap={{ scale: 0.9 }} onClick={() => navClick('/')}>
            <HomeIcon sx={iconStyles} />
          </motion.button>
          <motion.button style={iconButtonStyles} whileHover={{ scale: 1.3 }} whileTap={{ scale: 0.9 }}>
            <EmojiEventsIcon sx={iconStyles} />
          </motion.button>
          <motion.button style={iconButtonStyles} whileHover={{ scale: 1.3 }} whileTap={{ scale: 0.9 }} onClick={() => navClick('/conversas')}>
            <ChatIcon sx={iconStyles} />
          </motion.button>
          <motion.button style={iconButtonStyles} whileHover={{ scale: 1.3 }} whileTap={{ scale: 0.9 }} onClick={() => navClick(`/profile/me/${userId}`)}>
            <PersonIcon sx={iconStyles} />
          </motion.button>
          <motion.button style={iconButtonStyles} whileHover={{ scale: 1.3 }} whileTap={{ scale: 0.9 }}>
            <SettingsIcon sx={iconStyles} />
          </motion.button>
          <NotificationButton />
          <ThemeSwitch />
        </div>
      </div>
    </header>
  );
}
