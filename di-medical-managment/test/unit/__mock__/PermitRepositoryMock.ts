import { Permit } from "../../../src/Contexts/Backoffice/Permit/domain/Permit";
import { PermitRepository } from "../../../src/Contexts/Backoffice/Permit/domain/PermitRepository";
import { UserId } from "../../../src/Contexts/Backoffice/User/domain/UserId";

export class PermitRepositoryMock implements PermitRepository {
  private saveMock: jest.Mock;

  private findByUserMock: jest.Mock;

  private findAllMock: jest.Mock;

  constructor() {
    this.saveMock = jest.fn();

    this.findByUserMock = jest.fn().mockReturnValue([]);
  }
  
  async findAll(month: number, year: number): Promise<Permit[]> {
    return this.findAllMock(month, year);
  }

  async save(permit: Permit): Promise<void> {
    return this.saveMock(permit);
  }

  async findByUser(id: UserId, month: number, year: number): Promise<Permit[]> {
    return this.findByUserMock(id, month, year) as Permit[]; 
  }

  assertFindByUserHaveBeenCalled() {
    expect(this.findByUserMock).toHaveBeenCalled();
  }

  assertSaveHaveBeenCalled() {
    expect(this.saveMock).toHaveBeenCalled();
  }
}
