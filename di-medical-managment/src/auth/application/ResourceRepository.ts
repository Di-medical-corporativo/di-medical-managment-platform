import { Either } from '../../shared/domain/Either'
import { ServerError } from '../../shared/domain/errors/Error'
import { Resource } from '../domain/Resource'
import { View } from '../domain/View'

export interface ResourceRepository {
  createResource(resource: Resource, viewsId: string[]): Promise<Either<ServerError, Resource>>
  updateResource(resource: Resource, viewsId: string[]): Promise<Either<ServerError, Resource>>
  findResourceById(resourceId: string): Promise<Either<ServerError, Resource>>
  deleteResourceById(resourceId: string): Promise<Either<ServerError, void>>
}
