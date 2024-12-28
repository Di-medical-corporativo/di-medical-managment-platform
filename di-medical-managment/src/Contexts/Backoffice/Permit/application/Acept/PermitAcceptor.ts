import { UserId } from "../../../User/domain/UserId";
import { PermitAdminComment } from "../../domain/PermitComment";
import { PermitFinder } from "../../domain/PermitFinder";
import { PermitId } from "../../domain/PermitId";
import { PermitRepository } from "../../domain/PermitRepository";
import { PermitStatusList } from "../../domain/PermitStatus";

export class PermitAcceptor {
  private permitFinder: PermitFinder;
  
  constructor(
    private repository: PermitRepository
  ) {
    this.permitFinder = new PermitFinder(repository);
  }

  async run(params: {
    id: PermitId,
    comment: PermitAdminComment,
    action: PermitStatusList,
    decitionTakenBy: UserId
  }) {
    await this.ensurePermitExists(params.id);
    
    await this.repository.action(
      params.id,
      params.comment,
      params.action,
      params.decitionTakenBy
    );
  }

  async ensurePermitExists(permitId: PermitId) {
    await this.permitFinder.run({
      id: permitId
    });
  }
}
