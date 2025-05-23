import { DeparmentId } from "../../../src/Contexts/Backoffice/Department/domain/DeparmentId";
import { Comment } from "../../../src/Contexts/Backoffice/Task/domain/Comment";
import { Task } from "../../../src/Contexts/Backoffice/Task/domain/Task";
import { TaskId } from "../../../src/Contexts/Backoffice/Task/domain/TaskId";
import { TaskRepository } from "../../../src/Contexts/Backoffice/Task/domain/TaskRepository";
import { StatusList } from "../../../src/Contexts/Backoffice/Task/domain/TaskStatus";
import { UserId } from "../../../src/Contexts/Backoffice/User/domain/UserId";

export class TaskRepositoryMock implements TaskRepository {
  private saveMock: jest.Mock;

  private findAllMock: jest.Mock;

  private searchMock: jest.Mock;

  private updateMock: jest.Mock;

  private deleteMock: jest.Mock;

  private timeOutMock: jest.Mock;

  private updateStatusMock: jest.Mock;

  private kanbanMock: jest.Mock;

  constructor() {
    this.saveMock = jest.fn();
  
    this.findAllMock = jest.fn();

    this.searchMock = jest.fn();

    this.updateMock = jest.fn();

    this.deleteMock = jest.fn();

    this.timeOutMock = jest.fn();

    this.updateStatusMock = jest.fn();

    this.kanbanMock = jest.fn();
  }
  
  async findAllComments(id: TaskId): Promise<Comment[]> {
    return []
  }

  async comment(comment: Comment): Promise<void> {
      
  }

  async overview(): Promise<{ asignedCount: number; inProgressCount: number; finishedCount: number; dueCount: number; }> {
    return {
      asignedCount: 1, inProgressCount: 1, finishedCount: 1, dueCount: 1
    }
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

  async searchFilter({ departmentId, asignedTo, asignedBy, status, startMonth, endMonth }: { departmentId?: DeparmentId; asignedTo?: UserId; asignedBy?: UserId; status?: StatusList; startMonth: Date; endMonth: Date; }): Promise<Task[]> {
    return []
  }

  async kanban(id: UserId, month: number, year: number): Promise<Task[]> {
    return this.kanbanMock(id, month, year) as Task[];
  }

  setReturnValueForKanban() {
    this.kanbanMock.mockReturnValue([]);  
  }

  assertKanbanHaveBeenCalled() {
    expect(this.kanbanMock).toHaveBeenCalled();
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
