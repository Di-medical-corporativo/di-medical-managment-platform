import prisma from "../../../../Shared/infra/persistence/PrismaDbConnection";
import { Client } from "../../domain/Client";
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
}
