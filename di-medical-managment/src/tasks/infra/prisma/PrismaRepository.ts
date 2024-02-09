import { PrismaClient } from '@prisma/client'
import { Task } from '../../domain/Task'
import { TaskRepository } from '../../domain/TaskRepository'

export class PrismaRepository implements TaskRepository {
  private readonly prismaClient = new PrismaClient()

  async save(task: Task): Promise<void> {
    
  }
}
