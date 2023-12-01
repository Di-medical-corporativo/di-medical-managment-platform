import { BaseError } from '../../shared/domain/errors/Error'

export class TruckNotFound extends BaseError {
  message: string = 'No se encontro la camioneta'
  status: number = 404
}

export class ClientNotFound extends BaseError {
  message: string = 'No se encontro el cliente'
  status: number = 404
}
