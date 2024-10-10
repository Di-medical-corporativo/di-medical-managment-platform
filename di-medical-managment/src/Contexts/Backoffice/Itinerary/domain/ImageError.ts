export class ImageError extends Error {
  constructor() {
    super('Image failed to generate');
  }
}
