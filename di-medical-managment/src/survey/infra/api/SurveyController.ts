import 'reflect-metadata'

import { JsonController, Post, Body, Param, Res, Get, UseBefore, UploadedFile, OnUndefined, QueryParams } from 'routing-controllers'
import { Service } from 'typedi'
import { Response, response } from 'express'
import { IsAuthenticated } from '../../../auth/infra/middlewares/IsAuthenticated'
import { CreateSurveyDto } from '../dto/CreateSurveyDto'
import { SurveyService } from '../../application/SurveyService'
import { CreateQuestionTypeDto } from '../dto/CreateQuestionTypeDto'
import { PaginationDto } from '../../../shared/infra/dto/PaginationDto'

@JsonController('/survey')
@Service()
export class SurveyRestController {
  constructor(
    private surveyService: SurveyService
  ) { }

  @Post('/new')
  public async createSurvey(
    @Body() survey: CreateSurveyDto,
    @Res() response: Response
  ) {
    const surveyOrError = await this.surveyService.createSurvey(survey)

    if(surveyOrError.isLeft()) {
      response.status(surveyOrError.error.status)
      return surveyOrError.error
    }

    return surveyOrError.value
  }

  @Get('/types')
  public async getQuestionTypes() {
    const questionTypes = await this.surveyService.getQuestionTypes()

    if(questionTypes.isLeft()) {
      return questionTypes.error
    }

    return questionTypes.value
  }

  @Get('/:surveyId')
  public async getSurveyById(
    @Param('surveyId') surveyId: string,
    @Res() response: Response
  ) {
    const surveyOrError = await this.surveyService.getSurveyById(surveyId)

    if(surveyOrError.isLeft()) {
      response.status(surveyOrError.error.status)
      return surveyOrError.error
    }

    return surveyOrError.value
  }

  @Post('/type/new')
  public async createQuestionType(
    @Body() type: CreateQuestionTypeDto,
    @Res() response: Response
  ) {
    const typeOrError = await this.surveyService.createQuestionType(type)
    
    if(typeOrError.isLeft()) {
      response.status(typeOrError.error.status)
      return typeOrError.error
    }

    return typeOrError.value
  }

  @Get()
  public async getSurveysPaginated(
    @QueryParams() query: PaginationDto,
    @Res() response: Response
  ) {
    const users = await this.surveyService.getSurveysPaginated(query.page)

    if(users.isLeft()) {
      response.status(users.error.status)
      return users.error
    }

    return users.value
  }
}
