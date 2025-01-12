import { User } from "../../../User/domain/User";
import { UserFinder } from "../../../User/domain/UserFinder";
import { UserId } from "../../../User/domain/UserId";
import { UserRepository } from "../../../User/domain/UserRepository";
import { AttendanceDate } from "../../domain/AttendanceDate";
import { AttendanceId } from "../../domain/AttendanceId";
import { AttendanceUnjustified } from "../../domain/AttendanceIssue";
import { AttendanceRepository } from "../../domain/AttendanceRepository";
import { AttendanceType } from "../../domain/AttendanceType";
import { AttendanceUser } from "../../domain/AttendanceUser";

export class IssueCreator {
  private userFinder: UserFinder;

  constructor(
    private repository: AttendanceRepository,
    private userRepository: UserRepository
  ) {
    this.userFinder = new UserFinder(userRepository);
  }

  async run(params: {
    id: AttendanceId,
    type: AttendanceType,
    date: AttendanceDate,
    issueUser: UserId
  }) {

    const user: User = await this.userFinder.run(params.issueUser.toString());

    const issueUser: AttendanceUser = user.getIssueUser();

    const issue: AttendanceUnjustified = AttendanceUnjustified.create({
      date: params.date,
      id: params.id,
      issueUser,
      type: params.type
    });

    await this.repository.saveIssue(issue);
  }
}
