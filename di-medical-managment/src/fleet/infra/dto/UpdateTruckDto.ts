import { IsOptional, IsString } from 'class-validator'

export class UpdateTruckDto {
  @IsString()
  @IsOptional()
  plates: string
  @IsString()
  @IsOptional()
  model: string
  @IsString()
  @IsOptional()
  brand: string
  @IsString()
  @IsOptional()
  picture: string
}
