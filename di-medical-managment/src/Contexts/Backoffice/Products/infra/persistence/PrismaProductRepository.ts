import prisma from "../../../../Shared/infra/persistence/PrismaDbConnection";
import { ProductRepository } from "../../domain/ProductRepository";
import { Tag } from "../../domain/Tag";

export class PrismaProductRepository implements ProductRepository {
  async findAllTags(): Promise<Tag[]> {
    const dbTags = await prisma.tag.findMany({});

    const tags: Tag[] = dbTags.map(t => Tag.fromPrimitives(t));

    return tags;
  }
}
