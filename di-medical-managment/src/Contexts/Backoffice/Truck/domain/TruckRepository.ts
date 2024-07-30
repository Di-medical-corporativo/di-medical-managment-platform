import { Incident } from "./Incident";
import { IncidentDate } from "./IncidentDate";
import { IncidentId } from "./IncidentId";
import { Truck } from "./Truck";

export interface TruckRepository {
  save(truck: Truck): Promise<void>
  
  searchIncident(id: IncidentId): Promise<Incident | null>

  search(term: string): Promise<Truck | null>

  update(truck: Truck): Promise<void>
  
  saveIncident(incident: Incident): Promise<void>
  
  removeIncident(data: { id: IncidentId, finishDate: IncidentDate }): Promise<void>

  findAll(): Promise<Truck[]>
}
