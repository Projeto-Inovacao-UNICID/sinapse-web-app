import { Card, CardContent, Typography } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export const ScoreDistributionChart = ({ data }: { data: Record<string, number> }) => {
  const chartData = Object.entries(data).map(([range, count]) => ({ range, count }));

  return (
    <Card sx={{ backgroundColor: "var(--bgCardMetrics)", borderRadius: "var(--radius)" }}>
      <CardContent>
        <Typography variant="h6" sx={{ color: 'var(--foreground)', fontWeight: 'bold', mb: 2 }}>
          Distribuição de Notas
        </Typography>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="range" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="var(--primary)" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
