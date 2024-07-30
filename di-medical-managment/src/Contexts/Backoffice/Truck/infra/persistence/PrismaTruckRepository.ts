import prisma from "../../../../Shared/infra/persistence/PrismaDbConnection";
import { Incident } from "../../domain/Incident";
import { IncidentDate } from "../../domain/IncidentDate";
import { IncidentId } from "../../domain/IncidentId";
import { Truck } from "../../domain/Truck";
import { TruckRepository } from "../../domain/TruckRepository";

export class PrismaTruckRepository implements TruckRepository {
  
  async findAll(): Promise<Truck[]> {
    const truckDB = await prisma.truck.findMany({});

    const trucks = truckDB.map(t => {
      return Truck.fromPrimities({
        id: t.id,
        brand: t.brand,
        model: t.model,
        plate: t.plates
      });
    });

    return trucks;
  }
  
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

  async update(truck: Truck): Promise<void> {
    const plainTruck = truck.toPrimitives();

    await prisma.truck.update({
      where: {
        id: plainTruck.id
      },
      data: {
        brand: plainTruck.brand,
        model: plainTruck.model,
        plates: plainTruck.plate
      }
    });
  }

  async search(id: string): Promise<Truck | null> {
    const truckDB = await prisma.truck.findFirst({
      where: {
        id
      }
    });

    if(!truckDB) {
      return null;
    }
    
    const truck = Truck.fromPrimities({
      id: truckDB.id,
      brand: truckDB.brand,
      model: truckDB.model,
      plate: truckDB.plates
    });

    return truck;
  }

  async saveIncident(incident: Incident): Promise<void> {
    const incidentPlain = incident.toPrimitives();
    
    await prisma.incident.create({
      data: {
        description: incidentPlain.description,
        id: incidentPlain.id,
        finishedDate: incidentPlain.finishDate,
        startDate: incidentPlain.startDate,
        isActive: incidentPlain.isActive,
        truck: {
          connect: {
            id: incidentPlain.truckId
          }
        }
      }
    });
  }

  async removeIncident(data: { id: IncidentId, finishDate: IncidentDate }): Promise<void> {
    await prisma.incident.update({
      where: {
        id: data.id.toString()
      },
      data: {
        finishedDate: data.finishDate.toString(),
        isActive: false
      }
    });
  }

  async searchIncident(id: IncidentId): Promise<Incident | null> {
    const incidentDB = await prisma.incident.findFirst({
      where: {
        id: id.toString()
      }
    });
  
    if(!incidentDB) {
      return null;
    }

    const incident = Incident.fromPrimitives({
      id: incidentDB.id,
      description: incidentDB.description,
      finishDate: incidentDB.finishedDate.toISOString(),
      isActive: incidentDB.isActive,
      startDate: incidentDB.startDate.toISOString(),
      truckId: incidentDB.truckId
    });

    return incident;
  }
}
