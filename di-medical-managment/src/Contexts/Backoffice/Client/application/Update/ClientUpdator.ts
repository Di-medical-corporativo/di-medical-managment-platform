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

    client.updateAddress(params.address);
    
    client.updateName(params.name);

    await this.repository.update(client);
  }
}
