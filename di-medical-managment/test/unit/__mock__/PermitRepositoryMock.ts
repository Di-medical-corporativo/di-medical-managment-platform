import { Permit } from "../../../src/Contexts/Backoffice/Permit/domain/Permit";
import { PermitAdminComment } from "../../../src/Contexts/Backoffice/Permit/domain/PermitComment";
import { PermitId } from "../../../src/Contexts/Backoffice/Permit/domain/PermitId";
import { PermitRepository } from "../../../src/Contexts/Backoffice/Permit/domain/PermitRepository";
import { PermitStatusList } from "../../../src/Contexts/Backoffice/Permit/domain/PermitStatus";
import { UserId } from "../../../src/Contexts/Backoffice/User/domain/UserId";

export class PermitRepositoryMock implements PermitRepository {
  private saveMock: jest.Mock;

  private findByUserMock: jest.Mock;

  private findAllMock: jest.Mock;

  private acceptMock: jest.Mock;

  private findMock: jest.Mock;


  constructor() {
    this.saveMock = jest.fn();

    this.findByUserMock = jest.fn().mockReturnValue([]);
    
    this.acceptMock = jest.fn();
  
    this.findMock = jest.fn();
  }
  
  async find(id: PermitId): Promise<Permit | null> {
    return this.findMock(id);
  }

  setReturnForFind(returned: Permit | null) {
    this.findMock.mockReturnValue(returned);
  }

  async action(id: PermitId, comment: PermitAdminComment,action: PermitStatusList) {
    await this.acceptMock(id, comment, action);
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

  assertAcceptHaveBeenCalled() {
    expect(this.acceptMock).toHaveBeenCalled();
  }
}
