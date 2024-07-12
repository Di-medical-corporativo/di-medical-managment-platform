import { Incident } from "../../domain/Incident";
import { IncidentDate } from "../../domain/IncidentDate";
import { IncidentDescription } from "../../domain/IncidentDescription";
import { IncidentId } from "../../domain/IncidentId";
import { TruckFinder } from "../../domain/TruckFinder";
import { TruckId } from "../../domain/TruckId";
import { TruckRepository } from "../../domain/TruckRepository";

export class TruckIncidentAdder {
  private truckFinder: TruckFinder;
  constructor(
    private repository: TruckRepository
  ) {
    this.truckFinder = new TruckFinder(this.repository);
  }

  async run(params: {
    id: IncidentId,
    description: IncidentDescription,
    startDate: IncidentDate,
    truckId: TruckId
  }) {

    await this.ensureTruckExists(params.truckId);
    
    const incident = Incident.create(params);

    await this.repository.saveIncident(incident);
  }

  private async ensureTruckExists(truckId: TruckId) {
    await this.truckFinder.run({ id: truckId });
  }
}
