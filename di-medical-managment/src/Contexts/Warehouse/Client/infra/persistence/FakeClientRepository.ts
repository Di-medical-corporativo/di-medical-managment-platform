import { Client } from "../../domain/Client";
import { ClientRepository } from "../../domain/ClientRepository";

export class FakeClientRepository implements ClientRepository {
  private clients: Client[] = [];

  async save(client: Client): Promise<void> {
    this.clients.push(client);
  }
}
