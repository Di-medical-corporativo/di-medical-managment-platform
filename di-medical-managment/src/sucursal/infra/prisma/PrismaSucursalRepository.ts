import { PrismaClient } from "@prisma/client";
import { SucursalRepository } from "../../domain/SucursalRepository";
import { Sucursal } from "../../domain/Sucursal";

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
}
