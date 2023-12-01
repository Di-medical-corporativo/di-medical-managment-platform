import { IsArray, IsOptional, IsString } from 'class-validator'

export class CreateResourceDto {
  @IsString()
  name: string
  @IsString()
  description: string
  @IsArray()
  @IsOptional()
  views: string[]
}
