import RibozillaExtension from '../api'
import { Categories, ParamsTypes, InputTypes } from '../api/types'

const ext = new RibozillaExtension('STAR', '2.7.6a')

ext.command('STAR')
  .category(Categories.GENOME_INDEX)
  .param(ParamsTypes.FLAG, '--runThreadN', 'Threads', 1, [[InputTypes.NUMBER]], false)
  .param(ParamsTypes.FLAG, '--runMode', 'Task', 1, [[InputTypes.ENUM, ['alignReads', 'genomeGenerate']]], true)
  .param(ParamsTypes.FLAG, '--genomeDir', 'Genome', 1, [[InputTypes.DIR]], true)
  .param(ParamsTypes.FLAG, '--genomeFastaFile', 'Fasta files', -1, [[InputTypes.FILE]], true)
  .param(ParamsTypes.FLAG, '--sjdbGTFfile', 'Annotation file', 1, [[InputTypes.FILE]], true)
  .param(ParamsTypes.FLAG, '--sjdbOverhang', 'Reads length', 1, [[InputTypes.NUMBER]], true)
  .end()

ext.command('STAR')
  .category(Categories.ALIGNMET)
  .param(ParamsTypes.FLAG, '--runThreadN', 'Threads', 1, [[InputTypes.NUMBER]], false)
  .param(ParamsTypes.FLAG, '--genomeDir', 'Genome', 1, [[InputTypes.DIR]], true)
  .param(ParamsTypes.FLAG, '--readFilesIn', 'Read files', -1, [[InputTypes.FILE]], true)
  .param(ParamsTypes.FLAG, '--alignEndsProtrude', 'Protrusion ends', 2, [
    [InputTypes.NUMBER],
    [InputTypes.ENUM, ['ConcordantPair', 'DiscordantPair']]
  ], false)
  .end()

ext.stringIt(true, 'star')
