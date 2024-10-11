import { UserEmail } from "../../../Backoffice/User/domain/UserEmail";
import { UserNotFound } from "../../../Backoffice/User/domain/UserNotFound";
import { UserRepository } from "../../../Backoffice/User/domain/UserRepository";
import { InvalidCredentials } from "../../domain/InvalidCredentials";
import { UserAuthenticated } from "../../domain/UserAuthenticated";

export class AuthenticateUser {
  constructor(
    private userRepository: UserRepository
  ) {}

  async run(params: {
    email: UserEmail,
    password: string
  }): Promise<UserAuthenticated> {
    const user = await this.userRepository.findByEmail(params.email);

    if(!user) {
      throw new UserNotFound();
    }

    const validCredentials = user.isPasswordCorrect(params.password);

    if(!validCredentials) {
      throw new InvalidCredentials();
    }

    console.log(user);

    return user;
  }
}
