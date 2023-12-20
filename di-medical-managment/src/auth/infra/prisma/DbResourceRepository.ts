import { Service } from 'typedi'
import { PrismaClient } from '@prisma/client'
import { Either, Left, Right } from '../../../shared/domain/Either'
import { ServerError } from '../../../shared/domain/errors/Error'
import { ResourceRepository } from '../../application/ResourceRepository'
import { Resource } from '../../domain/Resource'

@Service()
export class DbResourceRepository implements ResourceRepository {
  private readonly prismaClient = new PrismaClient()

  public async createResource(resource: Resource): Promise<Either<ServerError, Resource>> {
    try {
      const createdResource = await this.prismaClient.resource.create({
        data: {
          description: resource.description,
          name: resource.name
        }
      })
      resource.resourceId = createdResource.id
      resource.description = createdResource.description
      resource.name = createdResource.name
      return Right.create(resource)
    } catch (error) {
      return Left.create(ServerError.SERVER_ERROR)
    }
  }

  public async findResourceById(resourceId: string): Promise<Either<ServerError, Resource>> {
    try {
      const resourceById = await this.prismaClient.resource.findUnique({
        where: {
          id: resourceId
        }
      })

      if (!resourceById) {
        return Left.create(ServerError.NOT_FOUND)
      }

      const resource = new Resource(resourceById.id, resourceById.name, resourceById.description)
      return Right.create(resource)

    } catch (error) {
      return Left.create(ServerError.SERVER_ERROR)
    }
  }

  public async updateResource(resource: Resource): Promise<Either<ServerError, Resource>> {
    try {
      const updatedResource = await this.prismaClient.resource.update({
        data: {
          name: resource.name,
          description: resource.description
        },
        where: {
          id: resource.resourceId
        }
      })

      resource.description = updatedResource.description
      resource.name = updatedResource.name
      return Right.create(resource)
    } catch (error) {
      return Left.create(ServerError.SERVER_ERROR)
    }
  }

  public async deleteResourceById(resourceId: string): Promise<Either<ServerError, void>> {
    try {
      await this.prismaClient.resource.delete({
        where: {
          id: resourceId
        }
      })

      return Right.create(undefined)
    } catch (error) {
      return Left.create(ServerError.SERVER_ERROR)
    }
  }
}
