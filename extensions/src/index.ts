import 'reflect-metadata'
import { createConnection, Connection } from 'typeorm'
import Software from './entity/Software'

createConnection()
  .then(() => console.log('Connected!'))
  .catch((e) => console.error(`Error: ${e}`))
