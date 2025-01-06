import { UserFirstName } from "../../User/domain/UserFirstName";
import { UserId } from "../../User/domain/UserId";
import { UserJob } from "../../User/domain/UserJob";
import { UserLastName } from "../../User/domain/UserLastName";

export class AttendanceUser {
  constructor(
    private id: UserId,
    private firstName: UserFirstName,
    private lastName: UserLastName,
    private job: UserJob
  ) {}

  static create(params: {
    id: UserId,
    firstName: UserFirstName,
    lastName: UserLastName,
    job: UserJob
  }) {
    return new AttendanceUser(
      params.id,
      params.firstName,
      params.lastName,
      params.job
    );
  }

  static fromPrimitives(params: {
    id: string;
    firstName: string;
    lastName: string;
    job: string;
  }) {
    return new AttendanceUser(
      new UserId(params.id),
      new UserFirstName(params.firstName),
      new UserLastName(params.lastName),
      new UserJob(params.job)
    );
  }

  public toPrimitives() {
    return {
      id: this.id.toString(),
      firstName: this.firstName.toString(),
      lastName: this.lastName.toString(),
      job: this.job.toString()
    }
  }
}
