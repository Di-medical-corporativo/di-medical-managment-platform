import { Incident } from "./Incident";
import { Truck } from "./Truck";

export interface TruckRepository {
  save(truck: Truck): Promise<void>
  search(term: string): Promise<Truck | null>
  update(truck: Truck): Promise<void>
  saveIncident(incident: Incident): Promise<void>
}
