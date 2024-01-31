import { AxiosError } from "axios"
import { api } from "src/boot/axios"
import { Either, Left, Right } from "src/entities/Either"
import { Option } from "src/entities/Option"
import { PaginatedResult } from "src/entities/PaginatedResult"
import { Question } from "src/entities/Question"
import { QuestionType } from "src/entities/QuestionType"
import { Survey } from "src/entities/Survey"
import { SurveyResponse } from "src/entities/SurveyResponse"
import { multipleOptionQuestion } from "src/helpers/questionTypes"

export interface SurveyFacadeI {
  getAllSurveysPaginated(page: number): Promise<Either<string, PaginatedResult<Survey>>>
  registerSurvey(survey: Survey): Promise<Either<string, Survey>>
  getQuestionTypes(): Promise<Either<string, QuestionType[]>>
  getSurveyById(id: string): Promise<Either<string, Survey>>
  answerSurveyId(response: SurveyResponse): Promise<Either<string, boolean>>
}

export class SurveyFacade implements SurveyFacadeI {

  async answerSurveyId(response: SurveyResponse): Promise<Either<string, boolean>> {
    try {
      const requestData: any = {
        beginDate: response.beginDate,
        endDate: response.endDate,
        surveyId: response.surveyId,
      }

      requestData.answers = response.answers.map((answer) => {
        if(answer.option) {
          return { questionId: answer.questionId, optionId: answer.option?.optionId }
        }

        return { questionId: answer.questionId, answer: answer.answer }
      })

      await api.post('/survey/answer',requestData)
      return Right.create(true)
    } catch (error) {
      const axiosError: AxiosError = error as AxiosError
      const data = axiosError.response?.data as { message: string }
      return Left.create(data.message)
    }
  }

  async getSurveyById(surveyId: string): Promise<Either<string, Survey>> {
    try {
      const { data } = await api.get(`/survey/${surveyId}`)
      const surveyDomain = new Survey(
        data._surveyId,
        data._name,
        data._description,
        data._startDate,
        data._active
      )

      const questions = data._questions.map((question: any) => {
        const type = new QuestionType(question._type._questionTypeId, question._type._type)
        const questionDomain = new Question(
          question._questionId,
          question._text,
          question._order,
          type
        )
        if(question._type._type === multipleOptionQuestion) {
          questionDomain.options = question._options.map((option: any) => new Option(
            option._id,
            option._value,
            option._order
          ))
        }

        return questionDomain
      })

      surveyDomain.questions = questions

      return Right.create(surveyDomain)
    } catch (error) {
      const axiosError: AxiosError = error as AxiosError
      const data = axiosError.response?.data as { message: string }
      return Left.create(data.message)
    }
  }

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
    try {
      const { data } = await api.post('/survey/new', {
        name: survey.name,
        description: survey.description,
        questions: survey.questions.map((question) => {
          let questionToAdd: any = {
            text: question.text,
            order: Number(question.order),
            questionTypeId: question.typeId,
          }

          if(question.type.type == multipleOptionQuestion) {
            questionToAdd.options = question.options.map((option) => ({ value: option.value, order: Number(option.order) }))
          }          
          return questionToAdd
        })
      })

      console.log(data);
      return Right.create(survey)
    } catch (error) {
      console.log(error);
      const axiosError: AxiosError = error as AxiosError
      const data = axiosError.response?.data as { message: string }
      return Left.create(data.message)
    }
  }
}
