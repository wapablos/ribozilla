import {
  Entity, PrimaryColumn, ManyToOne, JoinColumn, Column
} from 'typeorm'
import Command from './Command'
import Flag from './Flag'

@Entity('argument')
export default class Argument {
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

  // type column
  @Column()
  type: string

  // default values column
  @Column({ name: 'default_value', type: 'simple-json' })
  defaultValue: string

  // argument position column
  @Column({ name: 'arg_position' })
  argPositon: string

  // flag id fk column
  @ManyToOne(
    (type) => Flag,
    (flag) => flag.id,
    {
      primary: false,
      cascade: true,
      onDelete: 'CASCADE',
      nullable: true
    }
  )
  @JoinColumn({ name: 'fk_flag_id' })
  flagId: Flag

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
