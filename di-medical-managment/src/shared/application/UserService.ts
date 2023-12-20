import { Inject, Service } from 'typedi'
import { DbUserRepository } from '../infra/prisma/DbUserRepository'
import { UserRepository } from './UserRepository'
import { CreateUserDto } from '../../auth/infra/dto/CreateUserDto'
import { User } from '../domain/User'
import { Either, Left, Right } from '../domain/Either'
import { BaseError, ServerError, SucursalNotFound, UserNotFound } from '../domain/errors/Error'
import { BadCredentials, UnknowError } from '../../auth/domain/Errors'
import { Bcrypt } from '../../auth/infra/security/Bcrypt'
import { AuthenticationService } from '../../auth/application/AuthenticationService'
import { LoginUserDto } from '../../auth/infra/dto/LoginUserDto'
import { JWTservice } from '../../auth/application/JWTservice'
import { JsonWebToken } from '../../auth/infra/security/Jwt'
import { UpdateUserDto } from '../infra/dto/UpdateUserDto'
import { Resource } from '../../auth/domain/Resource'
import { SucursalService } from './SucursalService'
import { RoleService } from '../../auth/application/RoleService'
import { ResourceService } from '../../auth/application/ResourceService'
import { Role } from '../../auth/domain/Role'
import { CheckTokenDto } from '../../auth/infra/dto/CheckTokenDto'

@Service()
export class UserService {
  constructor(
    @Inject(() => DbUserRepository)
    private readonly userRepository: UserRepository,

    @Inject(() => SucursalService)
    private readonly sucursalService: SucursalService,

    @Inject(() => Bcrypt)
    private readonly encriptionService: AuthenticationService,

    @Inject(() => JsonWebToken)
    private readonly jwtService: JWTservice,

    @Inject(() => RoleService)
    private readonly roleService: RoleService,

    @Inject(() => ResourceService)
    private readonly resourceService: ResourceService
    ) {}

  public async createUser (userToCreate: CreateUserDto): Promise<Either<BaseError, User>> {
    const sucursalOrError = await this.sucursalService.findSucursalById(userToCreate.sucursalId)

    if(sucursalOrError.isLeft()) {
      return sucursalOrError
    }

    const hashedPasswordOrError = await this
    .encriptionService
    .encryptPassword(userToCreate.password)

    if(hashedPasswordOrError.isLeft()) {
      return hashedPasswordOrError
    }

    const user = new User(
      undefined, 
      userToCreate.firstName,
      userToCreate.lastName,
      userToCreate.birthDate,
      userToCreate.nss, 
      userToCreate.job,
      userToCreate.picture,
      userToCreate.phone,
      userToCreate.email,
      true,
      new Date(),
      new Date()
    )
    user.sucursal = sucursalOrError.value
    const userCreated = await 
    this
    .userRepository
    .createUser(
      user, 
      hashedPasswordOrError.value,
      userToCreate.roles
    )

    if(userCreated.isLeft()) {
      return this.unfoldError(userCreated.error)
    }

    return userCreated
  }

  public async loginUser (userToLogin: LoginUserDto): 
  Promise<Either<BaseError, { 
    token: string, 
    resources: Resource[],
    user: User
   }>> {
    const currentUser = await this.findUserByEmail(userToLogin.email)
    if(currentUser.isLeft()){
      return Left.create(new UserNotFound())
    }

    const correctPassword = await 
    this
    .encriptionService
    .validatePassword(
      userToLogin.password, 
      currentUser.value.credentials.passwordHash
    )

    if(correctPassword.isLeft()) {
      return Left.create(new BadCredentials())
    }

    const resourcesForUser = await this.resourcesByUser(currentUser.value.userId!)

    if(resourcesForUser.isLeft()) {
      return Left.create(new UnknowError())
    }

    const token = this.jwtService.generateToken(currentUser.value.userId)
    return Right.create({ token, resources: resourcesForUser.value, user: currentUser.value })
  }

