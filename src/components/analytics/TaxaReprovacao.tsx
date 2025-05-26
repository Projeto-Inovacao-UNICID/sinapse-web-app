import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { RejectionRateDto } from "@/types";

interface Props {
  data: RejectionRateDto[];
}

const TaxaReprovacaoChart: React.FC<Props> = ({ data }) => {
  return (
    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
      <Card style={{ backgroundColor: "var(--card)", borderRadius: "var(--radius)" }}>
        <CardContent>
          <Typography variant="subtitle1" gutterBottom>
            Taxa de Reprovação (%) por Estágio
          </Typography>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={data}>
              <XAxis dataKey="estagioRecrutamentoId" />
              <YAxis />
              <Tooltip formatter={(value: number) => `${(value * 100).toFixed(1)}%`} />
              <Area
                type="monotone"
                dataKey="taxaReprovacao"
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
