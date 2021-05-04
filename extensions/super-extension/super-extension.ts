import RibozillaExtension, { RibozillaExtensionValidator, Categories, ParamsTypes, InputTypes, RequiredTypes } from '../../packages/ribozilla-extension-api/lib'

const simple = new RibozillaExtension('Super', '0.2.0')

simple.command('The Big One')
  .category(Categories.ALIGNMENT)
  .param(ParamsTypes.FLAG, '--Test', 'Meu Test', 0, [])
  .param(ParamsTypes.FLAG, '--Test', 'Meu Test', 0, [[InputTypes.ENUM, ['ConcordantPair', 'DiscordantPair']]])
  .param(ParamsTypes.FLAG, '--runThreadN', 'Threads', 1, [[InputTypes.NUMBER]], RequiredTypes.COMMON_OUT)
  .param(ParamsTypes.FLAG, '--genomeDir', 'Genome', 1, [[InputTypes.DIR]], RequiredTypes.MAIN_IN)
  .param(ParamsTypes.FLAG, '--readFilesIn', 'Read files', -1, [[InputTypes.FILE]], RequiredTypes.MAIN_IN)
  .param(ParamsTypes.FLAG, '--alignEndsProtrude', 'Protrusion ends', 2, [
    [InputTypes.NUMBER],
    [InputTypes.ENUM, ['ConcordantPair', 'DiscordantPair']]
  ])
  .param(ParamsTypes.ARG, 'out', 'My Output', -1, [[InputTypes.FILE]], RequiredTypes.MAIN_OUT)
  .end()

simple.generateExtension('super-extension', __dirname)
