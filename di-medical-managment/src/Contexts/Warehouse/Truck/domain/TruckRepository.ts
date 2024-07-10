import { Truck } from "./Truck";

export interface TruckRepository {
  save(truck: Truck): Promise<void>
}
