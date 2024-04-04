import { Criteria } from "../../shared/domain/criteria/Criteria";
import { Task } from "./Task";

export interface TaskRepository {
  save(task: Task): Promise<void>
  matching(criteria: Criteria): Promise<Task[]>
}

