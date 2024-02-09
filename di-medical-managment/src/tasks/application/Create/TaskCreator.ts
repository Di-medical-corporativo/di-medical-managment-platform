import { TaskRepository } from '../../domain/TaskRepository'

export class TaskCreator {
  constructor(private taskRepository: TaskRepository) {}

  async run() {
    console.log('CREATING...')
  }
}
