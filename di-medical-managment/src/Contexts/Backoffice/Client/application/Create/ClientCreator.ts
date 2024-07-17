import { Client } from "../../domain/Client";
import { ClientAddress } from "../../domain/ClientAddress";
import { ClientId } from "../../domain/ClientId";
import { ClientName } from "../../domain/ClientName";
import { ClientRepository } from "../../domain/ClientRepository";

export class ClientCreator {
  constructor(
    private repository: ClientRepository
  ) {}

  async run(params: {
    id: ClientId,
    name: ClientName,
    address: ClientAddress
  }) {
    const client = Client.create(params);

    await this.repository.save(client);
  }
}
