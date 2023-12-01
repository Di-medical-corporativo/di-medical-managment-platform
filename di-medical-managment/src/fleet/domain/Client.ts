export class Client {
  constructor (
    private _clientId: string | undefined,
    private _name: string,
    private _address: string,
    private _isActive: boolean
  ) { }

  public get clientId (): string |undefined {
    return this._clientId
  }

  public set clientId (clientId: string) {
    this._clientId = clientId
  }

  public get name (): string {
    return this._name
  }

  public set name (name: string) {
    this._name = name
  }

  public get address (): string {
    return this._address
  }

  public set address (address: string) {
    this._address = address
  }

  public set isActive(status: boolean) {
    this._isActive = status
  }

  public get isActive(): boolean {
    return this._isActive
  }
}
