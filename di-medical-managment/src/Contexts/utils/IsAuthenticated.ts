import { ExpressMiddlewareInterface } from 'routing-controllers'
import { Inject, Service } from 'typedi'
import { JsonWebToken } from '../security/Jwt'
import { JWTservice } from '../../application/JWTservice'
import { Request, Response } from 'express'
import { Unauthorized } from '../../domain/Errors'

@Service()
export class IsAuthenticated implements ExpressMiddlewareInterface {
  
  constructor(
    @Inject(() => JsonWebToken)
    private readonly jwtService: JWTservice
  ) {}

  use(request: Request, response: Response, next: (err?: any) => any) {
    const bearerHeader = request.headers['authorization']

    if(typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ')
      const token = bearer[1]
      const isTokenCorrect = this.jwtService.validateToken(token)

      if(isTokenCorrect.isLeft()) {
        return next(new Unauthorized())
      }

      next()
    } else {
      return next(new Unauthorized())
    }

  }
}
