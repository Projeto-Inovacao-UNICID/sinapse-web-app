import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, Grid, Typography } from "@mui/material";

interface Props {
  data: {
    localizacao: string;
    totalInscritos: number;
    totalConcluidos: number;
    totalReprovados: number;
  }[];
}

const MetricasLocalizacaoChart: React.FC<Props> = ({ data }) => {
  return (
    <Grid size={12}>
      <Card style={{ backgroundColor: "var(--bgCardMetrics)", borderRadius: "var(--radius)" }}>
        <CardContent>
          <Typography variant="h6" sx={{ color: 'var(--foreground)', fontWeight: 'bold', mb: 2 }}>
            Métricas por Localização
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="localizacao" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalInscritos" fill="var(--primary)" name="Inscritos" />
              <Bar dataKey="totalConcluidos" fill="var(--bright-primary)" name="Concluídos" />
              <Bar dataKey="totalReprovados" fill="var(--muted)" name="Reprovados" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default MetricasLocalizacaoChart;
