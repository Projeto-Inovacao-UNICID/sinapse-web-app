'use client';

import ChatIcon from '@mui/icons-material/Chat';
import ChatIconOutlined from '@mui/icons-material/ChatOutlined';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import EmojiEventsIconOutlined from '@mui/icons-material/EmojiEventsOutlined';
import HomeIcon from '@mui/icons-material/Home';
import HomeIconOutlined from '@mui/icons-material/HomeOutlined';
import PersonIcon from '@mui/icons-material/Person';
import PersonIconOutlined from '@mui/icons-material/PersonOutlined';
import SearchIcon from '@mui/icons-material/Search';
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
import { motion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';

import { useSearch } from '@/hooks/header/useSearch';
import { useSession } from '@/hooks/session/useSession';
import { NotificationButton } from './notification-button';
import { SettingsButton } from './settings-button';

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
  const pathname = usePathname();
  const { session } = useSession();
  const userId = session?.id!;
  const roles = session?.roles;

  const { open, setOpen, options, loading, inputValue, setInputValue } = useSearch();

  const profileRoute = roles?.includes("ROLE_USER")
    ? `/profile/me/${userId}`
    : `/empresa/me/${userId}`;

  const navClick = (route: string) => {
    router.push(route);
  };

  const navItems = [
    {
      filled: <HomeIcon sx={iconStyles} />,
      outlined: <HomeIconOutlined sx={iconStyles} />,
      route: '/',
    },
    {
      filled: <EmojiEventsIcon sx={iconStyles} />,
      outlined: <EmojiEventsIconOutlined sx={iconStyles} />,
      route: '/desafios',
    },
    {
      filled: <ChatIcon sx={iconStyles} />,
      outlined: <ChatIconOutlined sx={iconStyles} />,
      route: '/conversas',
    },
    {
      filled: <PersonIcon sx={iconStyles} />,
      outlined: <PersonIconOutlined sx={iconStyles} />,
      route: profileRoute,
    },
  ];

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
          {navItems.map(({ filled, outlined, route }, index) => {
            const isActive =
              pathname === route ||
              (route.includes('/me/') && pathname.startsWith(route.split('/me/')[0])); // para rota do perfil
            return (
              <motion.button
                key={index}
                style={iconButtonStyles}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 300 }}
                onClick={() => navClick(route)}
              >
                {isActive ? filled : outlined}
              </motion.button>
            );
          })}
          <NotificationButton />
          <SettingsButton />
        </div>
      </div>
    </header>
  );
}
