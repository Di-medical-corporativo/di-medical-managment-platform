import { TaskId } from "./TaskId";

export interface TaskScheduler {
  schedule(taskId: TaskId, dueTo: Date): Promise<void>
}
