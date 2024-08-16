import { Task } from "./Task";

export interface TaskRepository {
  save(task: Task): Promise<void>

  findAll(): Promise<Task[]>
}
