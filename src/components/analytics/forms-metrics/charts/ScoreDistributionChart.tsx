import { Card, CardContent, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const ScoreDistributionChart = ({ data }: { data: Record<string, number> }) => {
  const chartData = Object.entries(data).map(([range, count]) => ({ range, count }));

  return (
    <Card sx={{ backgroundColor: "var(--bgCardMetrics)", borderRadius: "var(--radius)", mb: 1 }}>
      <CardContent>
        <Typography variant="h6" sx={{ color: "var(--foreground)", fontWeight: "bold", mb: 2 }}>
          Distribuição de Notas
        </Typography>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            layout="vertical"
            data={chartData}
            margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
          >
            <XAxis type="number" />
            <YAxis type="category" dataKey="range" tick={{ fill: 'var(--foreground)' }} />
            <Tooltip />
            <Bar dataKey="count" fill="var(--primary)" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
