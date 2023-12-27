import sharp, { OutputInfo } from 'sharp'
import { ImageProcessingService } from '../../application/ImageProcessingService'
import { Either, Left, Right } from '../../domain/Either'
import { BaseError } from '../../domain/errors/Error'
import { UnknowError } from '../../../auth/domain/Errors'
import { Service } from 'typedi'

@Service()
export class SharpProcessor implements ImageProcessingService {
  async resize(imageBuffer: Buffer, width: number, height: number): Promise<Either<BaseError, Buffer>> {
    try {
      const imageModified = await sharp(imageBuffer.buffer)
        .resize(width, height, { fit: 'outside' })
        .png()
        .toBuffer()
      return Right.create(imageModified)
    } catch (error) {
      console.log(error);
      return Left.create(new UnknowError())
    }
  }

  async roundedCorners(imageBuffer: Buffer, width: number, height: number): Promise<Either<BaseError, Buffer>> {
    try {
      const borderRadius = 150
      const imageModified = await sharp(imageBuffer.buffer)
      .png()
      .composite([
        {
          input: Buffer.from(
            `<svg><rect x="0" y="0" width="${width}" height="${height}" rx="${borderRadius}" ry="${borderRadius}" /></svg>`
          ),
          blend: 'dest-in'
        }
      ])
      .toBuffer()
      return Right.create(imageModified)
    } catch (error) {
      return Left.create(new UnknowError())
    }
  }
}
