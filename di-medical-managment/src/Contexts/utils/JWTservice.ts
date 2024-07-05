import { JwtPayload } from 'jsonwebtoken'
import { Either } from '../Shared/domain/Either'
import { BaseError } from '../Shared/domain/errors/Error'

export interface JWTservice {
  generateToken (userId: string | undefined): string
  validateToken (token: string): Either<BaseError, boolean>
  getPayloadFromToken(token: string): Either<BaseError, JwtPayload> 
}
