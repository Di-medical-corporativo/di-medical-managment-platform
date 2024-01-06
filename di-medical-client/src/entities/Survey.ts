export class Survey {
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
}
