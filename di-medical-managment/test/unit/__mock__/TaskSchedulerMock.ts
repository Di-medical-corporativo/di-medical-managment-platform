import { TaskId } from "../../../src/Contexts/Backoffice/Task/domain/TaskId";
import { TaskScheduler } from "../../../src/Contexts/Backoffice/Task/domain/TaskScheduler";

export class TaskSchedulerMock implements TaskScheduler {
  private scheduleMock = jest.fn();
  
  async schedule(taskId: TaskId, dueTo: Date): Promise<void> {
    this.scheduleMock(taskId, dueTo);
  }
}
