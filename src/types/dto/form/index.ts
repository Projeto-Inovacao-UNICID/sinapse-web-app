export interface CreateFormDto {
  nome: string;
  descricao: string;
  minScore: number;
  fields: CreateFormFieldDto[];
}

export interface PublicFormDto {
  id: string;
  nome: string;
  descricao: string;
  fields: FormFieldDto[];
}

export interface FormDto extends PublicFormDto {
  minScore: number;
}

export interface CreateFormFieldDto {
  label: string;
  fieldType: "TEXT" | "NUMBER" | "SELECT";
  category: "SOFT_SKILL" | "HARD_SKILL" | "CULTURE" | "PESQUISA"| "OTHER";
  weight: number;
  required: boolean;
  options: FormFieldOptionDto[] | null;
}

export interface FormFieldDto extends CreateFormFieldDto {
  id: string;
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