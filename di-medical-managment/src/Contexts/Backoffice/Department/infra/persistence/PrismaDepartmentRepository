import { Department } from "../../domain/Department";
import { DepartmentRepository } from "../../domain/DepartmentRepository";
import prisma from "../../../../Shared/infra/persistence/PrismaDbConnection";
import { DeparmentId } from "../../domain/DeparmentId";

export class PrismaDepartmentRepository implements DepartmentRepository {
  async save(department: Department): Promise<void> {
    const primitives = department.toPrimitives();
    
    await prisma.department.create({
      data: {
        id: primitives.id,
        name: primitives.name
      }
    });
  }

  async findAll(): Promise<Department[]> {
    const departmentDB = await prisma.department.findMany({
      where: {
        isActive: true
      }
    });

    const departments: Department[] = departmentDB.map((d) => Department.fromPrimitives({ id: d.id, name: d.name }));

    return departments;
  }

  async search(id: DeparmentId): Promise<Department | null> {
    const departmentDB = await prisma.department.findFirst({
      where: {
        id: id.toString()
      }
    });

    if(!departmentDB) {
      return null;
    }

    const department: Department = Department.fromPrimitives({
      id: departmentDB.id,
      name: departmentDB.name
    });

    return department;
  }

  async update(deparment: Department): Promise<void> {
    const primitives = deparment.toPrimitives();
    
    await prisma.department.update({
      where: {
        id: primitives.id
      },
      data: {
        name: primitives.name
      }
    });
  }

  async delete(id: DeparmentId): Promise<void> {
    await prisma.department.update({
      where: {
        id: id.toString()
      },
      data: {
        isActive: false
      }
    });
  }
}
