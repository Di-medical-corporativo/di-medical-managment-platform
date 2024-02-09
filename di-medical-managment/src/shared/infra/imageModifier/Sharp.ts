import { ImageProcessingService } from '../../application/ImageProcessingService'
import { Either, Left, Right } from '../../domain/Either'
import { BaseError } from '../../domain/errors/Error'
import { UnknowError } from '../../../auth/domain/Errors'
import { Service } from 'typedi'

@Service()
export class SharpProcessor implements ImageProcessingService {
  async resize(imageBuffer: Buffer, width: number, height: number): Promise<Either<BaseError, Buffer>> {
    try {
      return Right.create(imageBuffer)
    } catch (error) {
      return Left.create(new UnknowError())
    }
  }

  async roundedCorners(imageBuffer: Buffer, width: number, height: number): Promise<Either<BaseError, Buffer>> {
    try {
      return Right.create(imageBuffer)
    } catch (error) {
      return Left.create(new UnknowError())
    }
  }
}
