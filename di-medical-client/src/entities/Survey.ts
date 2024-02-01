import { Question } from "./Question"

export class Survey {
  private _questions: Question[] = []
  private _endDate: Date | undefined
  private _totalAnswers = 0

  constructor(
    private _surveyId: string | undefined,
    private _name: string,
    private _description: string,
    private _startDate: Date,
    private _active: boolean
  ) {
  }

  get surveyId(): string | undefined {
    return this._surveyId
  }

  set surveyId(value: string | undefined) {
    this._surveyId = value
  }

  get name(): string {
    return this._name
  }

  set name(value: string) {
    this._name = value
  }

  get description(): string {
    return this._description
  }

  set description(value: string) {
    this._description = value
  }

  get startDate(): Date {
    return this._startDate
  }

  set startDate(value: Date) {
    this._startDate = value
  }

  get active(): boolean {
    return this._active
  }

  set active(value: boolean) {
    this._active = value
  }

  get endDate(): Date | undefined {
    return this._endDate
  }

  set endDate(value: Date) {
    this._endDate = value
  }

  get questions(): Question[] {
    return this._questions
  }

  set questions(questions: Question[]) {
    this._questions = questions
  }
  
  set totalAnswers(total: number) {
    this._totalAnswers = total
  }

  get totalAnswers() {
    return this._totalAnswers
  }
}
