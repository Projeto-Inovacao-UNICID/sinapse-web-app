import { Box, Grid, Tab, Tabs } from "@mui/material";
import ChallengesDashboard from "./challenges-metrics";
import { useState } from "react";
import FormsDashboard from "./forms-metrics";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from "../common/icon-buttons";

export default function DashboardPage() {
  const [tabValue, setTabValue] = useState(0);

  return (
    <div
      style={{  
        display: 'grid',
        gridTemplateColumns: '0fr minmax(0, 12fr) 0fr',
        minHeight: '100vh',
      }}
    >
      <div style={{ gridColumn: 2, padding: 24 }}>
        <Box sx={{ display: 'flex', alignContent:'center', gap: 2 }}>
        <IconButton icon={<ArrowBackIcon />} onClick={() => window.history.back()} />
          <Tabs
            value={tabValue}
            onChange={(_, v) => setTabValue(v)}
            textColor="inherit"
            TabIndicatorProps={{ style: { backgroundColor: 'var(--primary)' } }}
            sx={{
              mb: 2,
              '& .MuiTab-root': {
                color: 'var(--muted)',
                textTransform: 'none',
              },
              '& .Mui-selected': { color: 'var(--primary)' },
            }}
          >
            <Tab label="Desafios" value={0} />
            <Tab label="Formulários" value={1} />
          </Tabs>
        </Box>

        <Grid size={12}>
          {tabValue === 0 && <ChallengesDashboard />}
          {tabValue === 1 && <FormsDashboard />}
        </Grid>
      </div>
    </div>
  );
}