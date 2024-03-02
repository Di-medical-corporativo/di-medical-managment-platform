import { PrismaClient } from '@prisma/client'
import { Task } from '../../domain/Task'
import { TaskRepository } from '../../domain/TaskRepository'

export class PrismaRepository implements TaskRepository {
  private readonly prismaClient = new PrismaClient()

  async save(task: Task): Promise<void> {
    const primitives = task.toPrimitives()
    await this.prismaClient.task.create({
      data: {
        id: primitives.id,
        description: primitives.description,
        dueTo: primitives.dueDate,
        title: primitives.name,
        endDate: primitives.dueDate,
        startedDate: primitives.startedDate,
        status: primitives.status.name,
        userAssigned: {
          connect: {
            id: primitives.userAssigned
          }
        }
      }
    })
  }
}
