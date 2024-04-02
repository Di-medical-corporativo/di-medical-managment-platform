import { Task } from "./Task";
import { TaskStatus } from "./TaskStatus";

export interface TaskRepository {
  save(task: Task): Promise<void>
  find(): Promise<Task[]>
}
