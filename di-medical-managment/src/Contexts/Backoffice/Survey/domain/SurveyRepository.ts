import { Survey } from "./Survey";
import { Response } from "./Response";
import { SurveyId } from "./SurveyId";
import { SurveyPreview } from "./SurveyPreview";
import { SurveyResult } from "./SurveyResult";

export interface SurveyRepository {
  save(survey: Survey): Promise<void>

  answer(response: Response): Promise<void>
  
  search(id: SurveyId): Promise<Survey | null>

  findAll(): Promise<SurveyPreview[]>

  close(id: SurveyId): Promise<void>

  results(id: SurveyId): Promise<SurveyResult | null>
}
