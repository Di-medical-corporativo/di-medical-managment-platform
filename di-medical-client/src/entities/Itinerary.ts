import { Point } from "./Point"
import { Sucursal } from "./Sucursal"

export class Itinerary {
  private _points: Point[] = []
  private _sucursal!: Sucursal
  private _scheduleDate: Date | undefined
  private _totalPoints: number = 0
  private _done: boolean = false
  
  constructor (
    private _itineraryId: string | undefined,
    private _createdAt: Date,
    private _updatedAt: Date
  ) { }

  public get itineraryId (): string | undefined{
    return this._itineraryId
  }

  public set itineraryId (itineraryId: string) {
    this._itineraryId = itineraryId
  }

  public get sucursal (): Sucursal {
    return this._sucursal
  }

  public set sucursal (sucursal: Sucursal) {
    this._sucursal = sucursal
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

  public get points(): Point[] {
    return this._points
  }

  public set points(points: Point[]) {
    this._points = points
  }

  public addPoint (point: Point) {
    if(this._points.length == 0) {
      this._points = []
    }
    this._points.push(point)
  }

  public set scheduleDate(date: Date | undefined) {
    this._scheduleDate = date
  }

  public get scheduleDate() {
    return this._scheduleDate
  }

  public get totalPoints() {
    return this._totalPoints
  }

  public set totalPoints(total: number) {
    this._totalPoints = total
  }

  public get isDone() {
    return this._done
  }

  public set done(value:boolean) {
    this._done = value
  }
}
