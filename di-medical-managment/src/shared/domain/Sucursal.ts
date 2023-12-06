import { User } from "./User"

export class Sucursal {
  private _employees: User[]
  constructor (
    private _sucursalId: string | undefined,
    private _sucursalName: string,
    private _address: string,
    private _phone: string,
    private _dimedicalBrand: string
  ) { }

  public get sucursalId (): string | undefined{
    return this._sucursalId
  }

  public set sucursalId (sucursalId: string) {
    this._sucursalId = sucursalId
  }

  public get sucursalName (): string {
    return this._sucursalName
  }

  public set sucursalName (sucursalName: string) {
    this._sucursalName = sucursalName
  }

  public get address (): string {
    return this._address
  }

  public set address (address: string) {
    this._address = address
  }

  public get phone (): string {
    return this._phone
  }

  public set phone (phone: string) {
    this._phone = phone
  }

  public get dimedicalBrand (): string {
    return this._dimedicalBrand
  }

  public set dimedicalBrand (dimedicalBrand: string) {
    this._dimedicalBrand = dimedicalBrand
  }

  public set employees (employees: User[]) {
    this._employees = employees
  }

  public get employees (): User[] {
    return this._employees
  }
}
