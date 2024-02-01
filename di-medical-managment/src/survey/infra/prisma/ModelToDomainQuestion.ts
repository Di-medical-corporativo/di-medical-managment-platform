import { Question } from '@prisma/client'
import { Question as DomainQuestion } from '../../domain/Question'
import { ModelToDomainOption } from './ModelToDomainOption'
import { ModelToDomainQuestionType } from './ModelToDomainQuestionType'
import { AnswerQuestion } from '../../domain/AnswerQuestion'
import { openQuestion } from '../../domain/types/SurveyTypes'

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

  public static fromQuestionsInsights(questions: any[]) {
    const domainQuestions = questions.map((question) => {
      const domainQuestion = new DomainQuestion(question.id, question.text, question.order)
      domainQuestion.options = ModelToDomainOption.fromOptionsInsights(question.options)
      domainQuestion.type = ModelToDomainQuestionType.from(question.type)
      domainQuestion.totalAnswers = question._count.answers

      if(question.type.type == openQuestion) {
        domainQuestion.answers = question.answers.map((ans: any) => {
          const answerDomain = new AnswerQuestion(ans.id, ans.responseId, ans.questionId)
          answerDomain.answer = ans.answer
          return answerDomain
        })
      }
      return domainQuestion
    })
    return domainQuestions
  }
}
