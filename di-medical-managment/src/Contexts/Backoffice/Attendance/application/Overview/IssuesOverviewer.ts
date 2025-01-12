import { UserFinder } from "../../../User/domain/UserFinder";
import { UserId } from "../../../User/domain/UserId";
import { UserRepository } from "../../../User/domain/UserRepository";
import { AttendanceRepository } from "../../domain/AttendanceRepository";

export class IssuesOverviewer {
  private userFinder: UserFinder;
  
  constructor(
    private attendanceRepository: AttendanceRepository,
    private userRepository: UserRepository
  ) {
    this.userFinder = new UserFinder(userRepository);
  }

  async run(params: {
    userId: UserId
  }) {
    await this.ensureUserExists(params.userId);

    const overview: { 
      absence: number, 
      delay: number, 
      pendingJustifications: number, 
      rejectedJustifications: number, 
      approvedJustifications: number  
    } = await this.attendanceRepository.overview(params.userId);

    return overview;
  }

  private async ensureUserExists(userId: UserId) {
    await this.userFinder.run(userId.toString());
  }
}
