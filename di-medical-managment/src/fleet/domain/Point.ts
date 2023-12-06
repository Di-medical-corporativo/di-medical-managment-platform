import { Client } from './Client'
import { Itinerary } from './Itinerary'
import { Sign } from './Sign'
import { User } from '../../shared/domain/User'
import { Truck } from './Truck'
import { Invoice } from './Invoice'

export class Point {
  private _responseId: string
  private _sign: Sign
  private _itinerary: Itinerary
  constructor (
    private _pointId: string | undefined,
    private _client: Client,
    private _assignedDriver: User,
    private _truck: Truck,
    private _invoices: Invoice[],
    private _createdAt: Date,
    private _updatedAt: Date
  ) { }

  public get pointId (): string | undefined{
    return this._pointId
  }

  public set pointId (pointId: string) {
    this._pointId = pointId
  }

  public get client (): Client {
    return this._client
  }

  public set client (client: Client) {
    this._client = client
  }

  public get responseId (): string {
    return this._responseId
  }

  public set responseId (responseId: string) {
    this._responseId = responseId
  }

  public get assignedDriver (): User {
    return this._assignedDriver
  }

  public set assignedDriver (assignedDriver: User) {
    this._assignedDriver = assignedDriver
  }

  public get sign (): Sign {
    return this._sign
  }

  public set sign (sign: Sign) {
    this._sign = sign
  }

  public get createdAt (): Date {
    return this._createdAt
  }

  public set createdAt (createdAt: Date) {
    this._createdAt = createdAt
  }

  public get updatedAt (): Date {
    return this._updatedAt
  }

  public set updatedAt (updatedAt: Date) {
    this._updatedAt = updatedAt
  
  }
  
  public set truck(truck: Truck) {
    this._truck = truck
  }

  public get truck(): Truck {
    return this._truck
  }

  public set invoices(invoices: Invoice[]) {
    this._invoices = invoices
  }

  public get invoices(): Invoice[] {
    return this._invoices
  }
}
