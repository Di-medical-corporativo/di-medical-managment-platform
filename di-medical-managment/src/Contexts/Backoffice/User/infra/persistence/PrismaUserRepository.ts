import { UserAuthenticated } from "../../../../Shared/domain/UserAuthenticated";
import prisma from "../../../../Shared/infra/persistence/PrismaDbConnection";
import { User } from "../../domain/User";
import { UserEmail } from "../../domain/UserEmail";
import { UserId } from "../../domain/UserId";
import { UserPassword } from "../../domain/UserPassword";
import { UserRepository } from "../../domain/UserRepository";

export class PrismaUserRepository implements UserRepository {
  async save(user: User, password: UserPassword): Promise<void> {
    const userPlain = user.toPrimitives();
    const passwordPlain = password.toPrimitives();

    await prisma.user.create({
      data: {
        id: userPlain.id,
        role: "role",
        modules: {
          create: userPlain.modules.map((module) => ({
            module: {
              connect: { id: module.id }
            }
          }))
        },
        createdAt: userPlain.createdAt,
        firstName: userPlain.firstName,
        lastName: userPlain.lastName,
        email: userPlain.email,
        job: userPlain.job,
        phone: userPlain.phone,
        isActive: true,
        sucursal: {
          connect: {
            id: userPlain.sucursal.id
          }
        },
        login: {
          create: {
            id: userPlain.id,
            email: userPlain.email,
            passwordHash: passwordPlain.hash,
            passwordSalt: passwordPlain.salt
          }
        }
      }
    });
  }

  async search(term: string): Promise<User | null> {
    const userDB = await prisma.user.findFirst({
      where: {
        OR: [
          {
            id: term
          },
          {
            email: term
          }
        ],
        isActive: true
      },
      include: {
        sucursal: true,
        modules: {
          include: {
            module: true
          }
        }
      }
    });

    if(!userDB) {
      return null
    };

    const user = User.fromPrimitives({
      id: userDB.id,
      createdAt: userDB.createdAt.toISOString(),
      email:userDB.email,
      firstName: userDB.firstName,
      modules: userDB.modules.map(m => ({ id: m.moduleId, name: m.module.name })),
      job: userDB.job,
      lastName: userDB.lastName,
      phone: userDB.phone,
      sucursal: {
        sucursalId: userDB.sucursal.id,
        sucursalName: userDB.sucursal.name,
        sucursalAddress: userDB.sucursal.address,
        sucursalPhone: userDB.sucursal.phone
      }
    });

    return user;
  }

  async findAll(): Promise<User[]> {
    const usersDB = await prisma.user.findMany({
      include: {
        sucursal: true,
        modules: {
          include: {
            module: true
          }
        }
      },
      where: {
        isActive: true
      }
    });

    const users: User[] = usersDB.map(u => User.fromPrimitives({
      createdAt: u.createdAt.toISOString(),
      email: u.email,
      firstName: u.firstName,
      lastName: u.lastName,
      id: u.id,
      job: u.job,
      phone: u.phone,
      modules: [],
      sucursal: {
        sucursalAddress: u.sucursal.address,
        sucursalId: u.sucursal.id,
        sucursalName: u.sucursal.name,
        sucursalPhone: u.sucursal.phone
      } 
    }));

    return users;
  }

