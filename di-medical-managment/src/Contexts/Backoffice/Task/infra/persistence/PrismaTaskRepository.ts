import prisma from "../../../../Shared/infra/persistence/PrismaDbConnection";
import { Task } from "../../domain/Task";
import { TaskRepository } from "../../domain/TaskRepository";

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
            id: taskPlain.id
          }
        }
      }
    });
  }
}
