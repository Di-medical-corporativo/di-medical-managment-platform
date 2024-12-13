import { Module } from "../../../src/Contexts/Shared/domain/Module";
import { ModuleId } from "../../../src/Contexts/Shared/domain/ModuleId";
import { ModuleRepository } from "../../../src/Contexts/Shared/domain/ModuleRepository";

export class ModuleRepositoryMock implements ModuleRepository {
  public getAllMock: jest.Mock;
  public saveMock: jest.Mock;
  public findMock: jest.Mock;

  private modules: Module[] = [];
  
  constructor() {
    this.getAllMock = jest.fn();

    this.saveMock = jest.fn();

    this.findMock = jest.fn();
  }

  async getAll(): Promise<Module[]> {
    this.getAllMock();

    return this.modules;
  }

  async save(module: Module): Promise<void> {
    this.saveMock(module);
  }

  public assertHaveBeenCalledSave(module: Module): void {
    expect(this.saveMock).toHaveBeenCalledWith(module);
  }

  async find(id: ModuleId): Promise<Module | null> {
    return this.findMock(id);
  }
}
