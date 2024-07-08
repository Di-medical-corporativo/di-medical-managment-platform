import { AuthenticationService } from './AuthenticationService'
import bcrypt from 'bcrypt'
const SALT_ROUNDS = 10

export class Bcrypt implements AuthenticationService {
  async encryptPassword(password: string): Promise<{ hash: string; salt: string; }> {
    try {
      const salt = await bcrypt.genSaltSync(SALT_ROUNDS)
      const hash = await bcrypt.hashSync(password, salt)
      return { hash, salt }
    } catch (error) {
      throw new Error();
    }
  }

  async validatePassword (password: string, hash: string): Promise<boolean>> {
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
