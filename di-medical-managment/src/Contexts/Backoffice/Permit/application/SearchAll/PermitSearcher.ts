import { Permit } from "../../domain/Permit";
import { PermitRepository } from "../../domain/PermitRepository";

export class PermitSearcher {
  constructor(
    private repository: PermitRepository
  ) {}

  async run(params: {
    month: number;
    year: number;
  }) {
    const permits: Permit[] = await this.repository.findAll(
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
