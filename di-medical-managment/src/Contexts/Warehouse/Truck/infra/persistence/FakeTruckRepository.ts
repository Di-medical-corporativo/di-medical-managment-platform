import { Truck } from "../../domain/Truck";
import { TruckRepository } from "../../domain/TruckRepository";

export class FakeTruckRepository implements TruckRepository {
  private trucks: Truck[] = [];

  async save(truck: Truck): Promise<void> {
    // Check if the truck already exists (for example, by ID)
    const existingTruckIndex = this.trucks.findIndex(t => t.toPrimitives().id === truck.toPrimitives().id);
    
    if (existingTruckIndex !== -1) {
      // Update existing truck
      this.trucks[existingTruckIndex] = truck;
    } else {
      // Add new truck
      this.trucks.push(truck);
    }
  }
}
