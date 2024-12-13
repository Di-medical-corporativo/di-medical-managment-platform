import { Module } from "../../domain/Module";
import { ModuleId } from "../../domain/ModuleId";
import { ModuleRepository } from "../../domain/ModuleRepository";
import prisma from "./PrismaDbConnection";

export class PrismaModuleRepository implements ModuleRepository {
  async getAll(): Promise<Module[]> {
    const modules = await prisma.module.findMany();

    return modules.map(module =>
      Module.fromPrimitives({
        id: module.id,
        name: module.name,
      })
    );
  }

  async save(module: Module): Promise<void> {
    const primitives = module.toPrimitives();
    await prisma.module.upsert({
      where: { id: primitives.id },
      create: {
        id: primitives.id,
        name: primitives.name,
      },
      update: {
        name: primitives.name,
      },
    });
  }

  async find(id: ModuleId): Promise<Module | null> {
    const moduleDb = await prisma.module.findFirst({
      where: {
        id: id.toString()
      }
    });

    if(!moduleDb) {
      return null;
    }

    const module = Module.fromPrimitives({
      id: moduleDb.id,
      name: moduleDb.name
    });

    return module;
  }
}
