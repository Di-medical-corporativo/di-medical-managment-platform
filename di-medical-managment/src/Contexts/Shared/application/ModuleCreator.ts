import { Module } from "../domain/Module";
import { ModuleId } from "../domain/ModuleId";
import { ModuleName } from "../domain/ModuleName";
import { ModuleRepository } from "../domain/ModuleRepository";

export class ModuleCreator {
  constructor(
    private repository: ModuleRepository
  ) {}

  async run(params: {
    id: ModuleId,
    name: ModuleName
  }) {
    const module = Module.create({
      id: params.id,
      name: params.name
    });

    await this.repository.save(module);
  }
}
