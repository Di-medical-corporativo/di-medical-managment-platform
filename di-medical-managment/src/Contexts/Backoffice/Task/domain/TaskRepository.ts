import { DeparmentId } from "../../Department/domain/DeparmentId";
import { UserId } from "../../User/domain/UserId";
import { Comment } from "./Comment";
import { Task } from "./Task";
import { TaskId } from "./TaskId";
import { StatusList, TaskStatus } from "./TaskStatus";

export interface TaskRepository {
  save(task: Task): Promise<void>

  findAll(month: number, year: number): Promise<Task[]>

  search(id: TaskId): Promise<Task | null>

  update(task: Task): Promise<void>

  delete(id: TaskId): Promise<void>

  timeOut(id: TaskId): Promise<void>

  updateStatus(task: Task): Promise<void>

  kanban(id: UserId, month: number, year: number): Promise<Task[]>

  searchFilter({
    departmentId,
    asignedTo,
    asignedBy,
    status,
    startMonth,
    endMonth
  }: {
    departmentId?: DeparmentId,
    asignedTo?: UserId,
    asignedBy?: UserId,
    status?: StatusList,
    startMonth: Date,
    endMonth: Date
  }): Promise<Task[]>

  overview(): Promise<{ asignedCount: number, inProgressCount: number, finishedCount: number, dueCount: number }>

  comment(comment: Comment): Promise<void>

  findAllComments(id: TaskId): Promise<Comment[]>
}
