export class View {
  constructor (
    private _viewId: string,
    private _name: string,
    private _slug: string,
    private _description: string,
  ) {}

  get viewId (): string {
    return this._viewId
  }

  set viewId (value: string) {
    this._viewId = value
  }

  get name (): string {
    return this._name
  }

  set name (value: string) {
    this._name = value
  }

  get slug (): string {
    return this._slug
  }

  set slug (value: string) {
    this._slug = value
  }

  get description (): string {
    return this._description
  }

  set description (value: string) {
    this._description = value
  }
}
