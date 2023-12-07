import { Point } from './Point'

export class Invoice {
  private _point: Point
  constructor (
    private _invoiceId: string | undefined,
    private _invoiceNumber: string,
    private _description: string,
  ) {}

  get invoiceId (): string | undefined {
    return this._invoiceId
  }

  set invoiceId (value: string) {
    this._invoiceId = value
  }

  get pointId (): Point {
    return this._point
  }

  set pointId (value: Point) {
    this._point = value
  }

  get invoiceNumber (): string {
    return this._invoiceNumber
  }

  set invoiceNumber (value: string) {
    this._invoiceNumber = value
  }

  get description (): string {
    return this._description
  }

  set description (value: string) {
    this._description = value
  }
}
