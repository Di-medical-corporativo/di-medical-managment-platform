import { Service } from 'typedi'
import { JWTservice } from '../../application/JWTservice'
import jwt from 'jsonwebtoken'
import { Either, Left, Right } from '../../../shared/domain/Either'
import { BaseError } from '../../../shared/domain/errors/Error'
import { Unauthorized } from '../../domain/Errors'

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
        expiresIn: '1h'
      }
    )
  }
}
