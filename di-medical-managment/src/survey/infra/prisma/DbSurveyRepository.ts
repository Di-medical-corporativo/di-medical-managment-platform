import { Service } from 'typedi'
import { Either, Left, Right } from '../../../shared/domain/Either'
import { ServerError } from '../../../shared/domain/errors/Error'
import { SurveyRepository } from '../../application/SurveyRepository'
import { Survey } from '../../domain/Survey'
import { QuestionType } from '../../domain/QuestionType'
import { PrismaClient } from '@prisma/client'
import { ModelToDomainQuestionType } from './ModelToDomainQuestionType'
import { ModelToDomainQuestion } from './ModelToDomainQuestion'
import { ModelToDomainSurvey } from './ModelToDomainSurvey'
import { PaginatedResult } from '../../../shared/domain/PaginatedResult'
import { SurveyResponse } from '../../domain/SurveyResponse'

@Service()
export class DbSurveyRepository implements SurveyRepository {
  private prismaClient = new PrismaClient()
  private pageSize: number = 10
  
  async getQuestionTypes(): Promise<Either<ServerError, QuestionType[]>> {
    try {
      const questionTypes = await this.prismaClient.questionType.findMany({})
      if(questionTypes.length == 0) {
        return Left.create(ServerError.NOT_FOUND)
      }
      const questionTypesDomain = ModelToDomainQuestionType.fromQuestionTypes(questionTypes)

      return Right.create(questionTypesDomain)
    } catch (error) {
      return Left.create(ServerError.SERVER_ERROR)
    }
  }

  async answerSurveyClient(surveyResponseDomain: SurveyResponse): Promise<Either<ServerError, SurveyResponse>> {
    try {
      const surveyResponse = await this.prismaClient.surveyResponse.create({
        data: {
          beginDate: surveyResponseDomain.beginDate,
          endDate: surveyResponseDomain.endDate,
          survey: {
            connect: {
              id: surveyResponseDomain.surveyId,
            }
          },
          point: surveyResponseDomain.pointId ? {
            connect: {
              id: surveyResponseDomain.pointId
            }
          } : {},
          answers: {
            create: surveyResponseDomain.answers.map((answer) => {
              const answerToSave: any = {
                question: {
                  connect: {
                    id: answer.questionId
                  }
                }
              }
              if(answer.option) {
                answerToSave.answerOption = {
                  create: {
                    option: {
                      connect: {
                        id: answer.option?.optionId
                      }
                    }
                  }
                }
                answerToSave.answer = 'Sin respuesta'
              } else {
                answerToSave.answer = answer.answer
              }

              return answerToSave
            })
          }
        }
      })

      return Right.create(surveyResponseDomain)
    } catch (error) {
      return Left.create(ServerError.SERVER_ERROR)
    }
  }

  async getSurveysPaginated(page: number): Promise<Either<ServerError, PaginatedResult<Survey>>> {
    try {
      const [ surveys, total ] = await Promise.all([
        this.prismaClient.survey.findMany({
          skip: (page - 1) * 10,
          take: this.pageSize
        }),
        this.prismaClient.survey.count()
      ])

      const totalPage = Math.ceil(total / this.pageSize)

      if(page > totalPage) {
        return Left.create(ServerError.NOT_FOUND)
      }

      const surveyDomain = ModelToDomainSurvey.fromSurveysSimplified(surveys)
      
      const pagination = new PaginatedResult<Survey>(
        surveyDomain,
        totalPage
      )
      return Right.create(pagination)
    } catch (error) {
      return Left.create(ServerError.SERVER_ERROR)
    }
  }
  
  async createSurvey(survey: Survey): Promise<Either<ServerError, Survey>> {
    try {
      const surveyCreated = await this.prismaClient.survey.create({
        data: {
          active: true,
          description: survey.description,
          name: survey.name,
          endDate: survey.endDate,
          startDate: survey.startDate,
          questions: {
            create: survey.questions.map(question => ({
              order: question.order,
              text: question.text,
              type: {
                connect: {
                  id: question.typeId
                }
              },
              options: {
                create: question.options.map(op => ({
                  value: op.value,
                  order: op.order
                }))
              }
            }))
          }
        },
        include: {
          questions: {
            orderBy: {
              order: 'desc'
            },
            include: {
              options: {
                orderBy: {
                  order: 'asc'
                }
              },
              type: true,
            }
          }
        }
      })

      return Right.create(survey)
    } catch (error) {
      return Left.create(ServerError.SERVER_ERROR)
    }
  }

  async getQuestionType(typeId: string): Promise<Either<ServerError, QuestionType>> {
    try {
      const type = await this.prismaClient.questionType.findFirst({
        where: {
          id: typeId
        }
      })

      if(!type) {
        return Left.create(ServerError.NOT_FOUND)
      }

      const typeDomain = ModelToDomainQuestionType.from(type)

      return Right.create(typeDomain)
    } catch (error) {
      return Left.create(ServerError.SERVER_ERROR)
    }
  }

  async createQuestionType(questionType: QuestionType): Promise<Either<ServerError, QuestionType>> {
    try {
      const type = await this.prismaClient.questionType.create({
        data: {
          type: questionType.type
        }
      })

      questionType.questionTypeId = type.id
      return Right.create(questionType)
    } catch (error) {
      return Left.create(ServerError.SERVER_ERROR)
    }
  }

  async findSurveyById(surveyId: string): Promise<Either<ServerError, Survey>> {
    try {
      const survey = await this.prismaClient.survey.findFirst({
        where: {
          id: surveyId
        },
        include: {
          questions: {
            orderBy: {
              order: 'asc'
            },
            include: {
              options: {
                orderBy: {
                  order: 'asc'
                }
              },
              type: true          
            }
          }
        }
      })

      if(!survey){
        return Left.create(ServerError.NOT_FOUND)
      }

      const surveyDomain = ModelToDomainSurvey.from(survey)

      return Right.create(surveyDomain)
    } catch (error) {
      return Left.create(ServerError.SERVER_ERROR)
    }
  }

  async getSurveyInsights(surveyId: string): Promise<Either<ServerError, Survey>> {
    try {
      const survey = await this.prismaClient.survey.findFirst({
        where: {
          id: surveyId
        },
        include: {
          questions: {
            orderBy: {
              order: 'asc'
            },
            include: {
              options: {
                orderBy: {
                  order: 'asc'
                },
                include: {
                  _count: true
                }
              },
              type: true,
              _count: true,
              answers: true      
            },
          },
          _count: true
        }
      })
      const surveyDomain = ModelToDomainSurvey.fromSurveyInsights(survey)

      return Right.create(surveyDomain)
    } catch (error) {
      return Left.create(ServerError.SERVER_ERROR)
    }
  }

}
