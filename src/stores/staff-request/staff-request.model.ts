import { UserRole } from "@stores/user/user.model";

export enum StaffRequestStatusEnum {
  WAITING = "WAITING",
  ACCEPTED = "ACCEPTED",
  REFUSED = "REFUSED",
}

export interface LiteStaffRequestDto {
  id: string;
  id_user: string;
  content: string;
  status: StaffRequestStatusEnum;
  createdAt: string;
}

export interface LastStaffRequestDto {
  role: UserRole;
  request: LiteStaffRequestDto | null;
}

export interface CreateStaffRequestDto {
  content: string;
}
