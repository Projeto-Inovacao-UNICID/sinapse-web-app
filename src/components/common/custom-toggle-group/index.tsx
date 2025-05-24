import { ToggleButtonGroup, ToggleButton } from '@mui/material';

interface Option<T extends {}> {
  value: T;
  label: string;
}

interface CustomToggleGroupProps<T extends {}> {
  value: T;
  onChange: (value: T) => void;
  options: Option<T>[];
}

export function CustomToggleGroup<T extends {}>({
  value,
  onChange,
  options,
}: CustomToggleGroupProps<T>) {
  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={(_, v: T | null) => {
        if (v !== null) onChange(v);
      }}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        '& > * + *': { ml: 1 },
        '& .MuiToggleButton-root': {
          backgroundColor: 'var(--input) !important',
          color: 'var(--muted) !important',
          border: 'none',
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: '999px',
          px: 2,
          py: 0.5,
          transition: 'background-color 0.3s, color 0.3s',
          '&:hover': {
            backgroundColor: 'var(--input) !important',
          },
        },
        '& .Mui-selected': {
          backgroundColor: 'var(--primary) !important',
          color: 'var(--foreground) !important',
          '&:hover': {
            backgroundColor: 'var(--primary) !important',
          },
        },
      }}
    >
      {options.map((option) => (
        <ToggleButton
          key={String(option.value)}
          value={option.value}
        >
          {option.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
