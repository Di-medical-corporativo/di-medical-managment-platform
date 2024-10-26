import { UserId } from "../../../User/domain/UserId";
import { Permit } from "../../domain/Permit";
import { PermitRepository } from "../../domain/PermitRepository";

export class UserPermitsFinder {
  constructor(
    private repository: PermitRepository
  ) {}

  async run(params: {
    month: number;
    year: number;
    id: UserId
  }): Promise<{
    pending: Permit[];
    approved: Permit[];
    rejected: Permit[]  
  }>
  {
    const permits: Permit[] = await this.repository.findByUser(
      params.id,
      params.month,
      params.year
    );

    const pendingPermits = permits.filter(p => p.isPending());

    const approvedPermits = permits.filter(p => p.isApproved());

    const rejectedPermits = permits.filter(p => p.isRejected());

    return {
      pending: pendingPermits,
      approved: approvedPermits,
      rejected: rejectedPermits
    };
  }
}
