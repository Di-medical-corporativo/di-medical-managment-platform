import { User } from '../../../shared/domain/User'
import { TaskDescription } from '../../domain/TaskDescription'
import { TaskId } from '../../domain/TaskId'
import { TaskRepository } from '../../domain/TaskRepository'
import { TaskStatus } from '../../domain/TaskStatus'
import { TaskTitle } from '../../domain/TaskTitle'

export class TaskCreator {
  constructor(private taskRepository: TaskRepository) {}

  async run(params: { taskId: TaskId, title: TaskTitle, description: TaskDescription, userAssigned: string, status: TaskStatus }) {
    console.log('CREATING...')
  }
}
