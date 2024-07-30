import { Incident } from "../../domain/Incident";
import { IncidentDate } from "../../domain/IncidentDate";
import { IncidentId } from "../../domain/IncidentId";
import { Truck } from "../../domain/Truck";
import { TruckRepository } from "../../domain/TruckRepository";

export class FakeTruckRepository implements TruckRepository {
  private trucks: Truck[] = [];
  private incidents: Incident[] = [];

  async findAll(): Promise<Truck[]> {
    return this.trucks;
  }

  async save(truck: Truck): Promise<void> {
    const existingTruckIndex = this.trucks.findIndex(t => t.toPrimitives().id === truck.toPrimitives().id);

    if (existingTruckIndex !== -1) {
      this.trucks[existingTruckIndex] = truck;
    } else {
      this.trucks.push(truck);
    }
  }

  async search(term: string): Promise<Truck | null> {
    const truck = this.trucks.find(t => t.toPrimitives().id === term || t.toPrimitives().id === term);
    return truck ? truck : null;
  }

  async update(truck: Truck): Promise<void> {
    const existingTruckIndex = this.trucks.findIndex(t => t.toPrimitives().id === truck.toPrimitives().id);

    if (existingTruckIndex !== -1) {
      this.trucks[existingTruckIndex] = truck;
    } else {
      throw new Error(`Truck with id ${truck.toPrimitives().id} not found`);
    }
  }

  async saveIncident(incident: Incident): Promise<void> {
    const existingTruckIndex = this.incidents.findIndex(t => t.toPrimitives().id === incident.toPrimitives().id);

    if (existingTruckIndex !== -1) {
      this.incidents[existingTruckIndex] = incident;
    } else {
      this.incidents.push(incident);
    }
  }

  async removeIncident(data: { id: IncidentId; finishDate: IncidentDate; }): Promise<void> {
    
  }

  async searchIncident(id: IncidentId): Promise<Incident | null> {
    const incident = this.incidents.find(i => i.toPrimitives().id === id.toString());
    return incident ? incident : null;
  }
}
