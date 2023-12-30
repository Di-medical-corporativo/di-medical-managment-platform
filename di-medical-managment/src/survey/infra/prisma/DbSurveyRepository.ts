import { Service } from 'typedi'
import { Either, Left, Right } from '../../../shared/domain/Either'
import { ServerError } from '../../../shared/domain/errors/Error'
import { SurveyRepository } from '../../application/SurveyRepository'
import { Survey } from '../../domain/Survey'
import { QuestionType } from '../../domain/QuestionType'
import { PrismaClient } from '@prisma/client'
import { ModelToDomainQuestionType } from './ModelToDomainQuestionType'

@Service()
export class DbSurveyRepository implements SurveyRepository {
  private prismaClient = new PrismaClient()

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
            include: {
              options: true,
              type: true
            }
          }
        }
      })
      console.log(surveyCreated);
      
      return Right.create(survey)
    } catch (error) {
      console.log(error);
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
}
