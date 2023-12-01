import { IsString } from 'class-validator'

export class CreateIncidentDto {
  @IsString()
  description: string
  @IsString()
  picture: string
}
