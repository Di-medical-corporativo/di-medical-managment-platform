import { Client } from '@prisma/client'
import { Client as DomainClient } from '../../../fleet/domain/Client'

export class ModelToClientDomain {
  public static from(client: Client) {
    return new DomainClient(
      client.id,
      client.name,
      client.address,
      client.isActive
    )
  }

  public static fromClients(clientsModel: Client[]) {
    const clientsDomain = clientsModel.map((client) => {
      return new DomainClient(
        client.id,
        client.name,
        client.address,
        client.isActive
      )
    })

    return clientsDomain
  }
}
