import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { mockDesafioMetrics } from "@/mocks/metrics/mockChallengeMetrics";
import TotalCards from "./TotalCards";
import InscritosPorEstagioChart from "./InscritosPorEstagioChart";
import TempoMedioAprovacaoChart from "./TempoMedioAprovacaoChart";
import DistribuicaoSoloEquipeChart from "./DistribuicaoSoloEquipeChart";
import TaxaReprovacaoChart from "./TaxaReprovacao";
import TrackChangesIcon from '@mui/icons-material/TrackChanges';

const ChallengesDashboard = () => {
  return (
    <Box sx={{ p: 4, backgroundColor: "var(--bgSecondary)", borderRadius: 2, mb: 4, boxShadow: 3 }}>
      <Typography variant="h5" sx={{ color: "var(--foreground)", fontWeight: "bold", mb: 2, display: 'flex', alignItems: 'center' }}>
        <TrackChangesIcon fontSize="inherit" style={{ marginRight: 8 }} />
        Dashboard de Desafios
      </Typography>

      <Grid container spacing={2}>
        <TotalCards metrics={mockDesafioMetrics} />
        <InscritosPorEstagioChart data={mockDesafioMetrics.inscritosPorEtapa} />
        <DistribuicaoSoloEquipeChart
          solo={mockDesafioMetrics.inscritosSolo}
          equipe={mockDesafioMetrics.inscritosEquipe}
        />
        <TempoMedioAprovacaoChart data={mockDesafioMetrics.tempoMedioAprovacao} />
        <TaxaReprovacaoChart data={mockDesafioMetrics.taxaReprovacao} />
      </Grid>
    </Box>
  );
};

export default ChallengesDashboard;
