import { Either } from "../shared/domain/Either"
import { BaseError } from "../shared/domain/errors/Error"

export interface AuthenticationService {
  encryptPassword (password: string): Promise<Either<BaseError, { hash: string, salt: string }>>
  validatePassword (password: string, hash: string): Promise<Either<boolean, boolean>>
}
