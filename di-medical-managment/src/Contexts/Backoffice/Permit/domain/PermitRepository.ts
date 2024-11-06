import { UserId } from "../../User/domain/UserId";
import { Permit } from "./Permit";
import { PermitAdminComment } from "./PermitComment";
import { PermitId } from "./PermitId";
import { PermitStatusList } from "./PermitStatus";

export interface PermitRepository {
  save(Permit: Permit): Promise<void>
  findByUser(id: UserId, month: number, year: number): Promise<Permit[]>
  findAll(month: number, year: number): Promise<Permit[]>
  find(id: PermitId): Promise<Permit | null>
  action(id: PermitId, comment: PermitAdminComment, action: PermitStatusList): Promise<void>
}
