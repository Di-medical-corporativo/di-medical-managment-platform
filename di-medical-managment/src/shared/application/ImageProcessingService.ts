import { Either } from '../domain/Either'
import { BaseError } from '../domain/errors/Error'

export interface ImageProcessingService {
  resize(imageBuffer: Buffer, width: number, height: number): Promise<Either<BaseError, Buffer>>
  roundedCorners(imageBuffer: Buffer, width: number, height: number): Promise<Either<BaseError, Buffer>>
}
