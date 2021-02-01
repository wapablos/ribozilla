import RibozillaExtension from '../api'
import { Categories, InputTypes, ParamsTypes } from '../api/types'

const ext = new RibozillaExtension('Trimmomatic', '0.39')

ext.command('java -jar trimmomatic.jar')
  .category(Categories.TRIMMING)
  .param(ParamsTypes.FLAG, '-threads', 'Threads', 1, [[InputTypes.NUMBER]], false)
  .param(ParamsTypes.ARG, 'trimm_mode', 'Trimm mode', 0, [[InputTypes.ENUM, ['SE', 'PE']]], true, 'main')
  .param(ParamsTypes.ARG, 'phred_encoding', 'Phred encoding', 0, [[InputTypes.ENUM, ['-phred33', '-phred64']]], true)
  .end()

ext.stringIt(true, 'trimmomatic')
