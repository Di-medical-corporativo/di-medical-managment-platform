import { Module } from "./Module";
import { ModuleId } from "./ModuleId";

export interface ModuleRepository {
  save(module: Module): Promise<void>
  getAll(): Promise<Module[]>
  find(id: ModuleId): Promise<Module | null>
}
