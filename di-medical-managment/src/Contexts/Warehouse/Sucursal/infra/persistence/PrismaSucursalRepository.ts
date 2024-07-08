import { SucursalRepository } from "../../domain/SucursalRepository";
import { Sucursal } from "../../domain/Sucursal";
import { SucursalId } from "../../domain/SucursalId";
import prisma from "../../../../Shared/infra/persistence/PrismaDbConnection";

export class PrismaSucursalRepository implements SucursalRepository {

  async save(sucursal: Sucursal): Promise<void> {
    const sucursalPlain = sucursal.toPrimitives();
    console.log(sucursalPlain);
    await prisma.sucursal.create({
      data: {
        id: sucursalPlain.id,
        address: sucursalPlain.address,
        name: sucursalPlain.name,
        phone: sucursalPlain.phone
      }
    });
  }

  async update(sucursal: Sucursal): Promise<void> {
    const sucursalPlain = sucursal.toPrimitives();
    await prisma.sucursal.update({
      where: {
        id: sucursalPlain.id
      },
      data: {
        address: sucursalPlain.address,
        name: sucursalPlain.name,
        phone: sucursalPlain.phone
      }
    })
  }

  async search(id: SucursalId): Promise<Sucursal | null> {
    const result = await prisma.sucursal.findFirst({
      where: {
        id: id.toString()
      }
    });

    if(result === null) return null;

    const sucursal = Sucursal.fromPrimitives({
      id: result.id,
      name: result.name,
      address: result.address,
      phone: result.phone
    });

    return sucursal;
  }
}
