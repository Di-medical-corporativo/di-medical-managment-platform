import { PrismaClient } from "@prisma/client";
import { SucursalRepository } from "../../domain/SucursalRepository";
import { Sucursal } from "../../domain/Sucursal";
import { SucursalId } from "../../domain/SucursalId";

export class PrismaSucursalRepository implements SucursalRepository {
  private readonly prismaClient = new PrismaClient();

  async save(sucursal: Sucursal): Promise<void> {
    const sucursalPlain = sucursal.toPrimitives();
    await this.prismaClient.sucursal.create({
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
    await this.prismaClient.sucursal.update({
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
    const result = await this.prismaClient.sucursal.findFirst({
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
