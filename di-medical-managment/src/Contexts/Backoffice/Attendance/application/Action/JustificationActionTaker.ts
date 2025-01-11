import { UserFinder } from "../../../User/domain/UserFinder";
import { UserId } from "../../../User/domain/UserId";
import { UserRepository } from "../../../User/domain/UserRepository";
import { AttendanceRepository } from "../../domain/AttendanceRepository";
import { JustificationId } from "../../domain/JustificationId";
import { JustificationStatus } from "../../domain/JustificationStatus";
import { JustificationFinder } from "../FindJustification/JustificationFinder";

export class JustificationActionTaker {
  private justificationFinder: JustificationFinder;

  private userFinder: UserFinder;
  constructor(
    private repository: AttendanceRepository,
    private userRepository: UserRepository
  ) {
    this.justificationFinder = new JustificationFinder(repository);
  
    this.userFinder = new UserFinder(userRepository);
  }

  async run(params: {
    justificantId: JustificationId,
    action: JustificationStatus,
    approverId: UserId
  }) {
    await this.ensureJustificationExists(params.justificantId);

    await this.repository.changeStatus(params.justificantId, params.action, params.approverId);
  }

  private async ensureJustificationExists(id: JustificationId) {
    await this.justificationFinder.run({
      justificationId: id
    });
  }
}
