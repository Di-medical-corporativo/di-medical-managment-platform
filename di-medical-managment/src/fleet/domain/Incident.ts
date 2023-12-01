export class Incident {

  private _finishedDate: Date
  constructor(
    private _incidentId: string | undefined,
    private _description: string,
    private _picture: string,
    private _isActive: boolean,
    private _startDate: Date
  ) {}

  get incidentId (): string | undefined {
    return this._incidentId
  }

  set truckId (value: string) {
    this._incidentId = value
  }

  get description (): string {
    return this._description
  }

  set description (value: string) {
    this._description = value 
  }

  get picture (): string {
    return this._picture
  }

  set picture (value: string) {
    this._picture = value
  }

  get startDate(): Date {
    return this._startDate
  }

  set startDate(start: Date) {
    this._startDate = start
  }

  get finishDate(): Date {
    return this._finishedDate
  }

  set finishDate(end: Date) {
    this._finishedDate = end
  }

  get isActive() {
    return this._isActive
  }

  set isActive(status: boolean) {
    this._isActive = status
  }
}
