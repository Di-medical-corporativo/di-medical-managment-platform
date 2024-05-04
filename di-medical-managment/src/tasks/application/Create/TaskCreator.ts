import { Task } from '../../domain/Task'
import { TaskDescription } from '../../domain/TaskDescription'
import { TaskDueToDate } from '../../domain/TaskDueToDate'
import { TaskId } from '../../domain/TaskId'
import { TaskRepository } from '../../domain/TaskRepository'
import { TaskStartDate } from '../../domain/TaskStartDate'
import { Backlog, TaskStatus } from '../../domain/TaskStatus'
import { TaskTitle } from '../../domain/TaskTitle'
import { UserAssignedId } from '../../domain/UserAssignedId'
import { UserAssignedName } from '../../domain/UserAssignedName'
import { UserAssignedPicture } from '../../domain/UserAssignedPicture'

export class TaskCreator {
  constructor(private taskRepository: TaskRepository) {}

  async run(params: { 
    taskId: TaskId, 
    title: TaskTitle, 
    description: TaskDescription, 
    userAssigned: UserAssignedId,
    userAssignedName: UserAssignedName,
    userAssignedPicture: UserAssignedPicture, 
    startedDate: TaskStartDate, 
    dueToDate: TaskDueToDate 
  }) {
    const task = Task.create(
      params.taskId,
      params.title,
      params.description,
      params.userAssigned,
      params.userAssignedName,
      params.userAssignedPicture,
      Backlog.create(),
      params.startedDate,
      params.dueToDate,
      params.dueToDate
    )
    await this.taskRepository.save(task)
  }
}
