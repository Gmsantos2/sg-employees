import { UserBase } from "../../../core/models/UserBase.interface";

export interface UserCreate extends UserBase {
  password: string;
  file: File | null;
  role: string;
}