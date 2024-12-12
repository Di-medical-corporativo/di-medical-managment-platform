import { Module } from "../../../src/Contexts/Shared/domain/Module";
import { ModuleRepository } from "../../../src/Contexts/Shared/domain/ModuleRepository";

export class ModuleRepositoryMock implements ModuleRepository {
  public getAllMock: jest.Mock;
  public saveMock: jest.Mock;

  private modules: Module[] = [];
  
  constructor() {
    this.getAllMock = jest.fn();

    this.saveMock = jest.fn();
  }

  async getAll(module: Module): Promise<Module[]> {
    this.getAllMock();

    return this.modules;
  }

  async save(module: Module): Promise<void> {
    this.saveMock(module);
  }

  public assertHaveBeenCalledSave(module: Module): void {
    expect(this.saveMock).toHaveBeenCalledWith(module);
  }
}
