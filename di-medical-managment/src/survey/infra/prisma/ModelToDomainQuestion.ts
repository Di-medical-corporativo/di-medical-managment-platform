import { Question } from '@prisma/client'
import { Question as DomainQuestion } from '../../domain/Question'
import { ModelToDomainOption } from './ModelToDomainOption'
import { ModelToDomainQuestionType } from './ModelToDomainQuestionType'

export class ModelToDomainQuestion { 
  public static fromQuestions(questions: any[]) {
    const domainQuestions = questions.map((question) => {
      const domainQuestion = new DomainQuestion(question.id, question.text, question.order)
      domainQuestion.options = ModelToDomainOption.fromOptions(question.options)
      domainQuestion.type = ModelToDomainQuestionType.from(question.type)
      return domainQuestion
    })

    return domainQuestions
  }
}
