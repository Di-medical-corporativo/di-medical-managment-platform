import prisma from "../../../../Shared/infra/persistence/PrismaDbConnection";
import { Task } from "../../domain/Task";
import { TaskId } from "../../domain/TaskId";
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

  async search(id: TaskId): Promise<Task | null> {
    const taskDB = await prisma.task.findFirst({
      where: {
        id: id.toString()
      },
      include: {
        userAssigned: {
          select: {
            firstName: true,
            lastName: true,
            id: true
          }
        }
      }
    });

    if(!taskDB) {
      return null;
    }

    const task = Task.fromPrimitives({
      id: taskDB.id,
      title: taskDB.title,
      description: taskDB.description,
      dueTo: taskDB.dueTo.toISOString(),
      status: taskDB.status,
      userAssigned: {
        id: taskDB.userAssigned.id,
        firstName: taskDB.userAssigned.firstName,
        lastName: taskDB.userAssigned.lastName
      }
    });

    return task;
  }

  async update(task: Task): Promise<void> {
    const plainTask = task.toPrimitives();
    
    await prisma.task.update({
      where: {
        id: plainTask.id
      },
      data: {
        description: plainTask.description,
        dueTo: plainTask.dueTo,
        status: plainTask.status,
        title: plainTask.title
      }
    });
  }

  async delete(id: TaskId): Promise<void> {
    await prisma.task.delete({
      where: {
        id: id.toString()
      }
    });
  }

  async timeOut(id: TaskId): Promise<void> {
    await prisma.task.update({
      where: {
        id: id.toString()
      },
      data: {
        status: StatusList.PastDue
      }
    });
  }

  async updateStatus(task: Task): Promise<void> {
    const { status, id } = task.toPrimitives();
  
    await prisma.task.update({
      where: {
        id
      },
      data: {
        status 
      }
    });
  }
}
