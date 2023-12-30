import { QuestionType } from '@prisma/client'
import { QuestionType as DomainQuestionType } from '../../domain/QuestionType'

export class ModelToDomainQuestionType { 
  public static from(type: QuestionType) {
    return new DomainQuestionType(
      type.id,
      type.type
    )
  }
}
