
export class Resource {
  constructor (
    private _resourceId: string | undefined,
    private _name: string,
    private _description: string
  ) {}

  get resourceId (): string | undefined {
    return this._resourceId
  }

  set resourceId (value: string) {
    this._resourceId = value
  }

  get name (): string {
    return this._name
  }

  set name (value: string) {
    this._name = value
  }

  get description (): string {
    return this._description
  }

  set description (value: string) {
    this._description = value
  }
}
