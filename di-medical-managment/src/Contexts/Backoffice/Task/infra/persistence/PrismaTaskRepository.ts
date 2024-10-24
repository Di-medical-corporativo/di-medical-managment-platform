import prisma from "../../../../Shared/infra/persistence/PrismaDbConnection";
import { UserId } from "../../../User/domain/UserId";
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
        },
        belongsToItinerary: taskPlain.isPoint
      }
    });
  }

  async findAll(month: number, year: number): Promise<Task[]> {
    const startOfMonth: Date = new Date(year, month - 1, 1);
    
    const endOfMonth: Date = new Date(year, month, 1);

    const tasksDB = await prisma.task.findMany({
      include: {
        userAssigned: {
          select: {
            id: true,
            firstName: true,
            lastName: true
          }
        },
      },
      where: {
        OR: [
          // Mostrar todas las tareas asignadas y en progreso sin importar la fecha
          {
            status: { in: [StatusList.Assigned, StatusList.Progress] }
          },
          // Mostrar tareas completadas solo si están dentro del rango de fechas
          {
            status: StatusList.Completed,
            dueTo: {
              gte: startOfMonth,
              lt: endOfMonth
            }
          },
          // Mostrar tareas vencidas dentro del rango de fechas
          {
            status: StatusList.PastDue,
            dueTo: {
              gte: startOfMonth,
              lt: endOfMonth
            }
          }
        ]
      },
      orderBy: {
        dueTo: 'desc'
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
      },
      isPoint: t.belongsToItinerary
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
      },
      isPoint: taskDB.belongsToItinerary
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

  async kanban(id: UserId, month: number, year: number): Promise<Task[]> {
    const startOfMonth: Date = new Date(year, month - 1, 1);
    
    const endOfMonth: Date = new Date(year, month, 1);
    
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
      where: {
        userAssignedId: id.toString(),
        OR: [
          // Mostrar todas las tareas asignadas y en progreso sin importar la fecha
          {
            status: { in: [StatusList.Assigned, StatusList.Progress] }
          },
          // Mostrar tareas completadas solo si están dentro del rango de fechas
          {
            status: StatusList.Completed,
            dueTo: {
              gte: startOfMonth,
              lt: endOfMonth
            }
          },
          // Mostrar tareas vencidas dentro del rango de fechas
          {
            status: StatusList.PastDue,
            dueTo: {
              gte: startOfMonth,
              lt: endOfMonth
            }
          }
        ]
      },
      orderBy: {
        dueTo: 'desc'
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
      },
      isPoint: t.belongsToItinerary
    }));

    return tasks;
  }
}
