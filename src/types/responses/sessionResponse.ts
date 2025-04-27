import { Roles } from "../roles";

export interface SessionResponse {
  id: string;
  roles: Roles[];
}