import { UserFirstName } from "../../User/domain/UserFirstName";
import { UserId } from "../../User/domain/UserId";
import { UserLastName } from "../../User/domain/UserLastName";

export class TaskUser {
  constructor(
    private id: UserId,
    private firstName: UserFirstName,
    private lastName: UserLastName
  ) {}

  static create(params: {
    id: UserId,
    firstName: UserFirstName,
    lastName: UserLastName
  }) {
    return new TaskUser(
      params.id,
      params.firstName,
      params.lastName
    );
  }

  static fromPrimitives(params: {
    id: string;
    firstName: string;
    lastName: string;
  }) {
    return new TaskUser(
      new UserId(params.id),
      new UserFirstName(params.firstName),
      new UserLastName(params.lastName)
    );
  }

  toPrimitives() {
    return {
      id: this.id.toString(),
      lastName: this.lastName.toString(),
      firstName: this.firstName.toString()
    }
  }
}
