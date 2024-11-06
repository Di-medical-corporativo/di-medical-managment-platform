import { Permit } from "./Permit";
import { PermitId } from "./PermitId";
import { PermitNotFound } from "./PermitNotFound";
import { PermitRepository } from "./PermitRepository";

export class PermitFinder {
  constructor(
    private repository: PermitRepository
  ) {}

  async run(params: {
    id: PermitId
  }): Promise<Permit> {
    const permit: Permit | null = await this.repository.find(params.id);

    if(!permit) {
      throw new PermitNotFound();
    }

    return permit;
  }
}
