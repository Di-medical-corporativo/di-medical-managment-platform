import { PrismaClient } from '@prisma/client'
import { Task } from '../../domain/Task'
import { TaskRepository } from '../../domain/TaskRepository'
import { Criteria } from '../../../shared/domain/criteria/Criteria'
import { CriteriaToSqlConverter } from '../../../shared/infra/criteria/CriteriaToSqlConverter'

interface TaskDb {
  id: string;
  title: string;
  description: string;
  userAssignedId: string;
  status: string;
  dueTo: string;
  endDate: string;
  startedDate: string;
}

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

  async matching(criteria: Criteria): Promise<Task[]> {
    const converter = new CriteriaToSqlConverter()
    const query = converter.convert(["*"], "Task", criteria)
    const results = await this.prismaClient.$queryRawUnsafe<TaskDb[]>(query)

    const tasks = results.map(task => Task.fromPrimitives(
      task.id,
      task.title,
      task.description,
      task.userAssignedId,
      task.status,
      task.startedDate,
      task.dueTo
    ))

    return tasks
  }
}
