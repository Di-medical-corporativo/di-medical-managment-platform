import { Client } from "./Client";
import { ClientId } from "./ClientId";
import { ClientNotFound } from "./ClientNotFound";
import { ClientRepository } from "./ClientRepository";

export class ClientFinder {

  constructor(
    private repository: ClientRepository
  ) {}

  async run (params: {
    id: ClientId
  }) {
    const client = await this.repository.search(params.id);

    if(client === null) {
      throw new ClientNotFound();
    }

    return client;
  }
}
