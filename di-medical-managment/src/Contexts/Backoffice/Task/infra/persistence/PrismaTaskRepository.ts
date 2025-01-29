import e from "express";
import prisma from "../../../../Shared/infra/persistence/PrismaDbConnection";
import { DeparmentId } from "../../../Department/domain/DeparmentId";
import { UserId } from "../../../User/domain/UserId";
import { Task } from "../../domain/Task";
import { TaskId } from "../../domain/TaskId";
import { TaskRepository } from "../../domain/TaskRepository";
import { StatusList, TaskStatus } from "../../domain/TaskStatus";

export class PrismaTaskRepository implements TaskRepository {
  async save(task: Task): Promise<void> {
    const taskPlain = task.toPrimitives();

    const data: any = {
      id: taskPlain.id,
      description: taskPlain.description,
      dueTo: taskPlain.dueTo,
      status: taskPlain.status,
      title: taskPlain.title,
      userAssigned: {
        connect: {
          id: taskPlain.userAssigned.id,
        },
      },
      department: {
        connect: {
          id: taskPlain.department.id,
        },
      },
      belongsToItinerary: taskPlain.isPoint,
    };

    if (taskPlain.assigner) {
      data.assigner = {
        connect: {
          id: taskPlain.assigner.id
        }
      };
    }

    await prisma.task.create({ data });
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
        assigner: {
          select: {
            id: true,
            firstName: true,
            lastName: true
          }
        },
        department: true
      },
      where: {
        OR: [
          {
            status: { in: [StatusList.Assigned, StatusList.Progress] }
          },
          {
            status: StatusList.Completed,
            dueTo: {
              gte: startOfMonth,
              lt: endOfMonth
            }
          },
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

    const tasks = tasksDB.map(t => {
      const task = Task.fromPrimitives({
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
        isPoint: t.belongsToItinerary,
        department: {
          id: t.department.id,
          name: t.department.name
        },
        assigner: {
          firstName: t.assigner?.firstName || '-',
          lastName: t.assigner?.lastName || '-',
          id: t.assigner?.id || '-'
        }
      });

      return task
    });

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
        },
        assigner: {
          select: {
            id: true,
            firstName: true,
            lastName: true
          }
        },
        department: true
      }
    });

    if (!taskDB) {
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
      isPoint: taskDB.belongsToItinerary,
      department: {
        id: taskDB.department.id,
        name: taskDB.department.name
      },
      assigner: {
        firstName: taskDB.assigner?.firstName || '-',
        lastName: taskDB.assigner?.lastName || '-',
        id: taskDB.assigner?.id || '-'
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
        title: plainTask.title,
        department: {
          connect: {
            id: plainTask.department.id
          }
        }
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
        },
        assigner: {
          select: {
            id: true,
            firstName: true,
            lastName: true
          }
        },
        department: true
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
      isPoint: t.belongsToItinerary,
      department: {
        id: t.department.id,
        name: t.department.name
      },
      assigner: {
        firstName: t.assigner?.firstName || '-',
        lastName: t.assigner?.lastName || '-',
        id: t.assigner?.id || '-'
      }
    }));

    return tasks;
  }

  async overview(): Promise<{ asignedCount: number; inProgressCount: number; finishedCount: number; dueCount: number; }> {
    const [
      asignedCount,
      inProgressCount,
      finishedCount,
      dueCount
    ] = await Promise.all([
      prisma.task.count({
        where: {
          status: 'assigned'
        }
      }),
      prisma.task.count({
        where: {
          status: 'in-progress'
        }
      }),
      prisma.task.count({
        where: {
          status: 'completed'
        }
      }),
      prisma.task.count({
        where: {
          status: 'pastdue'
        }
      }),
    ]);

    return {
      asignedCount,
      inProgressCount,
      finishedCount,
      dueCount
    }
  }

  async searchFilter(params: { departmentId?: DeparmentId; asignedTo?: UserId; asignedBy?: UserId; status?: StatusList; startMonth: Date; endMonth: Date; }): Promise<Task[]> {
    let query: any = {
      dueTo: {
        gte: params.startMonth.toISOString(),
        lt: params.endMonth.toISOString()
      }
    }

    if(params.departmentId) {
      query.departmentId = params.departmentId.toString()
    }

    if(params.asignedTo) {
      query.userAssignedId = params.asignedTo.toString()
    }
    
    if(params.asignedBy) {
      query.assignerId = params.asignedBy.toString()
    }

    if(params.status) {
      query.status = {
        in: [params.status]
      }
    } else {
      query.status = {
        in: [StatusList.Assigned, StatusList.PastDue, StatusList.Completed, StatusList.Progress]
      }
    }

    const taskDB = await prisma.task.findMany({
      include: {
        userAssigned: {
          select: {
            id: true,
            firstName: true,
            lastName: true
          }
        },
        assigner: {
          select: {
            id: true,
            firstName: true,
            lastName: true
          }
        },
        department: true
      },
      where: query,
      orderBy: {
        dueTo: 'desc'
      }
    });

    const tasks = taskDB.map(t => {
      const task = Task.fromPrimitives({
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
        isPoint: t.belongsToItinerary,
        department: {
          id: t.department.id,
          name: t.department.name
        },
        assigner: {
          firstName: t.assigner?.firstName || '-',
          lastName: t.assigner?.lastName || '-',
          id: t.assigner?.id || '-'
        }
      });

      return task
    });

    return tasks;
  }
}
