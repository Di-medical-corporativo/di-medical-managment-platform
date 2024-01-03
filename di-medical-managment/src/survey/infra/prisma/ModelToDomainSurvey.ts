import { Question, Survey } from '@prisma/client'
import { Survey as DomainSurvey } from '../../domain/Survey'
import { ModelToDomainQuestion } from './ModelToDomainQuestion'

export class ModelToDomainSurvey {
  public static from(survey: any) {
    const surveyDomain = new DomainSurvey(
      survey.id,
      survey.name,
      survey.description,
      survey.startDate,
      survey.active
    )

    surveyDomain.endDate = survey.endDate
    surveyDomain.questions = ModelToDomainQuestion.fromQuestions(survey.questions)
    return surveyDomain
  }
}
