export class Login {
  constructor (
    private _userId: string,
    private _email: string,
    private _passwordHash: string,
    private _passwordSalt: string,
    private _createdAt: Date,
    private _updatedAt: Date
  ) {}

  public get userId (): string {
    return this._userId
  }

  public set userId (userId: string) {
    this._userId = userId
  }

  public get email (): string {
    return this._email
  }

  public set email (email: string) {
    this._email = email
  }

  public get passwordHash (): string {
    return this._passwordHash
  }

  public set passwordHash (passwordHash: string) {
    this._passwordHash = passwordHash
  }

  public get passwordSalt (): string {
    return this._passwordSalt
  }

  public set passwordSalt (passwordSalt: string) {
    this._passwordSalt = passwordSalt
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
