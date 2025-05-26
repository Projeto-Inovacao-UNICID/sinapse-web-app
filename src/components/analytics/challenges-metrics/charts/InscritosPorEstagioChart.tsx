import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, Grid, Typography } from "@mui/material";

interface Props {
  data: {
    estagioRecrutamentoId: number;
    totalInscritos: number;
  }[];
}

const InscritosPorEstagioChart: React.FC<Props> = ({ data }) => {
  return (
    <Grid size={{ xs: 12, sm: 6, md: 6 }}>
      <Card sx={{ backgroundColor: "var(--bgCardMetrics)", borderRadius: "var(--radius)" }}>
        <CardContent>
          <Typography variant="h6" sx={{ color: 'var(--foreground)', fontWeight: 'bold', mb: 2 }}>
            Inscritos por Estágio
          </Typography>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
              <XAxis dataKey="estagioRecrutamentoId" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="totalInscritos" fill="var(--primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default InscritosPorEstagioChart;
