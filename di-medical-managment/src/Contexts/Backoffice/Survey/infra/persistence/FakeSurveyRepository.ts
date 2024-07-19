import { Survey } from "../../domain/Survey";
import { SurveyRepository } from "../../domain/SurveyRepository";

export class FakeSurveyRepository implements SurveyRepository {
  
  private surveys: Survey[] = [];

  async save(survey: Survey): Promise<void> {
    this.surveys.push(survey);    
  }
}
