import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, Grid, Typography } from "@mui/material";

interface Props {
  data: {
    estagioRecrutamentoId: number;
    avgApprovalDays: number;
  }[];
}

const TempoMedioAprovacaoChart: React.FC<Props> = ({ data }) => {
  return (
    <Grid size={{ xs: 12, sm: 6, md: 6}}>
      <Card style={{ backgroundColor: "var(--bgCardMetrics)", borderRadius: "var(--radius)" }}>
        <CardContent>
          <Typography variant="h6" sx={{ color: 'var(--foreground)', fontWeight: 'bold', mb: 2 }}>
            Tempo Médio de Aprovação (dias)
          </Typography>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
              <XAxis dataKey="estagioRecrutamentoId" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="avgApprovalDays" stroke="var(--primary)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default TempoMedioAprovacaoChart;
