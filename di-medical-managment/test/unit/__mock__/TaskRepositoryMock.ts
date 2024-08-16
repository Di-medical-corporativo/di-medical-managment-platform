import { Task } from "../../../src/Contexts/Backoffice/Task/domain/Task";
import { TaskRepository } from "../../../src/Contexts/Backoffice/Task/domain/TaskRepository";

export class TaskRepositoryMock implements TaskRepository {
  private saveMock: jest.Mock;
  private findAllMock: jest.Mock;

  constructor() {
    this.saveMock = jest.fn();
  
    this.findAllMock = jest.fn();
  }
  
  async save(task: Task): Promise<void> {
    await this.saveMock(task);
  }

  async findAll(): Promise<Task[]> {
    return await this.findAllMock() as Task[]
  }

  assertSaveHaveBeenCalledWith(expected: Task) {
    expect(this.saveMock).toHaveBeenCalledWith(expected);
  }
}
