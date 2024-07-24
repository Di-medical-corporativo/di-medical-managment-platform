import { IncidentDate } from "../../domain/IncidentDate";
import { IncidentFinder } from "../../domain/IncidentFinder";
import { IncidentId } from "../../domain/IncidentId";
import { TruckRepository } from "../../domain/TruckRepository";

export class TruckIncidentRemover {
  private incidentFinder: IncidentFinder;
  
  constructor(
    private repository: TruckRepository
  ) {
    this.incidentFinder = new IncidentFinder(repository);
  }

  async run(params: {
    id: IncidentId,
    finishDate: IncidentDate
  }) {
    await this.ensureIncidentExists(params.id);

    await this.repository.removeIncident(params);
  }

  async ensureIncidentExists(id: IncidentId) {
    await this.incidentFinder.run({
      id
    });
  }
}
