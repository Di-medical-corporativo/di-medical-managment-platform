import { AxiosError } from "axios"
import { api } from "src/boot/axios"
import { Either, Left, Right } from "src/entities/Either"
import { PaginatedResult } from "src/entities/PaginatedResult"
import { Survey } from "src/entities/Survey"
import { User } from "src/entities/User"

export interface SurveyFacadeI {
  getAllSurveysPaginated(page: number): Promise<Either<string, PaginatedResult<Survey>>>
  registerSurvey(survey: Survey): Promise<Either<string, Survey>>
}

export class SurveyFacade implements SurveyFacadeI {
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
      console.log(data);
      
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
