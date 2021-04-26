import RibozillaExtension, { RibozillaExtensionValidator } from '../../packages/ribozilla-extension-api/lib'

const simple = new RibozillaExtension('Super', '0.2.0')

simple.generateExtension(__dirname)
