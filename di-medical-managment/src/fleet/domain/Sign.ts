export class Sign {
  constructor (
    private signId: string,
    private signImage: string
  ) { }

  public get signId (): string {
    return this.signId
  }

  public set signId (signId: string) {
    this.signId = signId
  }

  public get signImage (): string {
    return this.signImage
  }

  public set signImage (signImage: string) {
    this.signImage = signImage
  }
}
