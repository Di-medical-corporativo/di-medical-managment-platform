import { Inject, Service } from 'typedi'
import { DbSurveyRepository } from '../infra/prisma/DbSurveyRepository'
import { SurveyRepository } from './SurveyRepository'
import { CreateSurveyDto } from '../infra/dto/CreateSurveyDto'
import { Survey } from '../domain/Survey'
import { ServerError } from '../../shared/domain/errors/Error'
import { Left } from '../../shared/domain/Either'
import { UnknowError } from '../../auth/domain/Errors'
import { Question } from '../domain/Question'
import { CreateQuestionTypeDto } from '../infra/dto/CreateQuestionTypeDto'
import { QuestionType } from '../domain/QuestionType'
import { Option } from '../domain/Option'

@Service()
export class SurveyService {

  constructor(
    @Inject(() => DbSurveyRepository)
    private readonly surveyRepository: SurveyRepository
  ) {}

  public async createSurvey(surveyToCreate: CreateSurveyDto) {
    const surveyDomain = new Survey(
      undefined,
      surveyToCreate.name,
      surveyToCreate.description,
      new Date(),
      true
    )

    const questionsToCreate = surveyToCreate.questions.map((question) => {
      const questionDomain = new Question(
        undefined,
        question.text,
        question.order
      )
      const optionsToCreate: Option[] = []
      questionDomain.typeId = question.questionTypeId

      if(question.options){
        question.options.forEach((option) => optionsToCreate.push(new Option(
          undefined, 
          option.value, 
          option.order
          )))
        questionDomain.options = optionsToCreate
      }
      return questionDomain
    })
    
    surveyDomain.endDate = new Date()
    surveyDomain.questions = questionsToCreate
    
    const surveyCreatedOrError = await this.surveyRepository.createSurvey(surveyDomain)
  }

  public async createQuestionType(typeToCreate: CreateQuestionTypeDto) {
    const typeDomain = new QuestionType(
      undefined,
      typeToCreate.type
    )

    const typeCreatedOrError = await this.surveyRepository.createQuestionType(typeDomain)

    if(typeCreatedOrError.isLeft()) {
      return this.unfoldError(typeCreatedOrError.error)
    }

    return typeCreatedOrError
  }

  private unfoldError (error: ServerError) {
    switch (error) {
      case ServerError.NETWORK_ERROR:
      case ServerError.SERVER_ERROR:
        return Left.create(new UnknowError())
      case ServerError.NOT_FOUND:
        return Left.create(new UnknowError())
      default:
        return Left.create(new UnknowError())
    }
  }
}
