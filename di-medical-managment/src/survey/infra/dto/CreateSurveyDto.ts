import { IsString, ValidateNested } from 'class-validator'
import { CreateQuestionDto } from './CreateQuestionDto'
import { Type } from 'class-transformer'

export class CreateSurveyDto {
  @IsString()
  name: string
  @IsString()
  description: string

  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  questions:CreateQuestionDto[]
}
