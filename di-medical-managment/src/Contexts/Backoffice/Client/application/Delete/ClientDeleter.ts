import { ClientFinder } from "../../domain/ClientFinder";
import { ClientId } from "../../domain/ClientId";
import { ClientRepository } from "../../domain/ClientRepository";

export class ClientDeleter {
  private clientFinder: ClientFinder;
  
  constructor(
    private repository: ClientRepository
  ) {
    this.clientFinder = new ClientFinder(repository);
  }

  async run(params: {
    id: ClientId
  }) {
    await this.ensureClientExists(params.id);

    await this.repository.delete(params.id);
  }

  private async ensureClientExists(id: ClientId) {
    await this.clientFinder.run({
      id
    });
  }
}
