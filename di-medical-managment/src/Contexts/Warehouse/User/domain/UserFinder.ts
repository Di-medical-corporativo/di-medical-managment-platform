import { UserNotFound } from "./UserNotFound";
import { UserRepository } from "./UserRepository";

export class UserFinder {
  constructor(
    private userRepository: UserRepository
  ) {}

  async run(term: string) {
    const user = await this.userRepository.search(term);

    if(!user) {
      throw new UserNotFound();
    }

    return user;
  }
}
