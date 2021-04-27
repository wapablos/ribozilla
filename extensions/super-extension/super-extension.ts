import RibozillaExtension, { RibozillaExtensionValidator, Categories, ParamsTypes, InputTypes } from '../../packages/ribozilla-extension-api/lib'

const simple = new RibozillaExtension('Super', '0.2.0')

simple.command('STAR')
  .category(Categories.ALIGNMENT)
  .param(ParamsTypes.FLAG, '--Test', 'Meu Test', 0, [])
  .param(ParamsTypes.FLAG, '--Test', 'Meu Test', 0, [[InputTypes.ENUM, ['ConcordantPair', 'DiscordantPair']]])
  .param(ParamsTypes.FLAG, '--runThreadN', 'Threads', 1, [[InputTypes.NUMBER]], false)
  .param(ParamsTypes.FLAG, '--genomeDir', 'Genome', 1, [[InputTypes.DIR]])
  .param(ParamsTypes.FLAG, '--readFilesIn', 'Read files', -1, [[InputTypes.FILE]])
  .param(ParamsTypes.FLAG, '--alignEndsProtrude', 'Protrusion ends', 2, [
    [InputTypes.NUMBER],
    [InputTypes.ENUM, ['ConcordantPair', 'DiscordantPair']]
  ])
  .end()

simple.generateExtension(__dirname)
