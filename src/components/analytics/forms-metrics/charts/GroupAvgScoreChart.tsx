import { Card, CardContent, Typography } from "@mui/material";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface GroupMetric {
  grupoId: number;
  avgScore: number;
}

export const GroupAvgScoreChart = ({ data }: { data: GroupMetric[] }) => {
  return (
    <Card sx={{ backgroundColor: "var(--bgCardMetrics)", borderRadius: "var(--radius)" }}>
      <CardContent>
        <Typography variant="h6" sx={{ color: 'var(--foreground)', fontWeight: 'bold', mb: 2 }}>
          Média de Nota por Grupo
        </Typography>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="grupoId" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="avgScore" fill={'var(--primary)'} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
