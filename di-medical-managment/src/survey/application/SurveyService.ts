import { Inject, Service } from 'typedi'
import { DbSurveyRepository } from '../infra/prisma/DbSurveyRepository'
import { SurveyRepository } from './SurveyRepository'
import { CreateSurveyDto } from '../infra/dto/CreateSurveyDto'
import { Survey } from '../domain/Survey'
import { BaseError, ServerError } from '../../shared/domain/errors/Error'
import { Either, Left } from '../../shared/domain/Either'
import { UnknowError } from '../../auth/domain/Errors'
import { Question } from '../domain/Question'
import { CreateQuestionTypeDto } from '../infra/dto/CreateQuestionTypeDto'
import { QuestionType } from '../domain/QuestionType'
import { Option } from '../domain/Option'
import { SurveyNotFound } from '../domain/Errors'
import { PaginatedResult } from '../../shared/domain/PaginatedResult'
import { SurveyResponse } from '../domain/SurveyResponse'
import { AnswerSurveyClientDto } from '../infra/dto/ResponseSurveyClientDto'
import { AnswerQuestion } from '../domain/AnswerQuestion'
import { AnswerOption } from '../domain/AnswerOption'

@Service()
export class SurveyService {

  constructor(
    @Inject(() => DbSurveyRepository)
    private readonly surveyRepository: SurveyRepository
  ) {}

  public async getSurveyInsights(surveyId: string) {
    const surveyOrError = await this.surveyRepository.getSurveyInsights(surveyId)

    if(surveyOrError.isLeft()) {
      return this.unfoldError(surveyOrError.error)
    }

    return surveyOrError
  }

  public async getSurveysPaginated(pagination: number = 1): Promise<Either<BaseError, PaginatedResult<Survey>>> {   
    const usersOrError = await this.surveyRepository.getSurveysPaginated(pagination)
    
    if(usersOrError.isLeft()) {
      return this.unfoldError(usersOrError.error)
    }

    return usersOrError
  }

  public async getQuestionTypes() {
    const questionTypes = await this.surveyRepository.getQuestionTypes()

    if(questionTypes.isLeft()) {
      return this.unfoldError(questionTypes.error)
    }

    return questionTypes
  }

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
    
    if(surveyCreatedOrError.isLeft()) {
      return this.unfoldError(surveyCreatedOrError.error)
    }

    return surveyCreatedOrError
  }

  public async getSurveyById(surveyId: string) {
    const surveyOrError = await this.surveyRepository.findSurveyById(surveyId)
    if(surveyOrError.isLeft()) {
      return this.unfoldError(surveyOrError.error)
    }
    
    return surveyOrError
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

  public async clientAnswer(response: AnswerSurveyClientDto) {
    const answers = response.answers.map((answer) => {
      const answerDomain = new AnswerQuestion(
        undefined,
        undefined,
        answer.questionId
      )

      if(answer.optionId) {
        answerDomain.option = new AnswerOption(
          undefined,
          undefined,
          answer.optionId
        )
      } else {
        answerDomain.answer = answer.answer
      }
      return answerDomain
    })

    const responseSurvey = new SurveyResponse(
      undefined,
      response.surveyId,
      response.beginDate,
      response.endDate,
      answers
    )

    if(response.pointId) {
      responseSurvey.pointId = response.pointId
    }

    const test = await this.surveyRepository.answerSurveyClient(responseSurvey)

    if(test.isLeft()) {
      return this.unfoldError(test.error)
    }

    return test
  }

  private unfoldError (error: ServerError) {
    switch (error) {
      case ServerError.NETWORK_ERROR:
      case ServerError.SERVER_ERROR:
        return Left.create(new UnknowError())
      case ServerError.NOT_FOUND:
        return Left.create(new SurveyNotFound())
      default:
        return Left.create(new UnknowError())
    }
  }
}
