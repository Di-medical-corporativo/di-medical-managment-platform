import { PrismaClient } from '@prisma/client'
import { Service } from 'typedi'
import { UserRepository } from '../../application/UserRepository'
import { Either, Left, Right } from '../../domain/Either'
import { User } from '../../domain/User'
import { ServerError } from '../../domain/errors/Error'
import { ModelToDomainSucursal } from './ModelToSucursalDomain'
import { ModelToDomainLogin } from '../../../auth/infra/prisma/ModelToDomainLogin'
import { ModelToDomainRole } from '../../../auth/infra/prisma/ModelToDomainRole'
import { ModelToUserDomain } from './ModelToUserDomain'
import { PaginatedResult } from '../../domain/PaginatedResult'

@Service()
export class DbUserRepository implements UserRepository {
  private readonly prismaClient = new PrismaClient()
  private pageSize: number = 10
  constructor() {}
  
  async getUsersPaginated(page: number): Promise<Either<ServerError, PaginatedResult<User>>> {
    try {
      const [ users, total ] = await Promise.all([
        this.prismaClient.user.findMany({
          skip: (page - 1) * 10,
          take: this.pageSize
        }),
        this.prismaClient.user.count()
      ])

      const totalPages = Math.ceil(total / this.pageSize)

      if(page > totalPages) {
        return Left.create(ServerError.NOT_FOUND)
      }

      const usersDomain = ModelToUserDomain.fromUsers(users)
      const pagination = new PaginatedResult<User>(
        usersDomain,
        totalPages
      )
      return Right.create(pagination)
    } catch (error) {
      return Left.create(ServerError.SERVER_ERROR)
    }
  }

  public async createUser(
    user: User,
    passwordHashed: { hash: string, salt: string },
    roles: string[]
  ): Promise<Either<ServerError, User>> {
    try {
      const userCreated = await this.prismaClient.user.create({
        data: {
          birthDate: user.birthDate,
          email: user.email,
          job: user.job,
          firstName: user.firstName,
          lastName: user.lastName,
          NSS: user.nss,
          phone: user.phone,
          picture: user.picture,
          createdAt: new Date(),
          updatedAt: new Date(),
          isActive: true,
          sucursal: {
            connect: {
              id: user.sucursal.sucursalId
            }
          },
          login: {
            create: {
              email: user.email,
              passwordHash: passwordHashed.hash,
              passwordSalt: passwordHashed.salt
            }
          },
          roles: {
            create: roles.map(role => {
              return { role: { connect: { id: role } } }
            })
          }
        },
        include: {
          roles: {
            include: {
              role: true
            }
          }
        }
      })

      const rolesModel = userCreated.roles.map(r => r.role)
      const rolesToDomainRoles = ModelToDomainRole.from(rolesModel)
      user.roles = rolesToDomainRoles
      user.userId = userCreated.id
      return Right.create(user)
    } catch (error) {
      return Left.create(ServerError.SERVER_ERROR)
    }
  }

  async updateUser (user: User, roles: string[] = []): Promise<Either<ServerError, User>> {
    try {
      const updatedUser = await this.prismaClient.user.update({
        data: {
          birthDate: user.birthDate,
          email: user.email,
          job: user.job,
          firstName: user.firstName,
          lastName: user.lastName,
          NSS: user.nss,
          phone: user.phone,
          picture: user.picture,
          updatedAt: new Date().toISOString(),
          isActive: true,
          sucursal: {
            connect: {
              id: user.sucursal.sucursalId
            }
          },
          roles: {
            create: roles.map(role => {
              return { role: { connect: { id: role } } }
            })
          }
        },
        where: {
          id: user.userId
        },
        include: {
          roles: {
            include: {
              role: true
            }
          }
        }
      })

      const rolesModel = updatedUser.roles.map(r => r.role)
      const rolesToDomain = ModelToDomainRole.from(rolesModel)
      user.roles = rolesToDomain

      return Right.create(user)

    } catch (error) {
      return Left.create(ServerError.SERVER_ERROR)
    }
  }

  async findUserById (userId: string): Promise<Either<ServerError, User>> {
    try {
      const user = await this.prismaClient.user.findFirst({
        where: {
          id: userId
        },
        include: {
          sucursal: true,
          roles: {
            include: {
              role: true
            }
          }
        }
      })
      if (!user) {
        return Left.create(ServerError.NOT_FOUND)
      }
      const userDomain = new User(
        user.id,
        user.firstName,
        user.lastName,
        user.birthDate,
        user.NSS,
        user.job,
        user.picture,
        user.phone,
        user.email,
        user.isActive,
        user.createdAt,
        user.updatedAt
      )
      userDomain.sucursal = ModelToDomainSucursal.from(user.sucursal!)
      const rolesModel = user.roles.map(r => r.role)
      const rolesToDomain = ModelToDomainRole.from(rolesModel)
      userDomain.roles = rolesToDomain
      
      return Right.create(userDomain)
    } catch (error) {
      return Left.create(ServerError.SERVER_ERROR)
    }
  }
  
  async deleteUserById (userId: string): Promise<Either<ServerError, void>> {
    try {
      await this.prismaClient.user.update({
        data: {
          isActive: false
        },
        where: {
          id: userId
        }
      })

      return Right.create(undefined)
    } catch (error) {
      return Left.create(ServerError.SERVER_ERROR)
    }
  }

  async findUserByEmail (email: string): Promise<Either<ServerError, User>> {
    try {
      const user = await this.prismaClient.user.findFirst({
        where: {
          email
        },
        include: {
          login: true
        }
      })

      if (!user) {
        return Left.create(ServerError.NOT_FOUND)
      }
      const userDomain = new User(
        user.id,
        user.firstName,
        user.lastName,
        user.birthDate,
        user.NSS,
        user.job,
        user.picture,
        user.phone,
        user.email,
        user.isActive,
        user.createdAt,
        user.updatedAt
      )
      userDomain.login = ModelToDomainLogin.from(user.login!)
      return Right.create(userDomain)
    } catch (error) {
      return Left.create(ServerError.SERVER_ERROR)
    }
  }

}
