import { PrismaClient } from '@prisma/client'
import { Either, Left, Right } from '../../../shared/domain/Either'
import { ServerError } from '../../../shared/domain/errors/Error'
import { ClientRepository } from '../../application/ClientRepository'
import { Client } from '../../domain/Client'
import { Service } from 'typedi'
import { ModelToDomainPoint } from './ModelToDomainPoint'
import { PaginatedResult } from '../../../shared/domain/PaginatedResult'
import { ModelToClientDomain } from '../../../shared/infra/prisma/ModelToClientDomain'

@Service()
export class DbClientRepository implements ClientRepository {
  private readonly prismaClient = new PrismaClient()
  private pageSize: number = 10
  async getClientsPaginated(page: number): Promise<Either<ServerError, PaginatedResult<Client>>> {
    try {
      const [ clients, total ] = await Promise.all([
        this.prismaClient.client.findMany({
          skip: (page - 1) * 10,
          take: this.pageSize
        }),
        this.prismaClient.client.count()
      ])

      const totalPages = Math.ceil(total / this.pageSize)

      if(page > totalPages) {
        return Left.create(ServerError.NOT_FOUND)
      }

      const clientsDomain = ModelToClientDomain.fromClients(clients)
      const pagination = new PaginatedResult<Client>(
        clientsDomain,
        totalPages
      )

      return Right.create(pagination)
    } catch (error) {
      return Left.create(ServerError.SERVER_ERROR)
    }
  }

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
        },
        include: {
          points: {
            include: {
              client: true,
              invoices: true,
              truck: true,
              user: true
            },
            take: 5,
            orderBy: {
              itinerary: {
                createdAt: 'desc'
              }
            }
          }
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
      const points = ModelToDomainPoint.fromPoints(client.points)
      clientDomain.points = points
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
