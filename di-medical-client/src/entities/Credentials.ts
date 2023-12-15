export class Credentials {
  constructor(
    private _email: string,
    private _password: string
  ) {}

  get email() {
    return this._email
  }

  get password() {
    return this._password
  }
  
}
