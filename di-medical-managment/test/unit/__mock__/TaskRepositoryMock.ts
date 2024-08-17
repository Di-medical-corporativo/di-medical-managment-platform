import { Task } from "../../../src/Contexts/Backoffice/Task/domain/Task";
import { TaskId } from "../../../src/Contexts/Backoffice/Task/domain/TaskId";
import { TaskRepository } from "../../../src/Contexts/Backoffice/Task/domain/TaskRepository";

export class TaskRepositoryMock implements TaskRepository {
  private saveMock: jest.Mock;

  private findAllMock: jest.Mock;

  private searchMock: jest.Mock;

  private updateMock: jest.Mock;

  constructor() {
    this.saveMock = jest.fn();
  
    this.findAllMock = jest.fn();

    this.searchMock = jest.fn();

    this.updateMock = jest.fn();
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
}
