import { IsString } from 'class-validator'

export class CreateTenantDto {
  @IsString()
  name: string

  @IsString()
  apiSubdomain: string

  @IsString()
  schema: string

  @IsString()
  domain: string
}
