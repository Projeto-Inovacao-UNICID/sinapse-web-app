import { Card, CardContent, Typography } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { colors } from "@/theme/colors";

const COLORS = ['var(--primary)', 'var(--error)'];

export const StatusPieChart = ({ data }: { data: Record<string, number> }) => {
  const chartData = Object.entries(data).map(([status, count]) => ({ status, count }));

  return (
    <Card sx={{ backgroundColor: "var(--bgCardMetrics)", borderRadius: "var(--radius)" }}>
      <CardContent>
        <Typography variant="h6" sx={{ color: 'var(--foreground)', fontWeight: 'bold', mb: 2 }}>
          Aprovação vs Reprovação
        </Typography>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={chartData} dataKey="count" nameKey="status" outerRadius={80} label>
              {chartData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
