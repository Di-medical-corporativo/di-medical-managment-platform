import { Either } from '../../shared/domain/Either'
import { ServerError } from '../../shared/domain/errors/Error'
import { View } from '../domain/View'

export interface ViewRepository {
  createView (
    viewName: string, 
    viewDescription: string, 
    slug: string ): Promise<Either<ServerError, View>>
  findViewBySlug (slug: string): Promise<Either<ServerError, View>>
  updateViewById (view: View): Promise<Either<ServerError, View>>
  deleteViewById (id: string): Promise<Either<ServerError, void>>
}
