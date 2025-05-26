'use client';

import { Box, Card, CardContent, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Funnel, FunnelChart, LabelList } from 'recharts';
import { mockDesafioMetrics } from '@/mocks/metrics/mockChallengeMetrics';

const dashboardData = mockDesafioMetrics;

const funilData = [
  { value: dashboardData.totalInscritos, name: 'Inscritos' },
  { value: dashboardData.totalConcluidos, name: 'Concluíram' },
  { value: dashboardData.totalReprovados, name: 'Reprovados' }
];

export default function ChallengeMetrics() {
  return (
    <div className="grid gap-4 p-6 md:grid-cols-2 xl:grid-cols-3 bg-[var(--background)] text-white min-h-screen">
      {/* Métricas principais */}
      <Typography variant="h6" sx={{ color: 'var(--foreground)', fontWeight: 'bold', mb: 2}}>Métricas de Desafios</Typography>
      <Card sx={{ backgroundColor: 'var(--background)', color: 'var(--foreground)', mb: 1, border: 'none', boxShadow: 0 }}>
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignContent: 'center', justifyContent: 'center', color: 'var(--muted)', backgroundColor: 'var(--card)', p: 2, borderRadius: 2}}><Typography variant="subtitle1">Total Inscritos</Typography><Typography variant="h5" sx={{ color: 'var(--foreground)', fontWeight: 'bold', alignSelf: 'center' }}>{dashboardData.totalInscritos}</Typography></Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignContent: 'center', justifyContent: 'center', color: 'var(--muted)', backgroundColor: 'var(--card)', p: 2, borderRadius: 2}}><Typography variant="subtitle1">Concluíram</Typography><Typography variant="h5" sx={{ color: 'var(--foreground)', fontWeight: 'bold', alignSelf: 'center' }}>{dashboardData.totalConcluidos}</Typography></Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignContent: 'center', justifyContent: 'center', color: 'var(--muted)', backgroundColor: 'var(--card)', p: 2, borderRadius: 2}}><Typography variant="subtitle1">Taxa de Conclusão</Typography><Typography variant="h5" sx={{ color: 'var(--foreground)', fontWeight: 'bold', alignSelf: 'center' }}>{(dashboardData.taxaConclusao * 100).toFixed(0)}%</Typography></Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignContent: 'center', justifyContent: 'center', color: 'var(--muted)', backgroundColor: 'var(--card)', p: 2, borderRadius: 2}}><Typography variant="subtitle1">Tempo Médio até Aprovação</Typography><Typography variant="h5" sx={{ color: 'var(--foreground)', fontWeight: 'bold', alignSelf: 'center' }}>{dashboardData.tempoMedioAprovacao[0]?.avgApprovalDays ?? 0} dias</Typography></Box>          
          <Box sx={{ display: 'flex', flexDirection: 'column', alignContent: 'center', justifyContent: 'center', color: 'var(--muted)', backgroundColor: 'var(--card)', p: 2, borderRadius: 2}}><Typography variant="subtitle1">% Solo</Typography><Typography variant="h5" sx={{ color: 'var(--foreground)', fontWeight: 'bold', alignSelf: 'center' }}>{(dashboardData.percSolo * 100).toFixed(0)}%</Typography></Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignContent: 'center', justifyContent: 'center', color: 'var(--muted)', backgroundColor: 'var(--card)', p: 2, borderRadius: 2}}><Typography variant="subtitle1">% Equipe</Typography><Typography variant="h5" sx={{ color: 'var(--foreground)', fontWeight: 'bold', alignSelf: 'center' }}>{(dashboardData.percEquipe * 100).toFixed(0)}%</Typography></Box>
        </CardContent>
      </Card>

      {/* Gráfico de Funil */}
      <Card sx={{ backgroundColor: 'var(--card)', color: 'var(--foreground)', mb: 1 }}>
        <CardContent className="p-4 h-full">
          <Typography variant="h6" sx={{ color: 'var(--foreground)', fontWeight: 'bold' }}>Progresso dos Candidatos</Typography>
          <ResponsiveContainer width="100%" height={250}>
            <FunnelChart>
              <Tooltip />
              <Funnel dataKey="value" data={funilData} fill='var(--primary)' isAnimationActive>
                <LabelList position="right" fill="var(--foreground)" stroke="none" dataKey="name" />
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Gráfico de Inscritos por Etapa */}
      <Card sx={{ backgroundColor: 'var(--card)', color: 'var(--foreground)', mb: 1 }}>
        <CardContent className="p-4 h-full">
          <Typography variant="h6" sx={{ color: 'var(--foreground)', fontWeight: 'bold' }}>Inscritos por Etapa</Typography>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dashboardData.inscritosPorEtapa}>
              <XAxis dataKey="estagioRecrutamentoId" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip />
              <Bar dataKey="totalInscritos" fill="var(--primary)"/>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
