import { Client } from "../../domain/Client";
import { ClientId } from "../../domain/ClientId";
import { ClientRepository } from "../../domain/ClientRepository";

export class FakeClientRepository implements ClientRepository {
  private clients: Client[] = [];

  async save(client: Client): Promise<void> {
    this.clients.push(client);
  }

  async search(term: ClientId): Promise<Client | null> {
    const client = this.clients.find(c => c.toPrimitives().id.toString() === term.toString());
    return client || null;
  }

  async update(client: Client): Promise<void> {
    const index = this.clients.findIndex(c => c.toPrimitives().id.toString() == client.toPrimitives().id);
    if (index !== -1) {
      this.clients[index] = client;
    } else {
      throw new Error('Client not found');
    }
  }

  async findAll(): Promise<Client[]> {
    return this.clients;
  }
}
