import RibozillaExtension, { Categories } from '../../packages/ribozilla-extension-api'

const simple = new RibozillaExtension('Simple', '1.0.0')

simple.command('STAR')
  .category(Categories.ALIGNMENT)

simple.command('STAR')
  .category(Categories.GENOME_INDEX)

simple.generateExtension(__dirname)
