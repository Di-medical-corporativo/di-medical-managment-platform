import { IsString } from 'class-validator'

export class CreateQuestionTypeDto { 
  @IsString()
  type: string
}
