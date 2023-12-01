import { Service } from 'typedi'
import { ViewRepository } from '../../application/ViewRepository'
import { PrismaClient } from '@prisma/client'
import { Either, Left, Right } from '../../../shared/domain/Either'
import { ServerError } from '../../../shared/domain/errors/Error'
import { View } from '../../domain/View'

@Service()
export class DbViewRepository implements ViewRepository {
  private readonly prismaClient = new PrismaClient()

  public async createView (viewName: string, viewDescription: string, slug: string ): Promise<Either<ServerError, View>> {
    try {
      const createdView = await this.prismaClient.view.create({
        data: {
          description: viewDescription,
          name: viewName,
          slug
        }
      })
      return Right.create(new View(
        createdView.id, 
        createdView.name, 
        createdView.slug, 
        createdView.description
      ))
    } catch (error) {
      return Left.create(ServerError.SERVER_ERROR)
    }
  }

  public async findViewBySlug (slug: string): Promise<Either<ServerError, View>> {
    try {
      const viewBySlug = await this.prismaClient.view.findFirst({
        where: {
          OR: [
            {
              slug
            },
            {
              id: slug
            }
          ],
        }
      })

      if(!viewBySlug) {
        return Left.create(ServerError.NOT_FOUND)
      }

      return Right.create(new View(viewBySlug.id, viewBySlug.name, viewBySlug.slug, viewBySlug.description))

    } catch (error) {
      return Left.create(ServerError.SERVER_ERROR)
    }
  }

  public async updateViewById(view: View): Promise<Either<ServerError, View>> {
    try {
      const updatedView = await this.prismaClient.view.update({
        data: {
          name: view.name,
          description: view.description
        },
        where: {
          id: view.viewId
        }
      })

      return Right.create(new View(
        updatedView.id, 
        updatedView.name, 
        updatedView.slug, 
        updatedView.description
      ))
    } catch (error) {
      return Left.create(ServerError.SERVER_ERROR)
    }
  }

  public async deleteViewById(id: string): Promise<Either<ServerError, void>> {
    try {
      await this.prismaClient.view.delete({
        where: {
          id
        }
      })
      
      return Right.create(undefined)
    } catch (error) {
      return Left.create(ServerError.SERVER_ERROR)
    }
  }
}
