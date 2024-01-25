import { IsInt, IsOptional, IsPositive, IsString, ValidateNested } from 'class-validator'
import { CreateOptionDto } from './CreateOptionDto'
import { Type } from 'class-transformer'

export class CreateQuestionDto {
  @IsString()
  text: string
  
  @IsInt()
  order: number

  @IsString()
  questionTypeId: string

  @ValidateNested({ each: true })
  @Type(() => CreateOptionDto)
  @IsOptional()
  options: CreateOptionDto[]
}