  public async checkAuth(token: CheckTokenDto) {

    const payload = this.jwtService.getPayloadFromToken(token.value)

    if(payload.isLeft()) {
      return payload
    }

    const id = payload.value.id

    const currentUser = await this.findUserById(id)
    if(currentUser.isLeft()){
      return Left.create(new UserNotFound())
    }

    const resourcesForUser = await this.resourcesByUser(currentUser.value.userId!)

    if(resourcesForUser.isLeft()) {
      return Left.create(new UnknowError())
    }

    return Right.create({ token: token.value, resources: resourcesForUser.value, user: currentUser.value })
  }

  public async findUserByEmail (email: string): Promise<Either<BaseError, User>> {
    const userOrError = await this.userRepository.findUserByEmail(email)
    if(userOrError.isLeft()) {
      return Left.create(new UserNotFound())
    }

    return userOrError
  }


  public async findUserById (userId: string): Promise<Either<BaseError, User>> {
    const userOrError = await this.userRepository.findUserById(userId)
    if(userOrError.isLeft()) {
      return Left.create(new UserNotFound())
    }

    return userOrError
  }

  public async updateUser (userToUpdate: UpdateUserDto, userId: string): Promise<Either<BaseError, User>> {
    const user = await this.findUserById(userId)
    if(user.isLeft()){
      return Left.create(new UserNotFound())
    }

    if(userToUpdate.birthDate) user.value.birthDate = userToUpdate.birthDate
    if(userToUpdate.email) user.value.email = userToUpdate.email
    if(userToUpdate.firstName) user.value.firstName = userToUpdate.firstName
    if(userToUpdate.lastName) user.value.lastName = userToUpdate.lastName
    if(userToUpdate.job) user.value.job = userToUpdate.job
    if(userToUpdate.nss) user.value.nss = userToUpdate.nss
    if(userToUpdate.phone) user.value.phone = userToUpdate.phone
    if(userToUpdate.picture) user.value.picture = userToUpdate.picture
    if(userToUpdate.sucursalId) {
      const sucursalOrError = await this.sucursalService.findSucursalById(userToUpdate.sucursalId)
      if(sucursalOrError.isLeft()) {
        return sucursalOrError
      }
      user.value.sucursal = sucursalOrError.value
    }

    const updatedUserOrError = await this.userRepository.updateUser(user.value, userToUpdate.roles)

    if(updatedUserOrError.isLeft()) {
      return this.unfoldError(updatedUserOrError.error)
    }

    return updatedUserOrError
  }

  public async deleteUserById (userId: string): Promise<Either<BaseError, void>> {
    const userOrError = await this.findUserById(userId)
    if(userOrError.isLeft()) {
      return userOrError
    }

    const deletedUserOrError = await this.userRepository.deleteUserById(userId)
    if(deletedUserOrError.isLeft()) {
      return this.unfoldError(deletedUserOrError.error)
    }

    return deletedUserOrError
  }

  public async resourcesByUser (userId: string): Promise<Either<BaseError, Resource[]>> {
    const userOrError = await this.findUserById(userId);
    if(userOrError.isLeft()) {
      return userOrError
    }

    const rolesPromises: Promise<Either<BaseError, Role >>[] = userOrError.value.roles.map((role) => {
      return this.roleService.findById(role.roleId!)
    })

    const roles = await Promise.all(rolesPromises)

    const resourcesPromises: Promise<Either<BaseError, Resource>>[] = []
    roles.forEach(role => {
      if(role.isRight()) {
        role.value.resources
        .forEach( 
          resource => 
          resourcesPromises.push(
            this
            .resourceService
            .findResourceById
            (resource.resourceId!)
          )
        )    
      }
    })
    
    const resources: Resource[] = [];
    (await Promise.all(resourcesPromises)).forEach((resource: Either<BaseError, Resource> ) => {
      if(resource.isRight()) {
        resources.push(resource.value)
      }
    })

    return Right.create(resources)
  }

  private unfoldError (error: ServerError) {
    switch (error) {
      case ServerError.NETWORK_ERROR:
      case ServerError.SERVER_ERROR:
        return Left.create(new UnknowError())
      case ServerError.NOT_FOUND:
        return Left.create(new SucursalNotFound())
      default:
        return Left.create(new UnknowError())
    }
  }
}
