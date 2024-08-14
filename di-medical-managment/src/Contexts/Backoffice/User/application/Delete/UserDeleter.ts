import { UserFinder } from "../../domain/UserFinder";
import { UserId } from "../../domain/UserId";
import { UserRepository } from "../../domain/UserRepository";

export class UserDeleter {
  private userFinder: UserFinder;

  constructor(
    private repository: UserRepository
  ) {
    this.userFinder = new UserFinder(repository);
  }

  async run(params: {
    id: UserId
  }) {
    await this.ensureUserExits(params.id);

    await this.repository.delete(params.id);
  }

  private async ensureUserExits(id: UserId) {
    await this.userFinder.run(id.toString());
  }
}
