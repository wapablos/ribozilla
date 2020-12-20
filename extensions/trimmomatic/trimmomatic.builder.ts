import RibozillaExtension from '../api'

const ext = new RibozillaExtension('Trimmomatic', '0.39')

ext.command('java -jar trimmomatic.jar')
  .category('trimming')
  .argument('trimm_mode', 'Trimm mode', 0, [['enum', ['SE', 'PE']]], true, 'main')
  .flag('-threads', 'Threads', 1, [['number']], false)
  .argument('phred_encoding', 'Phred encoding', 0, [['enum', ['-phred33', '-phred64']]], true)
  .end()

ext.stringIt(true, 'trimmomatic')
