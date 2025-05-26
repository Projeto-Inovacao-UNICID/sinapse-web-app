import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, Grid, Typography } from "@mui/material";

interface Props {
  solo: number;
  equipe: number;
}

const COLORS = ["var(--primary)", "var(--accent)"];

const DistribuicaoSoloEquipeChart: React.FC<Props> = ({ solo, equipe }) => {
  const data = [
    { name: "Solo", value: solo },
    { name: "Equipe", value: equipe },
  ];

  return (
    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
      <Card style={{ backgroundColor: "var(--card)", borderRadius: "var(--radius)" }}>
        <CardContent>
          <Typography variant="subtitle1" gutterBottom>
            Distribuição Solo x Equipe
          </Typography>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" outerRadius={80}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default DistribuicaoSoloEquipeChart;
