import { Either } from '../../shared/domain/Either'
import { ServerError } from '../../shared/domain/errors/Error'
import { QuestionType } from '../domain/QuestionType'
import { Survey } from '../domain/Survey'

export interface SurveyRepository {
  createSurvey(survey: Survey): Promise<Either<ServerError, Survey>>
  getQuestionType(typeId: string): Promise<Either<ServerError, QuestionType>>
  createQuestionType(questionType: QuestionType): Promise<Either<ServerError, QuestionType>>
  findSurveyById(surveyId: string): Promise<Either<ServerError, Survey>>
}
