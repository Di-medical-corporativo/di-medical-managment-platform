import prisma from "../../../../Shared/infra/persistence/PrismaDbConnection";
import { Task } from "../../domain/Task";
import { TaskRepository } from "../../domain/TaskRepository";
import { StatusList } from "../../domain/TaskStatus";

export class PrismaTaskRepository implements TaskRepository {
  async save(task: Task): Promise<void> {
    const taskPlain = task.toPrimitives();
    
    await prisma.task.create({
      data: {
        id: taskPlain.id,
        description: taskPlain.description,
        dueTo: taskPlain.dueTo,
        status: taskPlain.status,
        title: taskPlain.title,
        userAssigned: {
          connect: {
            id: taskPlain.userAssigned.id
          }
        }
      }
    });
  }

  async findAll(): Promise<Task[]> {
    const tasksDB = await prisma.task.findMany({
      include: {
        userAssigned: {
          select: {
            id: true,
            firstName: true,
            lastName: true
          }
        }
      },
      orderBy: {
        dueTo: 'asc'
      }
    });

    const tasks = tasksDB.map(t => Task.fromPrimitives({
      description: t.description,
      dueTo: t.dueTo.toISOString(),
      id: t.id,
      status: t.status,
      title: t.title,
      userAssigned: {
        firstName: t.userAssigned.firstName,
        id: t.userAssignedId,
        lastName: t.userAssigned.lastName
      }
    }));

    return tasks;
  }
}
