import prisma from "../../../../Shared/infra/persistence/PrismaDbConnection";
import { UserId } from "../../../User/domain/UserId";
import { Permit, PermitWithDecision, PermitWithNoDecision } from "../../domain/Permit";
import { PermitRepository } from "../../domain/PermitRepository";
import { PermitStatusList } from "../../domain/PermitStatus";
import { PermitType } from "../../domain/PermitType";

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
          decitionTakenAt: p.decitionTakenAt?.toISOString()!
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
          decitionTakenAt: p.decitionTakenAt?.toISOString()!
        });
      }
    });

    return permits;
  }
}
