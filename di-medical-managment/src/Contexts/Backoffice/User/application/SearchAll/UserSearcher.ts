import { UserRepository } from "../../domain/UserRepository";

export class UserSearcher {
  constructor(
    private repository: UserRepository
  ) {}
  
  async run() {
    const users = await this.repository.findAll();

    return users;
  }
}
