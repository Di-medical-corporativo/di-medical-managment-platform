import { PrismaClient } from '@prisma/client'
import { Either, Left, Right } from '../../../shared/domain/Either'
import { ServerError } from '../../../shared/domain/errors/Error'
import { ClientRepository } from '../../application/ClientRepository'
import { Client } from '../../domain/Client'
import { Service } from 'typedi'

@Service()
export class DbClientRepository implements ClientRepository {
  private readonly prismaClient = new PrismaClient()

  async createClient(client: Client): Promise<Either<ServerError, Client>> {
    try {
      const clientCreated = await this.prismaClient.client.create({
        data: {
          address: client.address,
          name: client.name,
          isActive: true
        }
      })
      
      client.clientId = clientCreated.id
      return Right.create(client)
    } catch (error) {
      return Left.create(ServerError.SERVER_ERROR)
    }
  }

  async getClientById(clientId: string): Promise<Either<ServerError, Client>> {
    try {
      const client = await this.prismaClient.client.findFirst({
        where: {
          id: clientId
        }
      })

      if(!client) {
        return Left.create(ServerError.NOT_FOUND)
      }

      const clientDomain = new Client(
        client.id,
        client.name,
        client.address,
        client.isActive
      )
      return Right.create(clientDomain)
    } catch (error) {
      return Left.create(ServerError.SERVER_ERROR)
    }
  }

  async updateClientById(client: Client): Promise<Either<ServerError, Client>> {
    try {
      await this.prismaClient.client.update({
        where: {
          id: client.clientId!
        },
        data: {
          address: client.address,
          name: client.name
        }
      })

      return Right.create(client)
    } catch (error) {
      return Left.create(ServerError.SERVER_ERROR)
    }
  }

  async deleteClientById(clientId: string): Promise<Either<ServerError, void>> {
    try {
      await this.prismaClient.client.update({
        where: {
          id: clientId
        },
        data: {
          isActive: false
        }
      })
      return Right.create(undefined)
    } catch (error) {
      return Left.create(ServerError.SERVER_ERROR)
    }
  }
}
