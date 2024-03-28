import { Either } from "src/entities/Either";
import { Task } from "src/entities/task/Task";

export interface TaskFacadeI {
  registerTask(task: Task): Promise<Either<string, void>>
}

export class TaskFacade implements TaskFacadeI{
  async registerTask(task: Task): Either<string, void> {
    try {
      
    } catch (error) {
      
    }
  }
}
