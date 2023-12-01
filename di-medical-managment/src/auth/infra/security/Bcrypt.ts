import { Either, Left, Right } from '../../../shared/domain/Either'
import { BaseError } from '../../../shared/domain/errors/Error'
import { AuthenticationService } from '../../application/AuthenticationService'
import bcrypt from 'bcrypt'
import { UnknowError } from '../../domain/Errors'
import { Service } from 'typedi'
const SALT_ROUNDS = 10

@Service()
export class Bcrypt implements AuthenticationService {
  async encryptPassword(password: string): Promise<Either<BaseError, { hash: string; salt: string; }>> {
    try {
      const salt = await bcrypt.genSalt(SALT_ROUNDS)
      const hash = await bcrypt.hash(password, salt)
      return Right.create({ hash, salt })
    } catch (error) {
      return Left.create(new UnknowError())
    }
  }
  async validatePassword (password: string, hash: string): Promise<Either<boolean, boolean>> {
    try {
      const isCorrect = await bcrypt.compare(password, hash)

      if(!isCorrect){
        return Left.create(isCorrect)
      }

      return Right.create(isCorrect)
    } catch (error) {
      return Left.create(false)
    }
  }
  
}
