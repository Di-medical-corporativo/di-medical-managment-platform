import { TaskId } from "./TaskId";

export interface TaskScheduler {
  schedule(taskId: TaskId, dueTo: Date): Promise<void>

  reschedule(taskId: TaskId, dueTo: Date): Promise<void>
  
  remove(taskId: TaskId): Promise<void>
}
