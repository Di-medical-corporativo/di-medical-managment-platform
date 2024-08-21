import { Task } from "../../../src/Contexts/Backoffice/Task/domain/Task";
import { TaskId } from "../../../src/Contexts/Backoffice/Task/domain/TaskId";
import { TaskRepository } from "../../../src/Contexts/Backoffice/Task/domain/TaskRepository";

export class TaskRepositoryMock implements TaskRepository {
  private saveMock: jest.Mock;

  private findAllMock: jest.Mock;

  private searchMock: jest.Mock;

  private updateMock: jest.Mock;

  private deleteMock: jest.Mock;

  private timeOutMock: jest.Mock;

  private updateStatusMock: jest.Mock;

  constructor() {
    this.saveMock = jest.fn();
  
    this.findAllMock = jest.fn();

    this.searchMock = jest.fn();

    this.updateMock = jest.fn();

    this.deleteMock = jest.fn();

    this.timeOutMock = jest.fn();

    this.updateStatusMock = jest.fn();
  }
  
  async delete(id: TaskId) {
    await this.deleteMock(id);
  }

  async save(task: Task): Promise<void> {
    await this.saveMock(task);
  }

  async findAll(): Promise<Task[]> {
    return await this.findAllMock() as Task[]
  }

  async search(id: TaskId): Promise<Task | null> {
    return await this.searchMock(id);
  }

  async update(task: Task): Promise<void> {
    return this.updateMock(task);
  }

  async timeOut(id: TaskId): Promise<void> {
    return this.timeOutMock(id);
  }

  async updateStatus(task: Task): Promise<void> {
    return this.updateStatusMock(task);
     
  }

  assertUpdateStatusHaveBeenCalled() {
    expect(this.updateStatusMock).toHaveBeenCalled();
  }

  setReturnForSearch(returned: Task | null) {
    this.searchMock.mockReturnValue(returned);
  }

  assertSearchHaveBeenCalledWith(id: TaskId): void {
    expect(this.searchMock).toHaveBeenCalledWith(id);
  }

  assertSaveHaveBeenCalledWith(expected: Task) {
    expect(this.saveMock).toHaveBeenCalledWith(expected);
  }

  assertUpdateHaveBeenCalledWith(expected: Task) {
    expect(this.updateMock).toHaveBeenCalledWith(expected);
  }

  assertDeleteHaveBeenCalledWith(expected: TaskId) {
    expect(this.deleteMock).toHaveBeenCalledWith(expected);
  }

  assertTimeOutHaveBeenCalled() {
    expect(this.timeOutMock).toHaveBeenCalled();
  }

  assertTimeOutNotCalled() {
    expect(this.timeOutMock).not.toHaveBeenCalled();
  }

}
