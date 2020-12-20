import RibozillaExtension from '../api'

const ext = new RibozillaExtension('STAR', '2.7.6a')

ext.command('STAR')
  .category('genindex')
  .flag('--runThreadN', 'Threads', 1, [['number']], false)
  .flag('--runMode', 'Task', 1, [['enum', ['alignReads', 'genomeGenerate']]], true)
  .flag('--genomeDir', 'Genome', 1, [['dir']], true)
  .flag('--genomeFastaFile', 'Fasta files', -1, [['file']], true)
  .flag('--sjdbGTFfile', 'Annotation file', 1, [['file']], true)
  .flag('--sjdbOverhang', 'Reads length', 1, [['number']], true)
  .end()

ext.command('STAR')
  .category('alignment')
  .flag('--runThreadN', 'Threads', 1, [['number']], false)
  .flag('--genomeDir', 'Genome', 1, [['dir']], true)
  .flag('--readFilesIn', 'Read files', -1, [['file']], true)
  .flag('--alignEndsProtrude', 'Protrusion ends', 2, [['number', []], ['enum', ['ConcordantPair', 'DiscordantPair']]], false)
  .end()

ext.stringIt(true, 'star')
