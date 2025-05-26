import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import { DesafioMetricsDto } from "@/types";

const cardStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: "var(--bgCardMetrics)",
  borderRadius: 2 ,
};

interface Props {
  metrics: DesafioMetricsDto;
}

const TotalCards: React.FC<Props> = ({ metrics }) => {
  return (
    <>
      <Grid size={{xs: 12, sm: 6, md: 3}}>
        <Card sx={cardStyle} elevation={1}>
          <CardContent>
            <Typography variant="subtitle2" color="var(--muted)">
              Total Inscritos
            </Typography>
            <Typography variant="h4" sx={{ color: 'var(--foreground)', fontWeight: 'bold' }}>{metrics.totalInscritos}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{xs: 12, sm: 6, md: 3}}>
        <Card sx={cardStyle} elevation={1}>
          <CardContent>
            <Typography variant="subtitle2" color="var(--muted)">
              Total Concluídos
            </Typography>
            <Typography variant="h4" sx={{ color: 'var(--foreground)', fontWeight: 'bold' }}>{metrics.totalConcluidos}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{xs: 12, sm: 6, md: 3}}>
        <Card sx={cardStyle} elevation={1}>
          <CardContent>
            <Typography variant="subtitle2" color="var(--muted)">
              Total Reprovados
            </Typography>
            <Typography variant="h4" sx={{ color: 'var(--foreground)', fontWeight: 'bold' }}>{metrics.totalReprovados}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{xs: 12, sm: 6, md: 3}}>
        <Card sx={cardStyle} elevation={1}>
          <CardContent>
            <Typography variant="subtitle2" color="var(--muted)">
              Taxa de Conclusão
            </Typography>
            <Typography variant="h4" sx={{ color: 'var(--foreground)', fontWeight: 'bold' }}>
              {(metrics.taxaConclusao * 100).toFixed(1)}%
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default TotalCards;
