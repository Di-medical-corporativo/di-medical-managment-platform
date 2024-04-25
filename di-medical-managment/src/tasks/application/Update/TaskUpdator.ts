import { FiltersPrimitives } from "../../../shared/domain/criteria/Filter";
import { TaskRepository } from "../../domain/TaskRepository";
import { TaskFinder } from "../Finder/TaskFinder";

export class TaskUpdator {
  constructor(
    private taskFinder: TaskFinder,
    private taskRepository: TaskRepository
  ) {}

  public async run(taskId: string, updateValues: { 
    status?: string; 
    title?: string; 
    description?: string;
    dueToDate?: string; 
  }) {
    const filter: FiltersPrimitives[] = [{ field: "id", operator: "EQ", value: taskId }]
    const tasksFind = await this.taskFinder.run(filter, null, null)
    if(tasksFind.length == 0) {
      return null
    }
    const taskToUpdate = tasksFind[0]
    taskToUpdate
  }
} 
