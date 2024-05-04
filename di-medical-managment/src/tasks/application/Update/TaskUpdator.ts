import { FiltersPrimitives } from "../../../shared/domain/criteria/Filter";
import { TaskDescription } from "../../domain/TaskDescription";
import { TaskDueToDate } from "../../domain/TaskDueToDate";
import { TaskRepository } from "../../domain/TaskRepository";
import { TaskStatus } from "../../domain/TaskStatus";
import { TaskTitle } from "../../domain/TaskTitle";
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
    const taskFilter: FiltersPrimitives[] = [{ field: "id", operator: "EQ", value: taskId }]
    const tasksFound = await this.taskFinder.run(taskFilter, null, null)
    if(tasksFound.length == 0) {
      return null
    }
    
    let taskToUpdate = tasksFound[0]
    if(updateValues.status) {
      const status = TaskStatus.fromPrimitive(updateValues.status)
      taskToUpdate.updateStatus(status)
    }

    if(updateValues.description) {
      const description = new TaskDescription(updateValues.description)
      taskToUpdate.updateDescription(description)
    }

    if(updateValues.title) {
      const title = new TaskTitle(updateValues.title)
      taskToUpdate.updateTitle(title)
    }

    if(updateValues.dueToDate) {
      const dueToDate = new TaskDueToDate(new Date(updateValues.dueToDate))
      taskToUpdate.updateDueToDate(dueToDate)
    }

    await this.taskRepository.update(taskToUpdate)

    return taskToUpdate
  }
} 