  async update(user: User, password: UserPassword): Promise<void> {
    const userPlain = user.toPrimitives();

    await prisma.user.update({
      where: {
        id: userPlain.id
      },
      data: {
        email: userPlain.email,
        firstName: userPlain.firstName,
        lastName: userPlain.lastName,
        job: userPlain.job,
        phone: userPlain.phone,
        sucursal: {
          connect: {
            id: userPlain.sucursal.id
          }
        },
        login: {
          update: {
            passwordHash: password.toPrimitives().hash,
            passwordSalt: password.toPrimitives().salt
          }
        }
      }
    });

    const updatedModules = userPlain.modules.map(m => m.id);

    const currentModulesUserHasAccess = await prisma.platformPermission.findMany({
      where: {
        user: {
          id: userPlain.id
        }
      },
      select: {
        moduleId: true
      }
    });

    const currentModuleIds = currentModulesUserHasAccess.map((m) => m.moduleId);

    const modulesToAdd = updatedModules.filter((moduleId) => !currentModuleIds.includes(moduleId))

    const modulesToDelete = currentModulesUserHasAccess.filter((m) => !updatedModules.includes(m.moduleId)).map(m => m.moduleId);

    if(modulesToAdd.length > 0) {
      await prisma.platformPermission.createMany({
        data: modulesToAdd.map(m => ({ moduleId: m, userId: userPlain.id }))
      });
    }

    if(modulesToDelete.length > 0) {
      await prisma.platformPermission.deleteMany({
        where: {
          userId: userPlain.id,
          moduleId: { in: modulesToDelete }
        }
      })
    }
  }

  async delete(id: UserId): Promise<void> {
    await prisma.user.update({
      where: {
        id: id.toString()
      },
      data: {
        isActive: false,
        login: {
          delete: true
        }
      }
    });
  }

  async findByEmail(email: UserEmail): Promise<UserAuthenticated | null> {
    const user = await prisma.user.findFirst({
      where: {
        email: email.toString(),
        isActive: true
      },
      include: {
        login: true,
        modules: {
          include: {
            module: true
          }
        }
      }
    });

    if(!user) return null;

    const userAuthenticated = UserAuthenticated.fromPrimitives({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      id: user.id,
      password: {
        hash: user.login?.passwordHash!,
        salt: user.login?.passwordSalt!
      },
      job: user.job,
      modules: user.modules.map(m => ({ id: m.moduleId, name: m.module.name })),
    });

    return userAuthenticated;
  }

  async overview(userId: UserId): Promise<{ 
    delayCount: number; 
    absenceCount: number; 
    assignedTasksCount: number; 
    inProgressTaskCount: number; 
    finishedTasksCount: number; 
    dueTasksCount: number; 
    pendingPermitCount: number; 
    approvedPermitCount: number; 
    rejectedPermitCount: number; }> {
    const [
      absenceCount,
      delayCount,
      assignedTasksCount,
      inProgressTaskCount,
      finishedTasksCount,
      dueTasksCount,
      pendingPermitCount,
      approvedPermitCount,
      rejectedPermitCount
    ] = await Promise.all([
      prisma.attendanceIssue.count({
        where: {
          userId: userId.toString(),
          type: 'absence-issue',
          OR: [
            { isJustified: false },
            {
              isJustified: true,
              justification: {
                status: { in: ['pending-justification', 'rejected-justification'] },
              },
            },
          ],
        },
      }),
      prisma.attendanceIssue.count({
        where: {
          userId: userId.toString(),
          type: 'delay-issue',
          OR: [
            { isJustified: false },
            {
              isJustified: true,
              justification: {
                status: { in: ['pending-justification', 'rejected-justification'] },
              },
            },
          ],
        },
      }),
      prisma.task.count({
        where: {
          userAssignedId: userId.toString(),
          status: 'assigned'
        }
      }),
      prisma.task.count({
        where: {
          userAssignedId: userId.toString(),
          status: 'in-progress'
        }
      }),
      prisma.task.count({
        where: {
          userAssignedId: userId.toString(),
          status: 'completed'
        }
      }),
      prisma.task.count({
        where: {
          userAssignedId: userId.toString(),
          status: 'pastdue'
        }
      }),
      prisma.permit.count({
        where: {
          userId: userId.toString(),
          status: 'pending-permit'
        }
      }),
      prisma.permit.count({
        where: {
          userId: userId.toString(),
          status: 'approved-permit'
        }
      }),
      prisma.permit.count({
        where: {
          userId: userId.toString(),
          status: 'rejected-permit'
        }
      })
    ]);

    return {
      absenceCount,
      delayCount,
      assignedTasksCount,
      inProgressTaskCount,
      finishedTasksCount,
      dueTasksCount,
      pendingPermitCount,
      approvedPermitCount,
      rejectedPermitCount
    }
  }
}
