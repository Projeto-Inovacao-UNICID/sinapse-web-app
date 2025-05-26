import { Card, CardContent, Typography } from "@mui/material";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { colors } from "@/theme/colors";

const COLORS = ['var(--primary)', colors.green, colors.blue, colors.purple, 'var(--bright-primary)', 'var(--muted)'];

interface SelectFieldRadarChartProps {
  title: string;
  colorIndex: number;
  data: Record<string, number>;
}

export const SelectFieldRadarChart = ({ title, colorIndex, data }: SelectFieldRadarChartProps) => {
  const chartData = Object.entries(data).map(([option, count]) => ({
    option,
    count,
  }));

  const cor = COLORS[colorIndex];

  return (
    <Card sx={{ backgroundColor: 'var(--bgCardMetrics)', color: 'var(--foreground)', mb: 1 }}>
      <CardContent>
        <Typography variant="h6" sx={{ color: 'var(--foreground)', fontWeight: 'bold', mb: 2 }}>
          {title}
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="option" tick={{ fill: 'var(--foreground)' }} />
            <PolarRadiusAxis angle={30} domain={[0, Math.max(...chartData.map((d) => d.count))]} />
            <Radar
              name={title}
              dataKey="count"
              stroke={cor}
              fill={cor}
              fillOpacity={0.6}
            />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
