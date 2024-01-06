import { Type } from 'class-transformer'
import { IsDate, IsDateString, IsString, ValidateNested } from 'class-validator'
import { CreatePointDto } from './CreatePointDto'

export class CreateItineraryDto {
  @IsString()
  sucursalId: string
  @IsDateString()
  scheduleDate: Date
  @ValidateNested({ each: true })
  @Type(() => CreatePointDto)
  points: CreatePointDto[]
}
