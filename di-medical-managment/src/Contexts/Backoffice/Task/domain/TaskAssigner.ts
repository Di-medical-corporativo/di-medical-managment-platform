import { UserFirstName } from "../../User/domain/UserFirstName";
import { UserId } from "../../User/domain/UserId";
import { UserLastName } from "../../User/domain/UserLastName";

export class TaskAssiger {
  constructor(
    public id: UserId,
    public firstName: UserFirstName,
    public lastName: UserLastName
  ) {}

  toPrimitives() {
    return {
      id: this.id.toString(),
      firstName: this.firstName.toString(),
      lastName: this.lastName.toString()
    }
  }
}
