import { Type } from 'class-transformer'
import { IsString, ValidateNested } from 'class-validator'
import { CreatePointDto } from './CreatePointDto'

export class CreateItineraryDto {
  @IsString()
  sucursalId: string
  @ValidateNested({ each: true })
  @Type(() => CreatePointDto)
  points: CreatePointDto[]
}
