export class Sucursal {
  constructor(
    private _sucursalId: string | undefined,
    private _name: string,
    private _address: string,
    private _phone: string,
    private _dimedicalBrand: string
  ) {}

  public get id() {
    return this._sucursalId
  }

  public get name() {
    return this._name
  }

  public get address() {
    return this._address
  }

  public get phone() {
    return this._phone
  }

  public get dimedicalBrand() {
    return this._dimedicalBrand
  }
}
