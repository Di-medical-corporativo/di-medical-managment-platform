import { RoleRepository } from './RoleRepository'
import { Role } from '../domain/Role'
import { Inject, Service } from 'typedi'
import { DbRoleRepository } from '../infra/prisma/DbRoleRepository'
import { Either, Left } from '../../shared/domain/Either'
import { BaseError, ServerError } from '../../shared/domain/errors/Error'
import { CreateRoleDto } from '../infra/dto/CreateRoleDto'
import { UpdateRoleDto } from '../infra/dto/UpdateRoleDto'
import { RoleNotFound, UnknowError } from '../domain/Errors'

@Service()
export class RoleService {

  constructor (
    @Inject(() => DbRoleRepository)
    private readonly roleRepository: RoleRepository
  ) {}

  public async createRole (roleToCreate: CreateRoleDto): Promise<Either<BaseError, Role>> {
    const role = new Role(undefined, roleToCreate.name, roleToCreate.description)
    const roleCreatedOrError: Either<ServerError, Role> = await 
      this
      .roleRepository
      .createRole(role, roleToCreate.resources)
    if(roleCreatedOrError.isLeft()) {
      return this.unfoldError(roleCreatedOrError.error)
    }
    return roleCreatedOrError
  }

  public async updateRole (roleToUpdate: UpdateRoleDto, roleId: string): Promise<Either<BaseError, Role>> {
    
    const roleByIdOrError: Either<BaseError, Role> = await this.findById(roleId)
    
    if(roleByIdOrError.isLeft()){
      return roleByIdOrError
    }

    if(roleToUpdate.name) {
      roleByIdOrError.value.name = roleToUpdate.name
    }

    if(roleToUpdate.description) {
      roleByIdOrError.value.description = roleToUpdate.description
    }

    const updatedRole: Either<ServerError, Role> = await this.roleRepository.updateRole(
      roleByIdOrError.value,
      roleToUpdate.resources
    )

    if(updatedRole.isLeft()) {
      return this.unfoldError(updatedRole.error)
    }

    return updatedRole
  }

  public async findById (roleId: string): Promise<Either<BaseError, Role>> {
    const roleOrError: Either<ServerError, Role> = await this.roleRepository.findOneById(roleId)
    if(roleOrError.isLeft()) {
      return this.unfoldError(roleOrError.error)
    }

    return roleOrError
  }

  public async deleteRoleById (roleId: string): Promise<Either<BaseError, string>> {
    const roleByIdOrError = await this.findById(roleId)
    if(roleByIdOrError.isLeft()) {
      return roleByIdOrError
    }

    const deleteRoleIdOrError = await this.roleRepository.deleteRoleById(roleId)
    if(deleteRoleIdOrError.isLeft()) {
      return this.unfoldError(deleteRoleIdOrError.error)
    }

    return deleteRoleIdOrError
  }

  private unfoldError (error: ServerError) {
    switch (error) {
      case ServerError.NETWORK_ERROR:
      case ServerError.SERVER_ERROR:
        return Left.create(new UnknowError())
      case ServerError.NOT_FOUND:
        return Left.create(new RoleNotFound())
      default:
        return Left.create(new UnknowError())
    }
  }
}
