import { Client } from './Client'
import { Itinerary } from './Itinerary'
import { Sign } from './Sign'
import { User } from '../../shared/domain/User'

export class Point {
  constructor (
    private _pointId: string,
    private _client: Client,
    private _itinerary: Itinerary,
    private _responseId: string,
    private _assignedDriver: User,
    private _sign: Sign,
    private _createdAt: Date,
    private _updatedAt: Date
  ) { }

  public get pointId (): string {
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

  public get itinerary (): Itinerary {
    return this._itinerary
  }

  public set itinerary (itinerary: Itinerary) {
    this._itinerary = itinerary
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
}
