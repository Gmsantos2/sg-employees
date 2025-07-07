import { UserBase } from "../../../core/models/UserBase.interface";
import { Role } from "../../roles/interfaces/role.interface";

export interface User extends UserBase {
  _id: string;
  role: Role;
}