import { Login } from '@prisma/client'
import { Login as DomainLogin } from '../../domain/Login'

export class ModelToDomainLogin {
  public static from(login: Login){
    return new DomainLogin(
      login.id,
      login.email,
      login.passwordHash,
      login.passwordSalt,
      login.createdAt,
      login.updatedAt
    )
  }
}
