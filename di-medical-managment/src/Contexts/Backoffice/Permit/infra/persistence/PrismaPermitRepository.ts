import prisma from "../../../../Shared/infra/persistence/PrismaDbConnection";
import { UserId } from "../../../User/domain/UserId";
import { Permit, PermitWithDecision, PermitWithNoDecision } from "../../domain/Permit";
import { PermitAdminComment } from "../../domain/PermitComment";
import { PermitId } from "../../domain/PermitId";
import { PermitRepository } from "../../domain/PermitRepository";
import { PermitStatusList } from "../../domain/PermitStatus";
import { PermitType } from "../../domain/PermitType";
import { PermitUser } from "../../domain/PermitUser";

export class PrismaPermitRepository implements PermitRepository {

  async save(permit: Permit): Promise<void> {
    const permitPritive = permit.toPrimitives();
    
    await prisma.permit.create({
      data: {
        id: permitPritive.id,
        type: permitPritive.type,
        reason: permitPritive.reason,
        user: {
          connect: {
            id: permitPritive.user.id
          }
        },
        createdAt: permitPritive.createdAt,
        status: permitPritive.status
      }
    });
  }

  async findByUser(id: UserId, month: number, year: number): Promise<Permit[]> {
    const userId = id.toString();

    const startOfMonth: Date = new Date(year, month - 1, 1);
    
    const endOfMonth: Date = new Date(year, month, 1);

    const permitsDB = await prisma.permit.findMany({
      where: {
        userId,
        createdAt: {
          gte: startOfMonth,
          lt: endOfMonth
        }
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true
          }
        },
        decitionTakenBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true
          }
        }
      }
    });

    const permits = permitsDB.map(p => {
      let permitType: PermitType = PermitType.Personal;

      if(p.type == PermitType.Sickness) permitType = PermitType.Sickness;
      if(p.type == PermitType.Vacation) permitType = PermitType.Vacation;

      if(p.status == 'pending-permit') {
        return PermitWithNoDecision.fromPrimitives({
          createdAt: p.createdAt.toISOString(),
          id: p.id,
          reason: p.reason,
          status: p.status,
          type: permitType,
          user: {
            id: p.user.id,
            firstName: p.user.firstName,
            lastName: p.user.lastName
          }
        });
      } else {
        return PermitWithDecision.fromPrimitives({
          createdAt: p.createdAt.toISOString(),
          id: p.id,
          reason: p.reason,
          status: p.status,
          type: permitType,
          user: {
            id: p.user.id,
            firstName: p.user.firstName,
            lastName: p.user.lastName
          },
          adminCommment: p.adminComment || 'Sin comentario',
          decitionTakenAt: p.decitionTakenAt?.toISOString()!,
          decitionTakenBy: {
            firstName: p.decitionTakenBy?.firstName!,
            id: p.decitionTakenBy?.id!,
            lastName: p.decitionTakenBy?.lastName!
          }
        });
      }
    });

    return permits;
  }

  async findAll(month: number, year: number): Promise<Permit[]> {
    const startOfMonth: Date = new Date(year, month - 1, 1);
    
    const endOfMonth: Date = new Date(year, month, 1);

    const permitsDB = await prisma.permit.findMany({
      where: {
        createdAt: {
          gte: startOfMonth,
          lt: endOfMonth
        }
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true
          }
        },
        decitionTakenBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true
          }
        }
      }
    });

    const permits = permitsDB.map(p => {
      let permitType: PermitType = PermitType.Personal;

      if(p.type == PermitType.Sickness) permitType = PermitType.Sickness;
      if(p.type == PermitType.Vacation) permitType = PermitType.Vacation;

      if(p.status == 'pending-permit') {
        return PermitWithNoDecision.fromPrimitives({
          createdAt: p.createdAt.toISOString(),
          id: p.id,
          reason: p.reason,
          status: p.status,
          type: permitType,
          user: {
            id: p.user.id,
            firstName: p.user.firstName,
            lastName: p.user.lastName
          }
        });
      } else {
        return PermitWithDecision.fromPrimitives({
          createdAt: p.createdAt.toISOString(),
          id: p.id,
          reason: p.reason,
          status: p.status,
          type: permitType,
          user: {
            id: p.user.id,
            firstName: p.user.firstName,
            lastName: p.user.lastName
          },
          adminCommment: p.adminComment || 'Sin comentario',
          decitionTakenAt: p.decitionTakenAt?.toISOString()!,
          decitionTakenBy: {
            firstName: p.decitionTakenBy?.firstName!,
            id: p.decitionTakenBy?.id!,
            lastName: p.decitionTakenBy?.lastName!
          }
        });
      }
    });

    return permits;
  }

  async action(id: PermitId, comment: PermitAdminComment, action: PermitStatusList, decitionTakenBy: UserId): Promise<void> {
    await prisma.permit.update({
      where: {
        id: id.toString()
      },
      data: {
        status: action,
        decitionTakenAt: new Date().toISOString(),
        adminComment: comment.value,
        decitionTakenBy: {
          connect: {
            id: decitionTakenBy.toString()
          }
        }
      }
    });
  }

  async find(id: PermitId): Promise<Permit | null> {
    const permitDB = await prisma.permit.findFirst({
      where: {
        id: id.toString()
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            id: true
          }
        },
        decitionTakenBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true
          }
        }
      }
    });

    if(!permitDB) return null;
  
    if(permitDB.status == PermitStatusList.Pending) {
      return PermitWithNoDecision.fromPrimitives({
        createdAt: permitDB.createdAt.toISOString(),
        id: permitDB.id,
        reason: permitDB.reason,
        status: permitDB.status,
        type: permitDB.type as PermitType,
        user: {
          firstName: permitDB.user.firstName,
          lastName: permitDB.user.lastName,
          id: permitDB.user.id
        }
      });
    }

    return PermitWithDecision.fromPrimitives({
      createdAt: permitDB.createdAt.toISOString(),
      id: permitDB.id,
      reason: permitDB.reason,
      status: permitDB.status,
      type: permitDB.type as PermitType,
      user: {
        firstName: permitDB.user.firstName,
        lastName: permitDB.user.lastName,
        id: permitDB.user.id
      },
      adminCommment: permitDB.adminComment!,
      decitionTakenAt: permitDB.decitionTakenAt?.toISOString()!,
      decitionTakenBy: {
        firstName: permitDB.decitionTakenBy?.firstName!,
        id: permitDB.decitionTakenBy?.id!,
        lastName: permitDB.decitionTakenBy?.lastName!
      }
    })
  }

  async delete(id: PermitId): Promise<void> {
    await prisma.permit.delete({
      where: {
        id: id.toString()
      }
    });
  }
}
