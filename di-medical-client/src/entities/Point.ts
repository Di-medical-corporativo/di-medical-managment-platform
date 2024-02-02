import { Client } from './Client'
import { Invoice } from './Invoice'
import { Itinerary } from './Itinerary'
import { Survey } from './Survey'
import { Truck } from './Truck'
import { User } from './User'

export class Point {
  private _responseId!: string
  private _itinerary!: Itinerary
  private _truck!: Truck
  private _invoices!: Invoice[]
  private _client!: Client
  private _assignedDriver!: User
  private _survey!: Survey
  private _done: boolean = false
  private _problem: boolean = false
  private _comment: string | null = null
  constructor (
    private _pointId: string | undefined,
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

  public get survey() {
    return this._survey
  }

  public set survey(survey) {
    this._survey = survey
  }

  public get isDone() {
    return this._done
  }

  public set done(status: boolean) {
    this._done = status
  }

  public get hasProblem() {
    return this._problem
  }

  public set problem(status: boolean) {
    this._problem = status
  }

  public get comment() {
    return this._comment
  }

  public set comment(comment: string | null) {
    this._comment = comment
  }
}
