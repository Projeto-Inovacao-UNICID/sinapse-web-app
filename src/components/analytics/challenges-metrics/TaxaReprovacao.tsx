import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { RejectionRateDto } from "@/types";

interface Props {
  data: {
    estagioRecrutamentoId: number;
    rejectionRate: number;
  }[];
}

const TaxaReprovacaoChart: React.FC<Props> = ({ data }) => {
  return (
    <Grid size={{ xs: 12, sm: 6, md: 6 }}>
      <Card style={{ backgroundColor: "var(--bgCardMetrics)", borderRadius: "var(--radius)" }}>
        <CardContent>
          <Typography variant="h6" sx={{ color: 'var(--foreground)', fontWeight: 'bold', mb: 2 }}>
            Taxa de Reprovação (%) por Estágio
          </Typography>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={data}>
              <XAxis dataKey="estagioRecrutamentoId" />
              <YAxis />
              <Tooltip formatter={(value: number) => `${(value * 100).toFixed(1)}%`} />
              <Area
                type="monotone"
                dataKey="rejectionRate"
                stroke="var(--primary)"
                fill="var(--primary)"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default TaxaReprovacaoChart;
