import {
  Entity, PrimaryColumn, ManyToOne, JoinColumn, Column
} from 'typeorm'
import Command from './Command'

@Entity('flag')
export default class Flag {
  // id column
  @PrimaryColumn()
  id: number

  // id column
  @Column()
  signature: string

  // id column
  @Column({ name: 'is_needed' })
  isNeeded: boolean

  // id column
  @Column({ type: 'text' })
  description: string

  // id column
  @Column({ name: 'input_amount' })
  inputAmount: number

  // id column
  @Column()
  label: string

  // command id fk column
  @ManyToOne(
    (type) => Command,
    (command) => command,
    {
      cascade: true,
      nullable: false
    }
  )
  @JoinColumn([
    { name: 'fk_cmd_id', referencedColumnName: 'id' },
    { name: 'fk_software_cmd_id', referencedColumnName: 'softwareId' }
  ])
  cmdId: Command
}
