import { UserFinder } from "../../domain/UserFinder";
import { UserId } from "../../domain/UserId";
import { UserRepository } from "../../domain/UserRepository";

export class UserOverviewer {
  private userFinder: UserFinder;
  
  constructor(
    private userRepository: UserRepository
  ) {
    this.userFinder = new UserFinder(userRepository);
  }

  async run(params: {
    userId: UserId
  }) {
    await this.ensureUserExists(params.userId);

    const overview: {
      delayCount: number;
      absenceCount: number;
      assignedTasksCount: number;
      inProgressTaskCount: number;
      finishedTasksCount: number;
      dueTasksCount: number;
      pendingPermitCount: number;
      approvedPermitCount: number;
      rejectedPermitCount: number;
    } = await this.userRepository.overview(params.userId);

    return overview;
  }

  private async ensureUserExists(id: UserId) {
    await this.userFinder.run(id.toString());
  }
}
