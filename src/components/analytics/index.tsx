import React from "react";
import { Grid, Typography } from "@mui/material";
import { mockDesafioMetrics } from "@/mocks/metrics/mockChallengeMetrics";
import TotalCards from "./TotalCards";
import InscritosPorEstagioChart from "./InscritosPorEstagioChart";
import TempoMedioAprovacaoChart from "./TempoMedioAprovacaoChart";
import DistribuicaoSoloEquipeChart from "./DistribuicaoSoloEquipeChart";
import TaxaReprovacaoChart from "./TaxaReprovacao";

const DashboardPage = () => {
  return (
    <main className="p-4 space-y-4">
      <Typography variant="h4" gutterBottom>
        Dashboard do Desafio
      </Typography>

      <Grid container spacing={2}>
        <TotalCards metrics={mockDesafioMetrics} />
        <InscritosPorEstagioChart data={mockDesafioMetrics.inscritosPorEtapa} />
        <TempoMedioAprovacaoChart data={mockDesafioMetrics.tempoMedioAprovacao} />
        <DistribuicaoSoloEquipeChart
          solo={mockDesafioMetrics.inscritosSolo}
          equipe={mockDesafioMetrics.inscritosEquipe}
        />
        <TaxaReprovacaoChart data={mockDesafioMetrics.taxaReprovacao} />
      </Grid>
    </main>
  );
};

export default DashboardPage;
