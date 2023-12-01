import { IsString } from 'class-validator'

export class CreateViewDto {
  @IsString()
  name: string
  @IsString()
  description: string
  @IsString()
  slug: string
}
