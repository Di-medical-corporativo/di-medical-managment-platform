import { IsString } from 'class-validator'

export class CreateTruckDto {
  @IsString()
  plates: string
  @IsString()
  model: string
  @IsString()
  brand: string
}
