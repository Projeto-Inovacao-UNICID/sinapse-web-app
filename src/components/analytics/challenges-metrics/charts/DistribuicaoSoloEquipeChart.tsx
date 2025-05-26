import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, Grid, Typography, Box } from "@mui/material";

interface Props {
  solo: number;
  equipe: number;
}

const COLORS = ["var(--primary)", "var(--bright-primary)"];

const DistribuicaoSoloEquipeChart: React.FC<Props> = ({ solo, equipe }) => {
  const data = [
    { name: "Solo", value: solo, color: COLORS[0] },
    { name: "Equipe", value: equipe, color: COLORS[1] },
  ];

  return (
    <Grid size={{ xs: 12, sm: 6, md: 6 }}>
      <Card style={{ backgroundColor: "var(--bgCardMetrics)", borderRadius: "var(--radius)" }}>
        <CardContent>
          <Typography variant="h6" sx={{ color: 'var(--foreground)', fontWeight: 'bold', mb: 2 }}>
            Distribuição Solo x Equipe
          </Typography>

          <Grid container spacing={2} direction="row" alignItems="center">
            {/* Legenda */}
            <Grid size={5}>
              {data.map((entry, index) => (
                <Box key={index} sx = {{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      backgroundColor: entry.color,
                      mr: 1,
                    }}
                  />
                  <Typography variant="body2" color="var(--foreground)">
                    {entry.name}
                  </Typography>
                </Box>
              ))}
            </Grid>

            {/* Gráfico */}
            <Grid size={7}>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={data} dataKey="value" nameKey="name" outerRadius={80} label>
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default DistribuicaoSoloEquipeChart;
