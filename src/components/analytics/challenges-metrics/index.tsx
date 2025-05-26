import React from "react";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import {
  mockDesafioMetrics,
  mockDesafioMetrics2,
} from "@/mocks/metrics/mockChallengeMetrics";
import TotalCards from "./charts/TotalCards";
import InscritosPorEstagioChart from "./charts/InscritosPorEstagioChart";
import TempoMedioAprovacaoChart from "./charts/TempoMedioAprovacaoChart";
import DistribuicaoSoloEquipeChart from "./charts/DistribuicaoSoloEquipeChart";
import TaxaReprovacaoChart from "./charts/TaxaReprovacao";
import MetricasLocalizacaoChart from "./charts/MetricasLocalizacaoChart";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import { mockChallenge1, mockChallenge2 } from "@/mocks/mockChallenges";

const ChallengesDashboard = () => {
  const desafios = [mockChallenge1, mockChallenge2];
  const [desafio, setDesafio] = React.useState(mockChallenge1);
  const [metrics, setMetric] = React.useState(mockDesafioMetrics);

  const handleChange = (event: SelectChangeEvent<number>) => {
    const selectedId = Number(event.target.value);
    const selectedDesafio = desafios.find((d) => d.id === selectedId);
    if (!selectedDesafio) return;

    setDesafio(selectedDesafio);

    if (selectedId === 201) {
      setMetric(mockDesafioMetrics);
    } else if (selectedId === 202) {
      setMetric(mockDesafioMetrics2);
    }
  };

  return (
    <Box
      sx={{
        p: 4,
        backgroundColor: "var(--bgSecondary)",
        borderRadius: 2,
        mb: 4,
        boxShadow: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "var(--foreground)",
            fontWeight: "bold",
            mb: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          <TrackChangesIcon fontSize="inherit" style={{ marginRight: 8 }} />
          Dashboard de Desafios
        </Typography>

        <FormControl sx={{ minWidth: 240 }}>
          <InputLabel id="select-desafio-label" sx={{ color: "var(--muted)", "&.Mui-focused": { color: "var(--primary)" } }}>
            Desafio
          </InputLabel>
          <Select<number>
            labelId="select-desafio-label"
            id="select-desafio"
            value={desafio.id}
            label="Desafio"
            onChange={handleChange}
            sx={{
              color: "var(--foreground)",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--muted)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--primary)",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--primary)",
              },
              "& .MuiSelect-icon": {
                color: "var(--muted)",
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: "var(--card)",
                  color: "var(--foreground)",
                },
              },
            }}
          >
            {desafios.map((d) => (
              <MenuItem key={d.id} value={d.id}>
                {d.titulo}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={2}>
        <TotalCards metrics={metrics} />
        <InscritosPorEstagioChart data={metrics.inscritosPorEtapa} />
        <DistribuicaoSoloEquipeChart
          solo={metrics.inscritosSolo}
          equipe={metrics.inscritosEquipe}
        />
        <TempoMedioAprovacaoChart data={metrics.tempoMedioAprovacao} />
        <TaxaReprovacaoChart data={metrics.taxaReprovacao} />
        <MetricasLocalizacaoChart data={metrics.metricasPorLocalizacao} />
      </Grid>
    </Box>
  );
};

export default ChallengesDashboard;
