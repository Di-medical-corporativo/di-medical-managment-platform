
import { Inject, Service } from 'typedi'
import { Either, Left, Right } from '../../shared/domain/Either'
import { BaseError, ServerError } from '../../shared/domain/errors/Error'
import { DbViewRepository } from '../infra/prisma/DbViewRespository'
import { ViewRepository } from './ViewRepository'
import { CreateViewDto } from '../infra/dto/CreateViewDto'
import { View } from '../domain/View'
import { UnknowError, ViewExists, ViewNotFound } from '../domain/Errors'
import { UpdateViewDto } from '../infra/dto/UpdateViewDto'

@Service()
export class ViewService {

  constructor (
    @Inject(() => DbViewRepository)
    private readonly viewRepository: ViewRepository
  ) {}

  public async createView (roleToCreate: CreateViewDto): Promise<Either<BaseError, View>> {

    const viewExists = await this.findViewBySlug(roleToCreate.slug)

    if(viewExists.isRight()) {
      return Left.create(new ViewExists())
    }

    const viewCreatedOrError: Either<ServerError, View> = await this
    .viewRepository
    .createView(
      roleToCreate.name, 
      roleToCreate.description,
      roleToCreate.slug
    )

    if(viewCreatedOrError.isLeft()) {
      return this.unfoldError(viewCreatedOrError.error)
    }
    return viewCreatedOrError
  }

  public async findViewBySlug (slug: string): Promise<Either<BaseError, View>> {
    const viewBySlugOrError = await this.viewRepository.findViewBySlug(slug)

    if(viewBySlugOrError.isLeft()) {
      return this.unfoldError(viewBySlugOrError.error)
    }
  
    return viewBySlugOrError
  }

  public async updateViewById (
    viewId: string, 
    viewToUpdate: UpdateViewDto
    ): Promise<Either<BaseError, View>> {
    const view = await this.findViewBySlug(viewId)
    if(view.isLeft()) {
      return view
    }

    if(viewToUpdate.name) {
      view.value.name = viewToUpdate.name
    }

    if(viewToUpdate.description) {
      view.value.description = viewToUpdate.description
    }

    const updatedView = await this.viewRepository.updateViewById(view.value)

    if (updatedView.isLeft()) {
      return this.unfoldError(updatedView.error)
    }

    return updatedView
  }

  public async deleteViewById (viewId: string): Promise<Either<BaseError, void>> {
    const view = await this.findViewBySlug(viewId)
    if(view.isLeft()){
      return view
    }

    const deleted = await this.viewRepository.deleteViewById(view.value.viewId)
    if(deleted.isLeft()) {
      return this.unfoldError(deleted.error)
    }

    return Right.create(undefined)
  }
  
  private unfoldError (error: ServerError) {
    switch (error) {
      case ServerError.NETWORK_ERROR:
      case ServerError.SERVER_ERROR:
        return Left.create(new UnknowError())
      case ServerError.NOT_FOUND:
        return Left.create(new ViewNotFound())
      default:
        return Left.create(new UnknowError())
    }
  }
}
