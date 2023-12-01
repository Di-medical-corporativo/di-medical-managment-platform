import { Either } from '../../shared/domain/Either'
import { BaseError } from '../../shared/domain/errors/Error'

export interface JWTservice {
  generateToken (userId: string | undefined): string
  validateToken (token: string): Either<BaseError, boolean>
}
