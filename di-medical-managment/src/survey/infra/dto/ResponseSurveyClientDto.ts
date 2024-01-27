import { IsDateString, IsOptional, IsString, ValidateNested } from 'class-validator'
import { CreateAnswerDto } from './CreateAnswerDto'
import { Type } from 'class-transformer'

export class AnswerSurveyClientDto {
  @IsDateString()
  beginDate: Date

  @IsDateString()
  endDate: Date

  @IsString()
  surveyId: string

  @IsOptional()
  @IsString()
  pointId: string

  @ValidateNested({ each: true })
  @Type(() => CreateAnswerDto)
  answers: CreateAnswerDto[]
}
