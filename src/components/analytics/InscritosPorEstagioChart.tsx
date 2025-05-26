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
    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
      <Card style={{ backgroundColor: "var(--card)", borderRadius: "var(--radius)" }}>
        <CardContent>
          <Typography variant="subtitle1" gutterBottom>
            Inscritos por Estágio
          </Typography>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
              <XAxis dataKey="estagioRecrutamentoId" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="totalInscritos" fill="var(--primary)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default InscritosPorEstagioChart;
