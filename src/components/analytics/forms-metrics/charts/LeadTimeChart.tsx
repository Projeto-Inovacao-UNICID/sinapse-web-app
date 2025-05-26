import { Card, CardContent, Typography } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { colors } from "@/theme/colors";

export const LeadTimeChart = ({ data }: { data: Record<string, number> }) => {
  const chartData = Object.entries(data).map(([range, count]) => ({ range, count }));

  return (
    <Card sx={{ backgroundColor: "var(--bgCardMetrics)", borderRadius: "var(--radius)" }}>
      <CardContent>
        <Typography variant="h6" sx={{ color: 'var(--foreground)', fontWeight: 'bold', mb: 2 }}>
          Tempo de Resolução
        </Typography>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="range" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill={colors.green} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
