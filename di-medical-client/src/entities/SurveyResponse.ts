import { AnswerQuestion } from './AnswerQuestion';

export class SurveyResponse {
  private _pointId: string | undefined;

  constructor(
    private _responseId: string | undefined,
    private _surveyId: string,
    private _beginDate: Date,
    private _endDate: Date,
    private _answers: AnswerQuestion[],
  ) {}

  get responseId(): string | undefined {
    return this._responseId;
  }

  set responseId(value: string | undefined) {
    this._responseId = value;
  }

  get surveyId(): string {
    return this._surveyId;
  }

  set surveyId(value: string) {
    this._surveyId = value;
  }

  get beginDate(): Date {
    return this._beginDate;
  }

  set beginDate(value: Date) {
    this._beginDate = value;
  }

  get endDate(): Date {
    return this._endDate;
  }

  set endDate(value: Date) {
    this._endDate = value;
  }

  get answers(): AnswerQuestion[] {
    return this._answers;
  }

  set answers(value: AnswerQuestion[]) {
    this._answers = value;
  }

  get pointId(): string | undefined {
    return this._pointId;
  }

  set pointId(value: string) {
    this._pointId = value;
  }
}
