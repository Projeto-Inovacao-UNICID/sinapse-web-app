export type Roles = 'ROLE_USER' | 'ROLE_COMPANY' | 'ROLE_ADMIN';

export interface SessionResponse {
  id: string;
  roles: Roles[];
}