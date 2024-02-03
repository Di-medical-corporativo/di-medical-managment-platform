import { ModelToClientDomain } from "../../../shared/infra/prisma/ModelToClientDomain"
import { ModelToUserDomain } from "../../../shared/infra/prisma/ModelToUserDomain"
import { AnswerOption } from "../../../survey/domain/AnswerOption"
import { AnswerQuestion } from "../../../survey/domain/AnswerQuestion"
import { SurveyResponse } from "../../../survey/domain/SurveyResponse"
import { ModelToDomainOption } from "../../../survey/infra/prisma/ModelToDomainOption"
import { ModelToDomainQuestion } from "../../../survey/infra/prisma/ModelToDomainQuestion"
import { ModelToDomainSurvey } from "../../../survey/infra/prisma/ModelToDomainSurvey"
import { Point as DomainPoint } from "../../domain/Point"
import { ModelToDomainInvoice } from "./ModelToDomainInvoice"
import { ModelToDomainTruck } from "./ModelToDomainTruck"

export class ModelToDomainPoint {
  public static fromPoints(points: any) {
    const domainPoints = points.map((point: any) => {
      const pointDomain = new DomainPoint(
        point.id
      )
      pointDomain.assignedDriver = ModelToUserDomain.from(point.user)
      pointDomain.client = ModelToClientDomain.from(point.client)
      pointDomain.invoices = ModelToDomainInvoice.fromInvoices(point.invoices)
      pointDomain.truck = ModelToDomainTruck.from(point.truck)
      pointDomain.done = point.done
      pointDomain.problem = point.problem
      if(point.comment) {
        pointDomain.comment = point.comment
      }
      
      if(point.response) {
        const answers = point.response.answers.map((answer: any) => {
          const domainAnswer = new AnswerQuestion(
            answer.id,
            answer.responseId,
            answer.questionId
          )
          domainAnswer.question = ModelToDomainQuestion.fromQuestion(answer.question)
          domainAnswer.answer = answer.answer
          const { answerOption } = answer
          if(answerOption.length > 0) {
            const answerOptionDomain = new AnswerOption(
              answerOption[0].answerOptionId, 
              answerOption[0].answerId, 
              answerOption[0].optionId
            )
            answerOptionDomain.option = ModelToDomainOption.fromOption(answerOption[0].option)
            domainAnswer.option = answerOptionDomain
          }
          return domainAnswer
        })
        
        const surveyResponse = new SurveyResponse(
          point.response.id,
          point.response.surveyId,
          point.response.beginDate,
          point.response.endDate,
          answers
        )

        pointDomain.response = surveyResponse
      }

      if(point.survey != null) {
        pointDomain.survey = ModelToDomainSurvey.from(point.survey)
      }
    
      return pointDomain
    })

    return domainPoints
  }

  public static fromPoint(point: any) {
    const domainPoint = new DomainPoint(
      point.id
    )
    domainPoint.client = ModelToClientDomain.from(point.client)
    domainPoint.done = point.done
    domainPoint.problem = point.problem
    if(point.comment) {
      domainPoint.comment = point.comment
    }

    if(point.survey != null) {
      domainPoint.survey = ModelToDomainSurvey.fromSurveySimplified(point.survey)
    }

    return domainPoint
  }
}
