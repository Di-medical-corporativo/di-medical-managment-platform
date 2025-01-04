import { DeparmentId } from "../../../src/Contexts/Backoffice/Department/domain/DeparmentId";
import { Department } from "../../../src/Contexts/Backoffice/Department/domain/Department";
import { DepartmentRepository } from "../../../src/Contexts/Backoffice/Department/domain/DepartmentRepository";

export class DepartmentRepositoryMock implements DepartmentRepository {
  private saveMock: jest.Mock;

  private searchMock: jest.Mock;

  private findMock: jest.Mock;
  
  private updateMock: jest.Mock;

  private deleteMock: jest.Mock;

  constructor() {
    this.saveMock = jest.fn();
    this.searchMock = jest.fn();
    this.findMock = jest.fn();
    this.updateMock = jest.fn();
    this.deleteMock = jest.fn();
  }

  async delete(id: DeparmentId): Promise<void> {
    this.deleteMock(id);
  }

  async update(deparment: Department): Promise<void> {
    this.updateMock(deparment);
  }

  async search(id: DeparmentId): Promise<Department | null> {
    return this.findMock(id);
  }

  async findAll(): Promise<Department[]> {
    this.searchMock();
    return [];
  }
  
  async save(department: Department): Promise<void> {
    this.saveMock(department);
  }

  setReturnValueForSearch(returned: Department | null) {
    this.findMock.mockReturnValue(returned);
  }

  assertSaveHaveBeenCalled(){
    expect(this.saveMock).toHaveBeenCalled();
  }

  assertUpdateHaveBeenCalled(){
    expect(this.updateMock).toHaveBeenCalled();
  }

  assertSearchHaveBeenCalled() {
    expect(this.searchMock).toHaveBeenCalled();
  }
  
  assertDeletehHaveBeenCalled() {
    expect(this.deleteMock).toHaveBeenCalled();
  }
}
