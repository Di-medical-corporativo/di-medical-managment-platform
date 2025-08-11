import { Prisma } from "@prisma/client";
import prisma from "../../../../Shared/infra/persistence/PrismaDbConnection";
import { Technical } from "../../domain/Technical";
import { TechnicalRepository } from "../../domain/TechnicalRepository";
import { TechnicalBrand } from "../../domain/TechnicalBrand";
import { TechnicalBrandId } from "../../domain/TechnicalBrandId";

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

  async createBrand(brand: TechnicalBrand): Promise<void> {
    const primitives = brand.toPrimitives();

    await prisma.technicalBrand.create({
      data: {
        id: primitives.id,
        name: primitives.name
      }
    });
  }

  async findAllBrands(): Promise<TechnicalBrand[]> {
    const brandsRaw = await prisma.technicalBrand.findMany({
      include: {
        _count: {
          select: {
            technicals: true
          }
        }
      }
    });

    const brands: TechnicalBrand[] = brandsRaw.map(b => {
      const brand = TechnicalBrand.fromPrimitives({
        id: b.id,
        name: b.name
      });
      brand.setTotal(b._count.technicals);
      return brand;
    });

    return brands;
  }

  async searchBrand(id: TechnicalBrandId): Promise<TechnicalBrand | null> {
    const brandRaw = await prisma.technicalBrand.findFirst({
      where: {
         id: id.value
      }
    });

    if(!brandRaw) return null;

    const brand = TechnicalBrand.fromPrimitives({
      id: brandRaw.id,
      name: brandRaw.name
    });

    return brand;
  }

  async create(technical: Technical): Promise<void> {
    const raw = technical.toPrimitives();

    await prisma.technical.create({
      data: {
        id: raw.id,
        imageUrl: raw.imageUrl,
        name: raw.name,
        brand: {
          connect: {
            id: raw.brand.id 
          }
        },
        codes: {
          create: raw.codes.map(c => ({ code: c }))
        }
      }
    });
  }
}
