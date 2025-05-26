import { hardSkillsFormMetricsMock, softSkillsFormMetricsMock } from "@/mocks/metrics/mockFullFormMetrics";
import { mockForms } from "@/mocks/mockForms";
import { FormFieldMetricsDto } from "@/types";
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { useState } from "react";
import { GroupAvgScoreChart, LeadTimeChart, ScoreDistributionChart, SelectFieldRadarChart, StatusPieChart } from "./charts";

export default function Dashboard() {
  const forms = mockForms;
  const [form, setForm] = useState(forms[0]);
  const [metrics, setMetrics] = useState(softSkillsFormMetricsMock);
  const selectFields = metrics.fieldMetrics.filter(f => f.fieldType === "SELECT");

  const handleChange = (event: SelectChangeEvent<String>) => {
    const selectedId = String(event.target.value);
    const selectedForm = forms.find((f) => f.id === selectedId);
    if (!selectedForm) return;

    setForm(selectedForm);

    if (selectedId === '1') {
      setMetrics(hardSkillsFormMetricsMock);
    } else if (selectedId === '2') {
      setMetrics(softSkillsFormMetricsMock);
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
            <ContentPasteIcon fontSize="inherit" style={{ marginRight: 8 }} />
            Dashboard de Formulários
          </Typography>

          <FormControl sx={{ minWidth: 240 }}>
            <InputLabel id="select-desafio-label" sx={{ color: "var(--muted)", "&.Mui-focused": { color: "var(--primary)" } }}>
              Formulário
            </InputLabel>
            <Select<String>
              labelId="select-desafio-label"
              id="select-form"
              value={form.id}
              label="Formulário"
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
              {forms.map((f) => (
                <MenuItem key={f.id} value={f.id}>
                  {f.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Grid container spacing={3}>
          <Grid size={{xs: 12, md: 6}}>
            <ScoreDistributionChart data={metrics.scoreDistribution} />
          </Grid>
          <Grid size={{xs: 12, md: 6}}>
            <StatusPieChart data={metrics.statusDistribution} />
          </Grid>
          <Grid size={{xs: 12, md: 6}}>
            <GroupAvgScoreChart data={metrics.groupMetrics} />
          </Grid>
          <Grid size={{xs: 12, md: 6}}>
            <LeadTimeChart data={metrics.time.leadTimeBuckets} />
          </Grid>
          {selectFields.map((selectField: FormFieldMetricsDto) => (
            <Grid size={{xs: 12, md: 6}} key={selectField.fieldId}>
              <SelectFieldRadarChart title={selectField.label} colorIndex={selectFields.indexOf(selectField)} data={selectField.optionDistribution} />
            </Grid>
          ))}
        </Grid>
      </Box>
  );
}
