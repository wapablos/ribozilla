import {
  Entity, PrimaryColumn, Column, ManyToOne, JoinColumn
} from 'typeorm'
import Software from './Software'
import Category from './Category'

@Entity('command')
export default class Command {
  // id column
  @PrimaryColumn()
  id: number

  // name column
  @Column()
  name: string

  // software_id fk pk column
  @ManyToOne(
    (type) => Software,
    (software) => software.id,
    {
      primary: true,
      cascade: true,
      onDelete: 'CASCADE',
      nullable: false
    }
  )
  @JoinColumn({ name: 'fk_software_id' })
  softwareId: Software

  // category id fk column
  @ManyToOne(
    (type) => Category,
    (category) => category.id,
    {
      primary: false,
      cascade: true,
      onDelete: 'CASCADE',
      nullable: true
    }
  )
  @JoinColumn({ name: 'fk_category_id' })
  categoryId: Category
}
