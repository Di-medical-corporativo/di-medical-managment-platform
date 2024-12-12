import { Module } from "../domain/Module";
import { ModuleRepository } from "../domain/ModuleRepository";

export class ModuleSearcher {
  constructor(
    private repository: ModuleRepository
  ) {}

  async run() {
    const modules: Module[] = await this.repository.getAll();

    return modules;
  }
}
