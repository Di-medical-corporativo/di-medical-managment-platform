import { IsString } from 'class-validator'

export class CreateResourceDto {
  @IsString()
  name: string
  @IsString()
  description: string
}
