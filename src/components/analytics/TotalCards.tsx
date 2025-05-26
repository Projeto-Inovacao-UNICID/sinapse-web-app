import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import { DesafioMetricsDto } from "@/types";

const cardStyle = {
  backgroundColor: "var(--bgCardMetrics)",
  borderRadius: "var(--radius)",
};

interface Props {
  metrics: DesafioMetricsDto;
}

const TotalCards: React.FC<Props> = ({ metrics }) => {
  return (
    <>
      <Grid size={{xs: 12, sm: 6, md: 3}}>
        <Card style={cardStyle} elevation={1}>
          <CardContent>
            <Typography variant="subtitle2" color="textSecondary">
              Total Inscritos
            </Typography>
            <Typography variant="h6">{metrics.totalInscritos}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{xs: 12, sm: 6, md: 3}}>
        <Card style={cardStyle} elevation={1}>
          <CardContent>
            <Typography variant="subtitle2" color="textSecondary">
              Total Concluídos
            </Typography>
            <Typography variant="h6">{metrics.totalConcluidos}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{xs: 12, sm: 6, md: 3}}>
        <Card style={cardStyle} elevation={1}>
          <CardContent>
            <Typography variant="subtitle2" color="textSecondary">
              Total Reprovados
            </Typography>
            <Typography variant="h6">{metrics.totalReprovados}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{xs: 12, sm: 6, md: 3}}>
        <Card style={cardStyle} elevation={1}>
          <CardContent>
            <Typography variant="subtitle2" color="textSecondary">
              Taxa de Conclusão
            </Typography>
            <Typography variant="h6">
              {(metrics.taxaConclusao * 100).toFixed(1)}%
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default TotalCards;
