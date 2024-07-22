import { Response } from "../../domain/Response";
import { Survey } from "../../domain/Survey";
import { SurveyId } from "../../domain/SurveyId";
import { SurveyRepository } from "../../domain/SurveyRepository";

export class FakeSurveyRepository implements SurveyRepository {
  
  private surveys: Survey[] = [];
  private reponses: Response[] = [];

  async save(survey: Survey): Promise<void> {
    this.surveys.push(survey);    
  }

  async answer(response: Response): Promise<void> {
    await this.reponses.push(response);
  }

  async search(id: SurveyId): Promise<Survey | null> {
    const survey = this.surveys.find(s => s.toPrimitives().id == id.toString());
    return survey || null;
  }
}
