import { TaskId } from "../../../src/Contexts/Backoffice/Task/domain/TaskId";
import { TaskScheduler } from "../../../src/Contexts/Backoffice/Task/domain/TaskScheduler";

export class TaskSchedulerMock implements TaskScheduler {
  private scheduleMock = jest.fn();
  
  private rescheduleMock = jest.fn();

  private removeMock = jest.fn();

  async schedule(taskId: TaskId, dueTo: Date): Promise<void> {
    this.scheduleMock(taskId, dueTo);
  }

  async reschedule(taskId: TaskId, dueTo: Date): Promise<void> {
    this.rescheduleMock(taskId, dueTo);
  }

  async remove(taskId: TaskId): Promise<void> {
    this.removeMock(taskId);      
  }

  assertReschedulerHaveBeenCalled() {
    expect(this.rescheduleMock).toHaveBeenCalled();
  }

  assertRescheduleNotHaveBeenCalled() {
    expect(this.rescheduleMock).not.toHaveBeenCalled();
  }

  assertRemoveHaveBeenCalled() {
    expect(this.removeMock).toHaveBeenCalled();
  }

  asseretRemoveNotHaveBeenCalled() {
    expect(this.removeMock).not.toHaveBeenCalled();
  }
}
