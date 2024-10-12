import { UserEmail } from "../../Backoffice/User/domain/UserEmail";
import { UserFirstName } from "../../Backoffice/User/domain/UserFirstName";
import { UserId } from "../../Backoffice/User/domain/UserId";
import { UserJob } from "../../Backoffice/User/domain/UserJob";
import { UserLastName } from "../../Backoffice/User/domain/UserLastName";
import { UserPassword } from "../../Backoffice/User/domain/UserPassword";
import bcrypt from "bcrypt";

export class UserAuthenticated {
  constructor(
    private id: UserId,
    private email: UserEmail,
    private firstName: UserFirstName,
    private lastName: UserLastName,
    private password: UserPassword,
    private job: UserJob
  ) {}

  public isPasswordCorrect(passwordToCompare: string) {
    const password = this.password.toPrimitives();
    
    const validCredentials: boolean = bcrypt.compareSync(
      passwordToCompare,
      password.hash
    );

    return validCredentials;
  }

  static create(params: {
    id: UserId,
    email: UserEmail,
    firstName: UserFirstName,
    lastName: UserLastName,
    password: UserPassword,
    job: UserJob
  }) {
    return new UserAuthenticated(
      params.id,
      params.email,
      params.firstName,
      params.lastName,
      params.password,
      params.job
    );
  }

  static fromPrimitives(params: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    password: {
      hash: string;
      salt: string
    };
    job: string;
  }) {
    return new UserAuthenticated(
      new UserId(params.id),
      new UserEmail(params.email),
      new UserFirstName(params.firstName),
      new UserLastName(params.lastName),
      new UserPassword(
        params.password.hash,
        params.password.salt
      ),
      new UserJob(params.job)
    );
  }

  toPrimitives() {
    return {
      id: this.id.toString(),
      email: this.email.toString(),
      firstName: this.firstName.toString(),
      lastName: this.lastName.toString(),
      password: this.password.toPrimitives(),
      job: this.job.toString()
    }
  }
}
