import { PointId } from "../../../src/Contexts/Backoffice/Itinerary/domain/PointId";
import { Response } from "../../../src/Contexts/Backoffice/Survey/domain/Response";
import { Survey } from "../../../src/Contexts/Backoffice/Survey/domain/Survey";
import { SurveyId } from "../../../src/Contexts/Backoffice/Survey/domain/SurveyId";
import { SurveyPreview } from "../../../src/Contexts/Backoffice/Survey/domain/SurveyPreview";
import { SurveyRepository } from "../../../src/Contexts/Backoffice/Survey/domain/SurveyRepository";
import { SurveyResponse } from "../../../src/Contexts/Backoffice/Survey/domain/SurveyResponse";
import { SurveyResult } from "../../../src/Contexts/Backoffice/Survey/domain/SurveyResult";

export class SurveyRepositoryMock implements SurveyRepository {
  private saveMock: jest.Mock;
  private answerMock: jest.Mock;
  private searchMock: jest.Mock;
  private findAllMock: jest.Mock;
  private closeMock: jest.Mock;
  private resultsMock: jest.Mock;
  private openMock: jest.Mock;
  private answerPointMock: jest.Mock;

  constructor() {
    this.saveMock = jest.fn();
    this.answerMock = jest.fn();
    this.searchMock = jest.fn();
    this.findAllMock = jest.fn();
    this.closeMock = jest.fn();
    this.resultsMock =jest.fn();
    this.openMock = jest.fn();
    this.answerPointMock = jest.fn();
  }

  async open(id: SurveyId): Promise<void> {
    this.openMock(id);
  }
  
  async results(id: SurveyId): Promise<SurveyResult> {
    return this.resultsMock(id) as SurveyResult;
  }

  async findAll(): Promise<SurveyPreview[]> {
    return this.findAllMock() as SurveyPreview[];
  }

  async save(survey: Survey): Promise<void> {
    this.saveMock(survey);
  }

  async answer(response: Response): Promise<void> {
    this.answerMock(response);
  }

  async search(id: SurveyId): Promise<Survey | null> {
    return this.searchMock(id);
  }

  async close(id: SurveyId): Promise<void> {
    this.closeMock(id);
  }

  async resultsPaginated(surveyId: SurveyId, position: number): Promise<{ answers: SurveyResponse[]; total: number; }> {
    return { answers: [], total: 1 };
  }

  async answerPoint(response: Response, pointId: PointId): Promise<void> {
    this.answerPointMock(response, pointId);
  }

  assertSaveHaveBeenCalledWith(expected: Survey) {
    expect(this.saveMock).toHaveBeenCalledWith(expected);
  }

  assertAnswerHaveBeenCalledWith(expected: Response) {
    expect(this.answerMock).toHaveBeenCalledWith(expected);
  }

  assertCloseHaveBeenCalledWith(expected: SurveyId) {
    expect(this.closeMock).toHaveBeenCalledWith(expected);
  }

  assertAnswerPointHaveBeenCalled() {
    expect(this.answerPointMock).toHaveBeenCalled();
  }

  assertResultsHaveBeenCalledWith(expected: SurveyId) {
    expect(this.resultsMock).toHaveBeenCalledWith(expected)
  }

  setReturnForSearch(returnValue: Survey | null) {
    this.searchMock.mockReturnValue(returnValue);
  }

  setReturnForResults(returnValue: SurveyResult | null) {
    this.resultsMock.mockReturnValue(returnValue);
  }
}
