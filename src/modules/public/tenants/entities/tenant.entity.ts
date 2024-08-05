import { BaseEntity } from '@/base.entity'
import { Column, Entity } from 'typeorm'

@Entity()
export class Tenant extends BaseEntity {
  @Column()
  name: string

  @Column()
  subdomain: string

  @Column()
  schema: string
}
