import { ClientRepository } from "../../domain/ClientRepository";

export class ClientSearcher {
  constructor(
    private repository: ClientRepository
  ) {}

  async run() {
    const clients = await this.repository.findAll();

    return clients;
  }
}
