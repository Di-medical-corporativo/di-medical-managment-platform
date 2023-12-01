import { Either } from '../../shared/domain/Either'
import { ServerError } from '../../shared/domain/errors/Error'
import { User } from '../domain/User'

export interface UserRepository {
  createUser(user: User, password: { hash: string, salt: string }, roles: string[]): Promise<Either<ServerError, User>>
  updateUser(user: User, roles: string[]): Promise<Either<ServerError, User>>
  findUserById(resourceId: string): Promise<Either<ServerError, User>>
  findUserByEmail(email: string): Promise<Either<ServerError, User>>
  deleteUserById(resourceId: string): Promise<Either<ServerError, void>>
}
