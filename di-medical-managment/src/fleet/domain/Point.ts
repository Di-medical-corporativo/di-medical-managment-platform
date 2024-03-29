import { Client } from './Client'
import { Itinerary } from './Itinerary'
import { Sign } from './Sign'
import { User } from '../../shared/domain/User'
import { Truck } from './Truck'
import { Invoice } from './Invoice'
import { Survey } from '../../survey/domain/Survey'
import { AnswerQuestion } from '../../survey/domain/AnswerQuestion'
import { SurveyResponse } from '../../survey/domain/SurveyResponse'

export class Point {
  private _responseId: string
  private _sign: Sign
  private _itinerary: Itinerary
  private _truck: Truck
  private _invoices: Invoice[]
  private _client: Client
  private _survey: Survey
  private _comment: string | null
  private _assignedDriver: User
  private _done: boolean = false
  private _problem: boolean = false
  private _response: SurveyResponse
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

  public get sign (): Sign {
    return this._sign
  }

  public set sign (sign: Sign) {
    this._sign = sign
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

  public set survey(survey: Survey) {
    this._survey = survey
  }
  
  public get comment() {
    return this._comment
  }

  public set comment(comment: string | null) {
    this._comment = comment
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

  public get response() {
    return this._response
  }

  public set response(answers: SurveyResponse) {
    this._response = answers
  }
}
