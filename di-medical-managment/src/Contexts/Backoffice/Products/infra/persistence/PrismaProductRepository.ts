import prisma from "../../../../Shared/infra/persistence/PrismaDbConnection";
import { ProductRepository } from "../../domain/ProductRepository";
import { Tag } from "../../domain/Tag";
import { TagId } from "../../domain/TagId";

export class PrismaProductRepository implements ProductRepository {
  async findAllTags(): Promise<Tag[]> {
    const dbTags = await prisma.tag.findMany({});

    const tags: Tag[] = dbTags.map(t => Tag.fromPrimitives(t));

    return tags;
  }

  async createTag(tag: Tag): Promise<void> {
    const primitives = tag.toPrimitives();

    await prisma.tag.create({
      data: {
        name: primitives.name,
        id: primitives.id
      }
    });
  }

  async deleteTag(id: TagId): Promise<void> {
    await prisma.tag.delete({
      where: {
        id: id.toString()
      }
    });
  }

  async findTag(id: TagId): Promise<null | Tag> {
    const tagDb = await prisma.tag.findFirst({
      where: {
        id: id.toString()
      }
    });

    if(!tagDb) {
      return null
    }

    const tag: Tag = await Tag.fromPrimitives({
      id: tagDb?.id!,
      name: tagDb?.name!
    });

    return tag;
  }
}
