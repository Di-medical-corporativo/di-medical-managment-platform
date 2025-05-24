import { PermitFinder } from "../../domain/PermitFinder";
import { PermitId } from "../../domain/PermitId";
import { PermitRepository } from "../../domain/PermitRepository";

export class PermitDeleter {
  private permitFinder: PermitFinder;
  
  constructor(
    private repository: PermitRepository
  ) {
    this.permitFinder = new PermitFinder(repository);
  }

  async run(params: {
    id: PermitId
  }) {
    this.ensurePermitExists(params.id);
    
    await this.repository.delete(params.id);
  }

  private async ensurePermitExists(id: PermitId) {
    await this.repository.find(id);
  }
}
