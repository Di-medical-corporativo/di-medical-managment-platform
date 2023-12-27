import { Either } from '../../shared/domain/Either'
import { ServerError } from '../../shared/domain/errors/Error'
import { Role } from '../domain/Role'

export interface RoleRepository {
  createRole(role: Role, resourcesId: string[]): Promise<Either<ServerError, Role>>
  updateRole(role: Role, resourcesId: string[]): Promise<Either<ServerError, Role>>
  findOneById(roleId: string): Promise<Either<ServerError, Role>>
  deleteRoleById(roleId: string): Promise<Either<ServerError, string>>
  getAllRoles(): Promise<Either<ServerError, Role[]>>
}
