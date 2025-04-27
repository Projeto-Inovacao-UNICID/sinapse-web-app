export type ChallengeTypes =
  | 'marketing'
  | 'desenvolvimento'
  | 'processos'
  | 'analise_de_dados'
  | 'design'
  | 'produto'
  | 'financas'
  | 'rh'
  | 'vendas'
  | 'estrategia';

export const challengeTypesLabels: Record<ChallengeTypes, string> = {
  marketing: 'Marketing',
  desenvolvimento: 'Desenvolvimento',
  processos: 'Processos',
  analise_de_dados: 'Análise de Dados',
  design: 'Design',
  produto: 'Produto',
  financas: 'Finanças',
  rh: 'Recursos Humanos',
  vendas: 'Vendas',
  estrategia: 'Estratégia',
};
