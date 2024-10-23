import { UserId } from "../../User/domain/UserId";
import { Task } from "./Task";
import { TaskId } from "./TaskId";

export interface TaskRepository {
  save(task: Task): Promise<void>

  findAll(month: number, year: number): Promise<Task[]>

  search(id: TaskId): Promise<Task | null>

  update(task: Task): Promise<void>

  delete(id: TaskId): Promise<void>

  timeOut(id: TaskId): Promise<void>

  updateStatus(task: Task): Promise<void>

  kanban(id: UserId, month: number, year: number): Promise<Task[]>
}
