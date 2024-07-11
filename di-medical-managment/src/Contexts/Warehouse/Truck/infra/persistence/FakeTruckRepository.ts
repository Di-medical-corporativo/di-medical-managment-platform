import { Truck } from "../../domain/Truck";
import { TruckRepository } from "../../domain/TruckRepository";

export class FakeTruckRepository implements TruckRepository {
  private trucks: Truck[] = [];

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
}
