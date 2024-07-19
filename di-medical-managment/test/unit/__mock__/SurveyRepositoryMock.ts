import { Survey } from "../../../src/Contexts/Backoffice/Survey/domain/Survey";
import { SurveyRepository } from "../../../src/Contexts/Backoffice/Survey/domain/SurveyRepository";

export class SurveyRepositoryMock implements SurveyRepository {
  private saveMock: jest.Mock;

  constructor() {
    this.saveMock = jest.fn();
  }
  
  async save(survey: Survey): Promise<void> {
    this.saveMock(survey);
  }

  assertSaveHaveBeenCalledWith(expected: Survey) {
    expect(this.saveMock).toHaveBeenCalledWith(expected);
  }
}
