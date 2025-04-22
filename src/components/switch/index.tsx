'use client';

import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Switch } from '@mui/material';
import { useTheme } from 'next-themes';

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  const handleChange = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Switch
      checked={theme === 'dark'}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'Switch between dark and light mode' }}
      icon={<DarkModeIcon />}
      checkedIcon={<LightModeIcon />}
    />
  );
}
