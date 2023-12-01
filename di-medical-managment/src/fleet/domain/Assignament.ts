import { User } from '../../shared/domain/User'

export class Assignament {
  constructor (
    private _assignamentId: string,
    private _userOwner: User,
    private _userAssigned: User,
    private _title: string,
    private _description: string,
    private _status: string,
    private _startDate: Date,
    private _finishDate: Date,
    private _createdAt: Date,
    private _updatedAt: Date,
    private _isActive: boolean
  ) {}

  public get assignamentId (): string {
    return this._assignamentId
  }

  public set assignamentId (assignamentId: string) {
    this._assignamentId = assignamentId
  }

  public get userOwner (): User {
    return this._userOwner
  }

  public set userOwner (userOwner: User) {
    this._userOwner = userOwner
  }

  public get userAssigned (): User {
    return this._userAssigned
  }

  public set userAssigned (userAssigned: User) {
    this._userAssigned = userAssigned
  }

  public get title (): string {
    return this._title
  }

  public set title (title: string) {
    this._title = title
  }

  public get description (): string {
    return this._description
  }

  public set description (description: string) {
    this._description = description
  }

  public get status (): string {
    return this._status
  }

  public set status (status: string) {
    this._status = status
  }

  public get startDate (): Date {
    return this._startDate
  }

  public set startDate (startDate: Date) {
    this._startDate = startDate
  }

  public get finishDate (): Date {
    return this._finishDate
  }

  public set finishDate (finishDate: Date) {
    this._finishDate = finishDate
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

  public get isActive (): boolean {
    return this._isActive
  }

  public set isActive (isActive: boolean) {
    this._isActive = isActive
  }
}
