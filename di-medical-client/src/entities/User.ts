
import { Resource } from "./Resource"
import { Role } from "./Role"
import { Sucursal } from "./Sucursal"

export class User {
  private _token: string = ''
  private _resources: Resource[] = []
  private _password: string = ''
  private _roles: Role[] = []
  private _sucursal: Sucursal | undefined = undefined 
  constructor (
    private _userId: string | undefined,
    private _firstName: string,
    private _lastName: string,
    private _birthDate: Date,
    private _nss: string,
    private _job: string,
    private _picture: string | File,
    private _phone: string,
    private _email: string,
    private _isActive: boolean,
    private _createdAt: Date,
    private _updatedAt: Date
  ) { }

  public get userId (): string | undefined {
    return this._userId
  }

  public set userId (userId: string) {
    this._userId = userId
  }

  public get firstName (): string {
    return this._firstName
  }

  public set firstName (firstName: string) {
    this._firstName = firstName
  }

  public get lastName (): string {
    return this._lastName
  }

  public set lastName (lastName: string) {
    this._lastName = lastName
  }

  public get birthDate (): Date {
    return this._birthDate
  }

  public set birthDate (birthDate: Date) {
    this._birthDate = birthDate
  }

  public get nss (): string {
    return this._nss
  }

  public set nss (nss: string) {
    this._nss = nss
  }

  public get job (): string {
    return this._job
  }

  public set job (job: string) {
    this._job = job
  }

  public get picture (): string | File {
    return this._picture
  }

  public set picture (picture: string) {
    this._picture = picture
  }

  public get phone (): string {
    return this._phone
  }

  public set phone (phone: string) {
    this._phone = phone
  }

  public get email (): string {
    return this._email
  }

  public set email (email: string) {
    this._email = email
  }

  public get isActive (): boolean {
    return this._isActive
  }

  public set isActive (isActive: boolean) {
    this._isActive = isActive
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

  public set token(token: string) {
    this._token = token
  }

  public get token() {
    return this._token
  }

  public get resources() {
    return this._resources
  }

  public set resources(resources: Resource[]) {
    this._resources = resources
  }

  public set password(password: string){
    this._password = password
  }
  
  public get password() {
    return this._password
  } 

  public get roles() {
    return this._roles
  }

  public set roles(roles: Role[]) {
    this._roles = roles
  }

  public get sucursal(): Sucursal | undefined{
    return this._sucursal
  }

  public set sucursal(sucursal: Sucursal) {
    this._sucursal = sucursal
  }
}
