import { UserFinder } from "../../../User/domain/UserFinder";
import { UserId } from "../../../User/domain/UserId";
import { UserRepository } from "../../../User/domain/UserRepository";
import { AttendanceIssue } from "../../domain/AttendanceIssue";
import { AttendanceRepository } from "../../domain/AttendanceRepository";

export class IssueSearcher {
  private userFinder: UserFinder;

  constructor(
    private repository: AttendanceRepository,
    private userRepository: UserRepository
  ) {
    this.userFinder = new UserFinder(userRepository);
  }

  async run(params: {
    userId: UserId
  }) {
    await this.ensureUserExists(params.userId);

    const issues: AttendanceIssue[] = await this.repository.findAll(params.userId);

    return issues;
  }

  private async ensureUserExists(id: UserId) {
    await this.userFinder.run(id.toString());
  }
}
