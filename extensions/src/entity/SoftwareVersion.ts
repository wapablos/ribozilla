import {
  Entity, Column, ManyToOne, JoinColumn, PrimaryColumn
} from 'typeorm'
import Software from './Software'

@Entity('software_version')
export default class Version {
  // id column
  @PrimaryColumn()
  id:number

  // version column
  @Column()
  version: string

  // software column
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
}
