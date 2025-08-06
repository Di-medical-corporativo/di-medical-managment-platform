import { Prisma } from "@prisma/client";
import prisma from "../../../../Shared/infra/persistence/PrismaDbConnection";
import { Technical } from "../../domain/Technical";
import { TechnicalRepository } from "../../domain/TechnicalRepository";

export class PrismaTechnicalRepository implements TechnicalRepository {
  async searchAll(page: number = 1, searchTerm: string): Promise<{ technical: Technical[]; totalPages: number; }> {
    const limit: number = 20;

    const skip: number = (page - 1) * limit;

    const whereClause: Prisma.TechnicalWhereInput | undefined = searchTerm
      ? {
        OR: [
          {
            name: {
              contains: searchTerm,
              mode: 'insensitive' as const
            }
          },
          {
            brand: {
              name: {
                contains: searchTerm,
                mode: 'insensitive' as const
              }
            }
          },
          {
            codes: {
              some: {
                code: {
                  contains: searchTerm,
                  mode: 'insensitive' as const
                }
              }
            }
          }
        ]
      }
      : undefined


    const [technicalRaw, total] = await Promise.all([
      prisma.technical.findMany({
        skip,
        take: limit,
        where: whereClause,
        include: {
          codes: true,
          brand: true
        },
        orderBy: {
          name: 'asc'
        }
      }),
      prisma.technical.count({
        where: whereClause
      })
    ])

    const technical: Technical[] = technicalRaw.map(t => Technical.fromPrimitives({
      brand: t.brand,
      codes: t.codes.map(c => c.code),
      id: t.id,
      imageUrl: t.imageUrl,
      name: t.name
    }));

    const totalPages = Math.ceil(total / limit);

    return {
      technical,
      totalPages
    }
  }
}
