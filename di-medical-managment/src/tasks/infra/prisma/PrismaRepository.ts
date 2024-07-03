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
  userAssignedName: string;
  userAssgnedPicture: string;
  status: string;
  dueTo: string;
  endDate: string;
  startedDate: string;
}

export class PrismaRepository implements TaskRepository {
  private readonly prismaClient = new PrismaClient();

  async save(task: Task): Promise<void> {
    try {
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
          userAssignedName: primitives.userAssignedName,
          userAssgnedPicture: primitives.userAssignedPicture,
          userAssigned: {
            connect: {
              id: primitives.userAssignedId
            }
          }
        }
      }) 
    } catch (error) {
      console.log(error)
    }
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
      task.userAssignedName,
      task.userAssgnedPicture,
      task.status,
      task.startedDate,
      task.dueTo,
      task.endDate
    ))
    return tasks
  }

  async kanban(): Promise<Task[]> {
    const today = new Date()
    const fiveDaysAgo = new Date(today)
    fiveDaysAgo.setDate(today.getDate() - 5)

    const results = await this.prismaClient.task.findMany({
      where: {
        OR: [
          {
            status: {
              equals: "Backlog"
            }
          },
          {
            status: {
              equals: "En curso"
            }
          },
          {
            status: {
              equals: "Hecho"
            },
            AND: [
              { startedDate: 
                {
                  gte: fiveDaysAgo
                } 
              }
            ]
          }
        ]
      }
    })

    const tasks = results.map(task => Task.fromPrimitives(
      task.id,
      task.title,
      task.description,
      task.userAssignedId,
      task.userAssignedName,
      task.userAssgnedPicture,
      task.status,
      task.startedDate.toISOString(),
      task.dueTo.toISOString(),
      task.endDate.toISOString()
    ))

    return tasks
  }

  async update(task: Task): Promise<void> {
    const tasksPrimitives = task.toPrimitives()
    await this.prismaClient.task.update({
      where: {
        id: tasksPrimitives.id
      },
      data: {
        description: tasksPrimitives.description,
        status: tasksPrimitives.status.name,
        title: tasksPrimitives.name,
        dueTo: tasksPrimitives.dueDate,
        endDate: tasksPrimitives.endDate,
        startedDate: tasksPrimitives.startedDate
      }
    })
  }
}
