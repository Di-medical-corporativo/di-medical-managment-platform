import { TruckId } from "../../domain/TruckId";
import { TruckRepository } from "../../domain/TruckRepository";

export class IncidentSearcher {
  constructor(
    private repository: TruckRepository
  ) {}

  async run (params: {
    truckId: TruckId
  }) {
    const incidents = await this.repository.findAllIncidents(params.truckId);

    return incidents;
  }
}
