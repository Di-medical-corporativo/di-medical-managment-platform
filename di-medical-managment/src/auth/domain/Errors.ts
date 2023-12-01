import { BaseError } from '../../shared/domain/errors/Error'

export class RoleNotFound extends BaseError {
  message: string = 'No se encontro el Rol'
  status: number = 404
}

export class UnknowError extends BaseError {
  message: string = 'Ocurrio un error al realizar la operacion'
  status: number = 500
}

export class ViewNotFound extends BaseError {
  message: string = 'No se encontrol la vista'
  status: number = 404
}

export class ViewExists extends BaseError {
  message: string = 'No se puede crear una vista con el mismo slug'
  status: number = 400
}

export class ResourceNotFound extends BaseError {
  message: string = 'No se encontro el recurso'
  status: number = 404
}

export class BadCredentials extends BaseError {
  message: string = 'Correo o contraseña incorrecta'
  status: number = 400
}

export class Unauthorized extends BaseError {
  message: string = 'Debes estart autenticado para acceder'
  status: number = 401
}
