import { Module } from "../../domain/Module";
import { ModuleRepository } from "../../domain/ModuleRepository";
import prisma from "./PrismaDbConnection";

export class PrismaModuleRepository implements ModuleRepository {
  async getAll(): Promise<Module[]> {
    const modules = await prisma.module.findMany();

    return modules.map(module =>
      Module.fromPrimitives({
        id: module.id,
        name: module.name
      })
    );
  }

  async save(module: Module): Promise<void> {
    const primitives = module.toPrimitives();

    await prisma.module.create({
      data: {
        id: primitives.id,
        name: primitives.name
      }
    });
  }
}
