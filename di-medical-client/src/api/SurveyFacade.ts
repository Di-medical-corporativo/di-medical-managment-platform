import { AxiosError } from "axios"
import { api } from "src/boot/axios"
import { Either, Left, Right } from "src/entities/Either"
import { PaginatedResult } from "src/entities/PaginatedResult"
import { QuestionType } from "src/entities/QuestionType"
import { Survey } from "src/entities/Survey"
import { User } from "src/entities/User"

export interface SurveyFacadeI {
  getAllSurveysPaginated(page: number): Promise<Either<string, PaginatedResult<Survey>>>
  registerSurvey(survey: Survey): Promise<Either<string, Survey>>
  getQuestionTypes(): Promise<Either<string, QuestionType[]>>
}

export class SurveyFacade implements SurveyFacadeI {

  async getQuestionTypes(): Promise<Either<string, QuestionType[]>> {
    try {
      const { data } = await api.get('/survey/types')
      const typeDomain = data.map((type: any) => new QuestionType(type._questionTypeId, type._type))
      return Right.create(typeDomain)
    } catch (error) {
      const axiosError: AxiosError = error as AxiosError
      const data = axiosError.response?.data as { message: string }
      return Left.create(data.message)
    }
  }

  async getAllSurveysPaginated(page: number): Promise<Either<string, PaginatedResult<Survey>>> {
    try {
      const { data } = await api.get('/survey', {
        params: {
          page
        }
      })

      const resultsDomain = data._results.map((survey: { _surveyId: string | undefined; _name: string; _description: string; _startDate: Date; _active: boolean }) => new Survey(
        survey._surveyId,
        survey._name,
        survey._description,
        survey._startDate,
        survey._active
      ))
      
      return Right.create(new PaginatedResult<Survey>(resultsDomain, data._pages))

    } catch (error) {
      const axiosError: AxiosError = error as AxiosError
      const data = axiosError.response?.data as { message: string }
      return Left.create(data.message)
    }
  }



  async registerSurvey(survey: Survey): Promise<Either<string, Survey>> {
    console.log(survey);
    throw new Error()
  }
}
