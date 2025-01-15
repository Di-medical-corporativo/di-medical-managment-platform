import { UserEmail } from "../../Backoffice/User/domain/UserEmail";
import { UserNotFound } from "../../Backoffice/User/domain/UserNotFound";
import { UserRepository } from "../../Backoffice/User/domain/UserRepository";
import { UserAuthenticated } from "./UserAuthenticated";

export class AuthenticatedUserFinder {
  constructor(
    private repository: UserRepository
  ) {}

  async run(params: {
    email: UserEmail
  }): Promise<UserAuthenticated> {
    const user = await this.repository.findByEmail(params.email);
    console.log(user);

    if(!user) {
      throw new UserNotFound();
    }

    return user;
  }
}
