import { User } from "../../../src/Contexts/Backoffice/User/domain/User";
import { UserEmail } from "../../../src/Contexts/Backoffice/User/domain/UserEmail";
import { UserId } from "../../../src/Contexts/Backoffice/User/domain/UserId";
import { UserPassword } from "../../../src/Contexts/Backoffice/User/domain/UserPassword";
import { UserRepository } from "../../../src/Contexts/Backoffice/User/domain/UserRepository";
import { UserAuthenticated } from "../../../src/Contexts/Shared/domain/UserAuthenticated";

export class UserRepositoryMock implements UserRepository {
  private saveMock: jest.Mock;
  private searchMock: jest.Mock;
  private updateMock: jest.Mock;
  private findAllMock: jest.Mock;
  private deleteMock: jest.Mock;
  private findByEmailMock: jest.Mock;

  constructor() {
    this.saveMock = jest.fn();
    this.searchMock = jest.fn();
    this.updateMock = jest.fn();
    this.findAllMock = jest.fn();
    this.deleteMock = jest.fn();
    this.findByEmailMock = jest.fn();
  }

  async overview(userId: UserId): Promise<{ delayCount: number; absenceCount: number; assignedTasksCount: number; inProgressTaskCount: number; finishedTasksCount: number; dueTasksCount: number; pendingPermitCount: number; approvedPermitCount: number; rejectedPermitCount: number; }> {
    return {
      absenceCount: 0,
      approvedPermitCount: 0,
      assignedTasksCount: 0,
      delayCount: 0,
      dueTasksCount: 0,
      finishedTasksCount: 0,
      inProgressTaskCount: 0,
      pendingPermitCount: 0,
      rejectedPermitCount: 0
    }
  }

  async delete(id: UserId): Promise<void> {
    this.deleteMock(id);
  }

  async findAll(): Promise<User[]> {
    return this.findAllMock();
  }

  async save(user: User, password: UserPassword): Promise<void> {
    this.saveMock(user, password);
  }

  async search(term: string): Promise<User | null> {
    return this.searchMock(term);
  }

  async update(user: User, password: UserPassword): Promise<void> {
    this.updateMock(user, password);
  }

  async findByEmail(email: UserEmail): Promise<UserAuthenticated | null> {
    return this.findByEmailMock(email);
  }

  // Métodos de aserción
  assertSaveHaveBeenCalledWith(expectedUser: User, expectedPassword: UserPassword): void {
    expect(this.saveMock).toHaveBeenCalledWith(expectedUser, expectedPassword);
  }

  assertSearchHaveBeenCalledWith(term: string): void {
    expect(this.searchMock).toHaveBeenCalledWith(term);
  }

  assertUpdateHaveBeenCalledWith(expectedUser: User, expectedPassword: UserPassword): void {
    expect(this.updateMock).toHaveBeenCalledWith(expectedUser, expectedPassword);
  }

  assertFindAllHaveBeenCalled(): void {
    expect(this.findAllMock).toHaveBeenCalled();
  }

  assertDeleteHaveBeenCalledWith(expectedId: UserId): void {
    expect(this.deleteMock).toHaveBeenCalledWith(expectedId);
  }

  setReturnForSearch(returnValue: User | null): void {
    this.searchMock.mockReturnValue(returnValue);
  }

  setReturnForFindAll(returnValue: User[]): void {
    this.findAllMock.mockReturnValue(returnValue);
  }

  assertFindByEmailHaveBeenCalled() {
    expect(this.findByEmailMock).toHaveBeenCalled();
  }

  setReturnForFindByEmail(returnValue: UserAuthenticated | null) {
    this.findByEmailMock.mockReturnValue(returnValue);
  }

  setReturnForSave(): void {
    this.saveMock.mockResolvedValue(undefined);
  }

  setReturnForUpdate(): void {
    this.updateMock.mockResolvedValue(undefined);
  }

  setReturnForDelete(): void {
    this.deleteMock.mockResolvedValue(undefined);
  }
}
