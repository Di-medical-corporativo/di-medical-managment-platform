import { Module } from "./Module";
import { ModuleId } from "./ModuleId";
import { ModuleNotFound } from "./ModuleNotFound";
import { ModuleRepository } from "./ModuleRepository";

export class ModuleFinder {
  constructor(
    private repository: ModuleRepository
  ) {}

  async run(params: {
      id: ModuleId
    }
  ) {
    const module: Module | null = await this.repository.find(params.id);

    if(module == null) {
      throw new ModuleNotFound();
    }

    return module;
  }
}
