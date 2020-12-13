import { Entity, PrimaryColumn, Column } from 'typeorm'

@Entity('category')
export default class Category {
  @PrimaryColumn()
  id: number

  @Column()
  name: string
}
