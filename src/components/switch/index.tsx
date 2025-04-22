'use client';

import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Switch } from '@mui/material';
import { useTheme } from 'next-themes';

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  const handleChange = () => {
    // Alterna entre 'light' e 'dark' conforme o tema atual
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Switch
      checked={theme === 'dark'}  // Se o tema for 'dark', o switch será marcado
      onChange={handleChange}
      inputProps={{ 'aria-label': 'Switch between dark and light mode' }}
      icon={<LightModeIcon />}  // Ícone do Sol (Light Mode)
      checkedIcon={<DarkModeIcon />}  // Ícone da Lua (Dark Mode)
    />
  );
}
