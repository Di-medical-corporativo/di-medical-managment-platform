import { IsOptional, IsString } from 'class-validator'

export class CreateAnswerDto {
  @IsString()
  questionId: string

  @IsOptional()
  @IsString()
  answer: string

  @IsOptional()
  @IsString()
  optionId: string
}
