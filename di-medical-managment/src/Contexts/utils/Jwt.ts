import { Service } from 'typedi'
import { JWTservice } from './JWTservice'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { Either, Left, Right } from '../Shared/domain/Either'
import { BaseError } from '../Shared/domain/errors/Error'
import { Unauthorized } from '../auth/domain/Errors'

@Service()
export class JsonWebToken implements JWTservice {
  validateToken(token: string): Either<BaseError, boolean> {
    try {
      jwt.verify(token, 'kevin')
      return Right.create(true)
    } catch (error) {
      return Left.create(new Unauthorized())
    }
  }
  
  generateToken(userId: string | undefined): string {
    return jwt.sign(
      {
        id: userId
      },
      'kevin',
      {
        expiresIn: '5h'
      }
    )
  }

  getPayloadFromToken(token: string): Either<BaseError, JwtPayload> {
    try {
      const decoded = jwt.verify(token, 'kevin') as JwtPayload
      return Right.create(decoded)
    } catch (error) {
      return Left.create(new Unauthorized())
    }
  }
}
