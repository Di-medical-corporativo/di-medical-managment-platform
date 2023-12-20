import { IsJWT, IsString } from 'class-validator'

export class CheckTokenDto {
  @IsString()
  value: string
}
