import { Service } from 'typedi'
import { RoleRepository } from '../../application/RoleRepository'
import { Role } from '../../domain/Role'
import { PrismaClient } from '@prisma/client'
import { Either, Left, Right } from '../../../shared/domain/Either'
import { ServerError } from '../../../shared/domain/errors/Error'
import { ModelToDomainResource } from './ModelToDomainResource'

@Service()
export class DbRoleRepository implements RoleRepository {
  private readonly prismaClient = new PrismaClient()

  public async createRole (role: Role, resourcesId: string[] = []): Promise<Either<ServerError, Role>> {
    try {
      const createdRole = await this.prismaClient.role.create({
        data: {
          name: role.name,
          description: role.description,
          resources: {
            create: resourcesId.map(resource => {
              return { resource: { connect: { id: resource } } }
            })
          }
        },
        include: {
          resources: {
            include: {
              resource: true
            }
          }
        }
      })
      const resourcesModel = createdRole.resources.map(r => r.resource)
      const resourcesToDomain = ModelToDomainResource.from(resourcesModel)
      role.resources = resourcesToDomain
      role.description = createdRole.description
      role.roleId = createdRole.id
      role.name = createdRole.name
      
      return Right.create(role)
    } catch (error) {
      return Left.create(ServerError.SERVER_ERROR)
    }
  }

  public async updateRole (role: Role, resourcesId: string[] = []): Promise<Either<ServerError, Role>> {
    try {
      const updatedRole = await this.prismaClient.role.update({
        where: {
          id: role.roleId
        },
        data: {
          name: role.name,
          description: role.description,
          resources: {
            create: resourcesId.map(resource => {
              return { resource: { connect: { id: resource } } }
            })
          }
        },
        include: {
          resources: {
            include: {
              resource: true
            }
          }
        }
      })

      const resourcesModel = updatedRole.resources.map(r => r.resource)
      const resourcesToDomain = ModelToDomainResource.from(resourcesModel)
      role.resources = resourcesToDomain
      role.description = updatedRole.description
      role.roleId = updatedRole.id
      role.name = updatedRole.name

      return Right.create(role)

    } catch (error) {
      return Left.create(ServerError.SERVER_ERROR)
    }
  }

  public async findOneById (roleId: string): Promise<Either<ServerError, Role>> {
    try {
      const roleById = await this.prismaClient.role.findFirst({
        where: {
          id: roleId
        },
        include: {
          resources: {
            include: {
              resource: true
            }
          }
        }
      })

      if(!roleById) return Left.create(ServerError.NOT_FOUND)

      const role = new Role(roleById.id, roleById.name, roleById.description)
      const resourcesModel = roleById.resources.map(r => r.resource)
      const resourcesToDomain = ModelToDomainResource.from(resourcesModel)
      role.resources = resourcesToDomain
      return Right.create(role)

    } catch (error) {
      return Left.create(ServerError.SERVER_ERROR)
    }
  }

  public async deleteRoleById (roleId: string): Promise<Either<ServerError, string>> {
    try {
      await this.prismaClient.role.delete({
        where: {
          id: roleId
        }
      })

      return Right.create(roleId)
    } catch (error) {
      return Left.create(ServerError.SERVER_ERROR)
    }
  }
}
