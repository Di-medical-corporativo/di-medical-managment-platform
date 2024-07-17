import { IncidentId } from "./IncidentId";
import { IncidentNotFound } from "./IncidentNotFound";
import { TruckRepository } from "./TruckRepository";

export class IncidentFinder {
  constructor(
    private repository: TruckRepository
  ) {}

  async run(params: {
    id: IncidentId
  }) {
    const incident = await  this.repository.searchIncident(params.id);

    if(incident === null) {
      throw new IncidentNotFound();
    }

    return incident;
  }
}
