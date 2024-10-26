import { PermitWithNoDecision } from "../../domain/Permit";
import { PermitDate } from "../../domain/PermitDate";
import { PermitId } from "../../domain/PermitId";
import { PermitReason } from "../../domain/PermitReason";
import { PermitRepository } from "../../domain/PermitRepository";
import { PermitType } from "../../domain/PermitType";
import { PermitUser } from "../../domain/PermitUser";

export class PermitCreator {
  constructor(
    private repository: PermitRepository
  ) {}

  async run(params: {
    id: PermitId,
    reason: PermitReason,
    type: PermitType,
    user: PermitUser,
    createdAt: PermitDate
  }) {
    const permit: PermitWithNoDecision = PermitWithNoDecision.create({
      id: params.id,
      createdAt: params.createdAt,
      reason: params.reason,
      type: params.type,
      user: params.user
    });

    await this.repository.save(permit);
  }
}
