export class UserPassword {
  constructor(
    private hash: string,
    private salt: string
  ) {}

  toPrimitives() {
    return {
      hash: this.hash,
      salt: this.salt
    }
  }
}
