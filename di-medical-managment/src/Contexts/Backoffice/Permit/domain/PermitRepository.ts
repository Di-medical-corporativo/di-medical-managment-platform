import { UserId } from "../../User/domain/UserId";
import { Permit } from "./Permit";

export interface PermitRepository {
  save(Permit: Permit): Promise<void>
  findByUser(id: UserId, month: number, year: number): Promise<Permit[]>
}
