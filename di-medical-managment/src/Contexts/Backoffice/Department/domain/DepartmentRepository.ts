import { DeparmentId } from "./DeparmentId";
import { Department } from "./Department";

export interface DepartmentRepository {
  delete(id: DeparmentId): Promise<void>;
  update(deparment: Department): Promise<void>;
  search(id: DeparmentId): Promise<Department | null>;
  save(department: Department): Promise<void>
  findAll(): Promise<Department[]>
}

