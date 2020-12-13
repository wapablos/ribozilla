import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity('software')
export default class Software {
  @PrimaryColumn()
  id: number

  @Column()
  name: string
}
