import { Service } from 'typedi'
import { PrismaClient } from '@prisma/client'
import { Either, Left, Right } from '../../../shared/domain/Either'
import { ServerError } from '../../../shared/domain/errors/Error'
import { ResourceRepository } from '../../application/ResourceRepository'
import { Resource } from '../../domain/Resource'
import { ModelToDomainView } from './ModelToDomainView'

@Service()
export class DbResourceRepository implements ResourceRepository {
  private readonly prismaClient = new PrismaClient()

  public async createResource(resource: Resource, viewsId: string[] = []): Promise<Either<ServerError, Resource>> {
    try {
      const createdResource = await this.prismaClient.resource.create({
        data: {
          description: resource.description,
          name: resource.name,
          views: {
            create: viewsId.map(view => {
              return { view: { connect: { id: view } } }
            })
          }
        },
        include: {
          views: {
            include: {
              view: true
            }
          }
        }
      })
      const viewsModel = createdResource.views.map(v => v.view)
      const viewsToDomain = ModelToDomainView.from(viewsModel)
      resource.resourceId = createdResource.id
      resource.description = createdResource.description
      resource.name = createdResource.name
      resource.views = viewsToDomain
      return Right.create(resource)
    } catch (error) {
      console.log(error);
      return Left.create(ServerError.SERVER_ERROR)
    }
  }

  public async findResourceById(resourceId: string): Promise<Either<ServerError, Resource>> {
    try {
      const resourceById = await this.prismaClient.resource.findUnique({
        where: {
          id: resourceId
        },
        include: {
          views: {
            include: {
              view: true
            }
          }
        }
      })

      if (!resourceById) {
        return Left.create(ServerError.NOT_FOUND)
      }

      const viewsModel = resourceById.views.map(view => view.view)
      const viewsToDomain = ModelToDomainView.from(viewsModel)
      const resource = new Resource(resourceById.id, resourceById.name, resourceById.description)
      resource.views = viewsToDomain
      return Right.create(resource)

    } catch (error) {
      return Left.create(ServerError.SERVER_ERROR)
    }
  }

  public async updateResource(resource: Resource, viewsId: string[] = []): Promise<Either<ServerError, Resource>> {
    try {
      const updatedResource = await this.prismaClient.resource.update({
        data: {
          name: resource.name,
          description: resource.description,
          views:{
            create: viewsId.map(view => {
              return { view: { connect: { id: view } } }
            })
          }
        },
        where: {
          id: resource.resourceId
        },
        include: {
          views: {
            include: {
              view: true
            }
          }
        }
      })

      const viewsModel = updatedResource.views.map(view => view.view)
      const viewsToDomain = ModelToDomainView.from(viewsModel)
      resource.description = updatedResource.description
      resource.name = updatedResource.name
      resource.views = viewsToDomain
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
