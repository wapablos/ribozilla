import RibozillaExtension, { Categories, ParamsTypes, InputTypes } from '../../packages/ribozilla-extension-api'

const simple = new RibozillaExtension('Simple', '1.0.0')

simple.command('SOF1')
  .category(Categories.ALIGNMENT)
  .param(ParamsTypes.FLAG, '--TOP', 'Meu TOP', 0, [])
  .end()

simple.command('SOF2')
  .category(Categories.QUALITY_ASSESSMENT)
  .param(ParamsTypes.FLAG, '--fgdsfgsd', 'fdgdsf', 0, [])
  .end()

simple.command('SOF3')
  .category(Categories.QUALITY_ASSESSMENT)
  .param(ParamsTypes.FLAG, '--usudfhs', 'fdgdsUUHUHUUf', 0, [])
  .end()

simple.generateExtension(__dirname)
