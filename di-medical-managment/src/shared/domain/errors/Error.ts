export enum ServerError {
  NOT_FOUND,
  SERVER_ERROR,
  NETWORK_ERROR,
  DUPLICATED
}

export class BaseError {
  message: string
  status: number
}

export class SucursalNotFound extends BaseError {
  message: string = 'No se encontro la sucursal'
  status: number = 404
}

export class UserNotFound extends BaseError {
  message: string = 'No se encontro el usuario';
  status: number = 404
}
