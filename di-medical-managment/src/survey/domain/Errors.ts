import { BaseError } from '../../shared/domain/errors/Error'

export class TypeNotFound implements BaseError {
  message: string = 'No se encontro el tipo de pregunta'
  status: number = 404
}

export class SurveyNotFound implements BaseError {
  message: string = 'No se encontro la encuesta'
  status: number = 404
}
