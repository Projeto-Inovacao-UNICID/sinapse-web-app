// DTO usado para aprovar ou rejeitar solicitações de aprovação:
// - aprovada           : true para aprovar, false para rejeitar
// - approvalNotes      : comentários ou justificativas da decisão
export interface ApprovalRequestDto {
  approved: boolean;
  approvalNotes: string;
}

// DTO de retorno para documentos de empresas:
// - id           : identificador do documento
// - companyId    : UUID da empresa proprietária
// - fileName     : nome original do arquivo
// - fileType     : tipo MIME ou extensão do arquivo
// - uploadedAt   : timestamp de upload
// - previewUrl   : URL para pré-visualização ou download
export interface CompanyDocumentDto {
  id: number;
  companyId: string;
  fileName: string;
  fileType: string;
  uploadedAt: string;
  previewUrl: string;
}
