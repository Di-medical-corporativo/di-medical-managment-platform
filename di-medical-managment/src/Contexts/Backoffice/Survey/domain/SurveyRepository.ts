import { Survey } from "./Survey";

export interface SurveyRepository {
  save(survey: Survey): Promise<void>
}
