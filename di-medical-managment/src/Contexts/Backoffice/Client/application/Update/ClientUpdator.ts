import { ClientAddress } from "../../domain/ClientAddress";
import { ClientFinder } from "../../domain/ClientFinder";
import { ClientId } from "../../domain/ClientId";
import { ClientName } from "../../domain/ClientName";
import { ClientRepository } from "../../domain/ClientRepository";

export class ClientUpdator {
  private clientFinder: ClientFinder;

  constructor(
    private repository: ClientRepository
  ) {
    this.clientFinder = new ClientFinder(this.repository);
  }

  async run(params: {
    id: ClientId;
    name: ClientName;
    address: ClientAddress
  }) {
    const client = await this.clientFinder.run({ id: params.id });

    client.updateAddress(params.name);
    
    client.updateAddress(params.address);

    await this.repository.update(client);
  }
}
