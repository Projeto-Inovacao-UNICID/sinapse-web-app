export interface FormDto {
  id?: string;
  nome: string;
  descricao: string;
  minScore: number;
  fields: FormFieldDto[];
}

export interface FormFieldDto {
  id?: string;
  label: string;
  fieldType: "TEXT" | "NUMBER" | "SELECT";
  category: "SOFT_SKILL" | "HARD_SKILL" | "CULTURE" | "PESQUISA"| "OTHER";
  weight: number;
  required: boolean;
  options: FormFieldOptionDto[] | null;
}

export interface FormFieldOptionDto {
  label: string;
  value: string;
  score: number;
}

export interface FormResponseDto {
  answers: FormAnswerDto[];
}

export interface FormAnswerDto {
  fieldId: string;
  text?: string;
  number?: number;
}