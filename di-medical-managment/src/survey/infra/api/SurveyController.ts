import 'reflect-metadata'

import { JsonController, Post, Body, Param, Res, Get, UseBefore, UploadedFile, OnUndefined } from 'routing-controllers'
import { Service } from 'typedi'
import { Response, response } from 'express'
import { IsAuthenticated } from '../../../auth/infra/middlewares/IsAuthenticated'
import { CreateSurveyDto } from '../dto/CreateSurveyDto'
import { SurveyService } from '../../application/SurveyService'
import { CreateQuestionTypeDto } from '../dto/CreateQuestionTypeDto'

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
    return surveyOrError
  }

  @Post('/type/new')
  public async createQuestionType(
    @Body() type: CreateQuestionTypeDto,
    @Res() response: Response
  ) {
    const typeOrError = await this.surveyService.createQuestionType(type)
    
    if(typeOrError.isLeft()) {
      return typeOrError.error
    }

    return typeOrError.value
  }
}
