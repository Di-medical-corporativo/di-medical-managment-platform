import { Survey as DomainSurvey, Survey } from '../../domain/Survey'
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

  public static fromSurveysSimplified(surveys: any[]) {
    const surveysDomain = surveys.map((survey) => new Survey(
      survey.id,
      survey.name,
      survey.description,
      survey.startDate,
      survey.active
    ))

    return surveysDomain
  }

  public static fromSurveyInsights(survey: any) {
    const surveyDomain = new DomainSurvey(
      survey.id,
      survey.name,
      survey.description,
      survey.startDate,
      survey.active
    )
    surveyDomain.totalAnswers = survey._count.responses
    surveyDomain.endDate = survey.endDate
    surveyDomain.questions = ModelToDomainQuestion.fromQuestionsInsights(survey.questions)
    return surveyDomain
  }

}
