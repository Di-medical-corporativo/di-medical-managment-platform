import { Module } from "./Module";

export interface ModuleRepository {
  save(module: Module): Promise<void>
  getAll(): Promise<Module[]>
}
