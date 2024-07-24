import { Client } from "./Client";
import { ClientId } from "./ClientId";

export interface ClientRepository {
  save(client: Client): Promise<void>
  search(term: ClientId): Promise<Client | null>
  update(client: Client): Promise<void>
  findAll(): Promise<Client[]>
}
