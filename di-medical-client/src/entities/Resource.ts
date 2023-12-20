export class Resource {
  constructor(
    private _name: string,
    private _description: string
  ) {}

  public get name() {
    return this._name
  }

  public get description() {
    return this._description
  }
}
