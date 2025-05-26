'use client';

import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  useMediaQuery,
  useTheme,
  Box,
  Dialog,
  DialogContent,
  Menu,
  MenuItem,
  Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import ChatIcon from '@mui/icons-material/Chat';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { motion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';

import { useSession } from '@/hooks/session/useSession';
import { NotificationButton } from './notification-button';
import { SettingsButton } from './settings-button';
import { SearchBar } from './search-bar';

const iconStyles = {
  color: 'var(--primary)',
  fontSize: '2rem'
};

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { session } = useSession();
  const userId = session?.id!;
  const roles = session?.roles;

  const profileRoute = roles?.includes('ROLE_USER')
    ? `/profile/me/${userId}`
    : `/empresa/me/${userId}`;

  const navClick = (route: string) => {
    router.push(route);
    handleMenuClose();
  };

  const navItems = [
    {
      label: 'Início',
      filled: <HomeIcon sx={iconStyles} />,
      outlined: <HomeOutlinedIcon sx={iconStyles} />,
      route: '/'
    },
    {
      label: 'Desafios',
      filled: <EmojiEventsIcon sx={iconStyles} />,
      outlined: <EmojiEventsOutlinedIcon sx={iconStyles} />,
      route: '/desafios'
    },
    {
      label: 'Conversas',
      filled: <ChatIcon sx={iconStyles} />,
      outlined: <ChatOutlinedIcon sx={iconStyles} />,
      route: '/conversas'
    },
    {
      label: 'Perfil',
      filled: <PersonIcon sx={iconStyles} />,
      outlined: <PersonOutlinedIcon sx={iconStyles} />,
      route: profileRoute
    }
  ];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{ backgroundColor: 'var(--bgSecondary)', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}
      >
        <Toolbar disableGutters sx={{ height: 65 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              px: { xs: 2, md: '16.6667%' } // margem lateral de 2 colunas no desktop
            }}
          >
            {/* Logo */}
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

            {/* Search */}
            {isMobile ? (
              <IconButton onClick={() => setSearchOpen(true)}>
                <SearchIcon sx={{ color: 'var(--foreground)' }} />
              </IconButton>
            ) : (
              <Box sx={{ flexGrow: 1, mx: 2 }}>
                <SearchBar />
              </Box>
            )}

            {/* Navegação ou menu hambúrguer */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {isMobile ? (
                <>
                  <IconButton onClick={handleMenuOpen}>
                    <MenuIcon sx={{ color: 'var(--foreground)' }} />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    PaperProps={{
                      sx: {
                        backgroundColor: 'var(--card)',
                        color: 'var(--foreground)',
                        borderRadius: 2,
                        mt: 1
                      }
                    }}
                  >
                    {navItems.map(({ label, route, filled, outlined }) => {
                      const isActive =
                        pathname === route ||
                        (route.includes('/me/') && pathname.startsWith(route.split('/me/')[0]));
                      return (
                        <MenuItem key={route} onClick={() => navClick(route)}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {isActive ? filled : outlined}
                            {label}
                          </Box>
                        </MenuItem>
                      );
                    })}
                    <Divider />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 2, py: 1 }}>
                      <NotificationButton />
                      <SettingsButton />
                    </Box>
                  </Menu>
                </>
              ) : (
                <>
                  {navItems.map(({ filled, outlined, route }, index) => {
                    const isActive =
                      pathname === route ||
                      (route.includes('/me/') && pathname.startsWith(route.split('/me/')[0]));
                    return (
                      <motion.button
                        key={index}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: 0,
                          border: 'none',
                          backgroundColor: 'transparent',
                          cursor: 'pointer'
                        }}
                        whileHover={{ scale: 1.3 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => navClick(route)}
                      >
                        {isActive ? filled : outlined}
                      </motion.button>
                    );
                  })}
                  <NotificationButton />
                  <SettingsButton />
                </>
              )}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Modal de busca para mobile */}
      <Dialog open={searchOpen} onClose={() => setSearchOpen(false)} fullScreen>
        <DialogContent sx={{ backgroundColor: 'var(--bgSecondary)', padding: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <IconButton onClick={() => setSearchOpen(false)}>
              <CloseIcon sx={{ color: 'var(--foreground)' }} />
            </IconButton>
            <Box sx={{ flexGrow: 1, ml: 1 }}>
              <SearchBar onSelect={() => setSearchOpen(false)} />
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
