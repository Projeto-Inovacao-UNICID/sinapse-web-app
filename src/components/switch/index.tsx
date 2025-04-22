'use client';

import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Switch } from '@mui/material';
import { useTheme } from 'next-themes';

export function ThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme();
  console.log(resolvedTheme);

  return (
    <Switch
      checked={resolvedTheme === 'dark'}
      onChange={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      inputProps={{ 'aria-label': 'Switch between dark and light mode' }}
      icon={<DarkModeIcon />}
      checkedIcon={<LightModeIcon />}
    />
  );
}
