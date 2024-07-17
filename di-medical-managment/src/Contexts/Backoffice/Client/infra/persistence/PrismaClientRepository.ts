import prisma from "../../../../Shared/infra/persistence/PrismaDbConnection";
import { Client } from "../../domain/Client";
import { ClientId } from "../../domain/ClientId";
import { ClientRepository } from "../../domain/ClientRepository";

export class PrismaClientRepository implements ClientRepository {
  async save(client: Client): Promise<void> {
    const clientPlain = client.toPrimitives();
    
    await prisma.client.create({
      data: {
        id: clientPlain.id,
        address: clientPlain.address,
        name: clientPlain.name,
        isActive: clientPlain.isActive        
      }
    });
  }

  async search(term: ClientId): Promise<Client | null> {
    const clientDB = await prisma.client.findFirst({
      where: {
        id: term.toString()
      }
    });

    if(clientDB === null) {
      return null
    }

    const client = Client.fromPrimitives({
      id: clientDB.id,
      address: clientDB.address,
      isActive: clientDB.isActive,
      name: clientDB.name
    });

    return client;
  }

  async update(client: Client): Promise<void> {
    const clientPlain = client.toPrimitives();

    await prisma.client.update({
      where: {
        id: clientPlain.id
      },
      data: {
        address: clientPlain.address,
        name: clientPlain.name
      }
    });
  }
}
