import { Point } from './Point'

export class Invoice {
  constructor (
    private _invoiceId: string,
    private _pointId: Point,
    private _invoiceNumber: string,
    private _description: string,
    private _createdAt: Date,
    private _updatedAt: Date
  ) {}

  get invoiceId (): string {
    return this._invoiceId
  }

  set invoiceId (value: string) {
    this._invoiceId = value
  }

  get pointId (): Point {
    return this._pointId
  }

  set pointId (value: Point) {
    this._pointId = value
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

  get createdAt (): Date {
    return this._createdAt
  }

  set createdAt (value: Date) {
    this._createdAt = value
  }

  get updatedAt (): Date {
    return this._updatedAt
  }

  set updatedAt (value: Date) {
    this._updatedAt = value
  }
}
