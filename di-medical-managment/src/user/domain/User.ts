import { UserDate } from "./UserDate";
import { UserEmail } from "./UserEmail";
import { UserFirstName } from "./UserFirstName";
import { UserId } from "./UserId";
import { UserIsAdmin } from "./UserIsAdmin";
import { UserJob } from "./UserJob";
import { UserLastName } from "./UserLastName";
import { UserPhone } from "./UserPhone";

export class User {
  constructor(
    private id: UserId,
    private firstName: UserFirstName,
    private lastName: UserLastName,
    private job: UserJob,
    private phone: UserPhone,
    private email: UserEmail,
    private isAdmin: UserIsAdmin,
    private createdAt: UserDate
  ) {}

  static create(data: {
    id: UserId,
    firstName: UserFirstName,
    lastName: UserLastName,
    job: UserJob,
    phone: UserPhone,
    email: UserEmail,
    isAdmin: UserIsAdmin,
    createdAt: UserDate
  }) {
    return new User(
      data.id,
      data.firstName,
      data.lastName,
      data.job,
      data.phone,
      data.email,
      data.isAdmin,
      data.createdAt
    );
  }

  public static fromPrimitives(data: {
    id: string;
    firstName: string;
    lastName: string;
    job: string;
    phone: string;
    email: string;
    isAdmin: boolean;
    createdAt: string;
  }) {
    return new User(
      new UserId(data.id),
      new UserFirstName(data.firstName),
      new UserLastName(data.lastName),
      new UserJob(data.job),
      new UserPhone(data.phone),
      new UserEmail(data.email),
      new UserIsAdmin(data.isAdmin),
      new UserDate(data.createdAt)
    )
  }

  public toPrimitives() {
    return {
      id: this.id.toString(),
      firstName: this.firstName.toString(),
      lastName: this.lastName.toString(),
      job: this.job.toString(),
      phone: this.phone.toString(),
      email: this.email.toString(),
      isAdmin: this.isAdmin.value,
      createdAt: this.createdAt.toString()
    }
  }
}
