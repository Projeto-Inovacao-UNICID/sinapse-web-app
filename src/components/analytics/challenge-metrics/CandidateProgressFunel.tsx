import { FunnelChart, Funnel, LabelList, Tooltip, ResponsiveContainer } from 'recharts';
import { mockDesafioMetrics } from '@/mocks/metrics/mockChallengeMetrics';

const funnelData = [
  {
    name: 'Inscritos',
    value: mockDesafioMetrics.totalInscritos,
  },
  {
    name: 'Entregaram',
    value: mockDesafioMetrics.totalConcluidos + mockDesafioMetrics.totalReprovados,
  },
  {
    name: 'Aprovados',
    value: mockDesafioMetrics.totalConcluidos,
  },
];

export default function CandidateProgressFunnel() {
  return (
    <div
      style={{
        backgroundColor: 'var(--card)',
        color: 'var(--foreground)',
        padding: '1.5rem',
        borderRadius: '1rem',
        width: '100%',
        maxWidth: 480,
      }}
    >
      <h2 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Progresso dos Candidatos</h2>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
        <div>
          <div>Inscritos</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{mockDesafioMetrics.totalInscritos}</div>

          <div style={{ marginTop: '1rem' }}>Etapas Concluídas</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>
            {mockDesafioMetrics.totalConcluidos + mockDesafioMetrics.totalReprovados}
          </div>

          <div style={{ marginTop: '1rem' }}>Aprovados</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{mockDesafioMetrics.totalConcluidos}</div>
        </div>

        <div style={{ width: '55%', height: 200 }}>
          <ResponsiveContainer width="100%" height="100%">
            <FunnelChart>
              <Tooltip />
              <Funnel
                dataKey="value"
                data={funnelData}
                isAnimationActive
                stroke="black"
                fill="#FF6A00"
              >
                <LabelList dataKey="name" position="center" fill="#fff" stroke="none" />
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <div>Tempo Médio até Aprovação</div>
        <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>
          {Math.round(
            mockDesafioMetrics.tempoMedioAprovacao.slice(-1)[0]?.avgApprovalDays || 0
          )}{' '}
          dias
        </div>
      </div>
    </div>
  );
}
