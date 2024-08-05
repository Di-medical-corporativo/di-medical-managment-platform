import { Survey } from "./Survey";
import { Response } from "./Response";
import { SurveyId } from "./SurveyId";

export interface SurveyRepository {
  save(survey: Survey): Promise<void>

  answer(response: Response): Promise<void>
  
  search(id: SurveyId): Promise<Survey | null>

  findAll(): Promise<SurveyPreview[]>
}
