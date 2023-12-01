import { Inject, Service } from 'typedi'
import { Either, Left, Right } from '../../shared/domain/Either'
import { BaseError, ServerError } from '../../shared/domain/errors/Error'
import { ResourceNotFound, UnknowError } from '../domain/Errors'
import { ResourceRepository } from './ResourceRepository'
import { Resource } from '../domain/Resource'
import { CreateResourceDto } from '../infra/dto/CreateResourceDto'
import { UpdateResourceDto } from '../infra/dto/UpdateResourceDto'
import { DbResourceRepository } from '../infra/prisma/DbResourceRepository'
import { Role } from '../domain/Role'

@Service()
export class ResourceService {

  constructor (
    @Inject(() => DbResourceRepository)
    private readonly resourceRepository: ResourceRepository
  ) {}

  public async createResource (roleToCreate: CreateResourceDto): Promise<Either<BaseError, Resource>> {
    const resource = new Resource(undefined, roleToCreate.name, roleToCreate.description)
    const roleCreatedOrError: Either<ServerError, Resource> = await this.resourceRepository.createResource(
      resource,
      roleToCreate.views
    )
    if(roleCreatedOrError.isLeft()) {
      return this.unfoldError(roleCreatedOrError.error)
    }
    return roleCreatedOrError
  }

  public async updateResource (resourceId: string, resourceToUpdate: UpdateResourceDto): Promise<Either<BaseError, Resource>> {
    
    const resource: Either<BaseError, Resource> = await this.findResourceById(resourceId)
    
    if (resource.isLeft()){
      return resource
    }

    if (resourceToUpdate.name) {
      resource.value.name = resourceToUpdate.name
    }

    if (resourceToUpdate.description) {
      resource.value.description = resourceToUpdate.description
    }

    const updatedResource: Either<ServerError, Resource> = await this
      .resourceRepository
      .updateResource(resource.value, resourceToUpdate.views)

    if(updatedResource.isLeft()) {
      return this.unfoldError(updatedResource.error)
    }

    return updatedResource
  }

  public async findResourceById (resourceId: string): Promise<Either<BaseError, Resource>> {
    const resource: Either<ServerError, Resource> = await 
      this
      .resourceRepository
      .findResourceById(resourceId)

    if(resource.isLeft()) {
      return this.unfoldError(resource.error)
    }

    return resource
  }

  public async deleteResourceById (resourceId: string): Promise<Either<BaseError, void>> {
    const resource = await this.findResourceById(resourceId)
    if(resource.isLeft()) {
      return resource
    }

    const deletedResource = await this.resourceRepository.deleteResourceById(resourceId)
    if(deletedResource.isLeft()) {
      return this.unfoldError(deletedResource.error)
    }

    return Right.create(undefined)
  }

  private unfoldError (error: ServerError) {
    switch (error) {
      case ServerError.NETWORK_ERROR:
      case ServerError.SERVER_ERROR:
        return Left.create(new UnknowError())
      case ServerError.NOT_FOUND:
        return Left.create(new ResourceNotFound())
      default:
        return Left.create(new UnknowError())
    }
  }
}
