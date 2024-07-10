import prisma from "../../../../Shared/infra/persistence/PrismaDbConnection";
import { Truck } from "../../domain/Truck";
import { TruckRepository } from "../../domain/TruckRepository";

export class PrismaTruckRepository implements TruckRepository {
  async save(truck: Truck): Promise<void> {
    const truckPlain = truck.toPrimitives();

    await prisma.truck.create({
      data: {
        id: truckPlain.id,
        brand: truckPlain.brand,
        model: truckPlain.model,
        isActive: true,
        plates: truckPlain.plate
      }
    });
  }
}
