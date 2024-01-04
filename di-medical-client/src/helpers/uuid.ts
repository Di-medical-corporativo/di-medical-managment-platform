export class UUID {
  public static generate() {
    const id = Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))
    return id.toString()
  }
}
