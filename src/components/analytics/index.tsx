import ChallengesDashboard from "./challenges-metrics";

export default function DashboardPage() {
  return (
    <div
      style={{  
        display: 'grid',
        gridTemplateColumns: '1fr minmax(0, 10fr) 1fr',
        minHeight: '100vh',
      }}
    >
      <div style={{ gridColumn: 2 }}>
        <ChallengesDashboard />
      </div>
    </div>
  );
}