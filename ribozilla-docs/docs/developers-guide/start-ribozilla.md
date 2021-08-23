---
sidebar_position: 2
---

# Ribozilla Development Mode

## Obter o código-fonte

  Você pode obter o código-fonte clonando o repositório usando o seguinte comando:

    git clone https://github.com/wapablos/ribozilla.git

## Instalar dependências e iniciar o aplicativo
```bash
yarn install-dev
yarn server:all
```
## Inicializar a documentação
```bash
cd ribozilla-docs
yarn start
```

- On browser go to `http://localhost:3000/`

## Configurar as extensões
```bash
cd ribozilla-extensions
yarn install 
```
## Criar nova extensão
Se você quiser adicionar um novo software para configurar na interface do Ribozilla

```bash
cd cli
mkdir my-extension
cd my-extension
touch my-extension.ts
```

Para iniciar o código base, é necessário importar os métodos do pacote `ribozilla-clui-api`
```ts
/* my-extension.ts */
import RibozillaExtension, { Categories, ParamsTypes, InputTypes, RequiredTypes } from '../../packages/ribozilla-clui-api/lib'

const extension = new RibozillaExtension('Software Name', '1.0.0')

extension.command('software-cmd-1')
  .category(Categories.OTHER)
  .param(ParamsTypes.ARG, 'output', 'Output', -1, [[InputTypes.FILE]], RequiredTypes.MAIN_IN)
  .end()

extension.command('software-cmd-2')
  .category(Categories.ALIGNMENT)
  .param(ParamsTypes.FLAG, '-mt1', 'Mate 1', 1, [[InputTypes.FILE]])
  .end()

extension.generateExtension('filename', __dirname)
```
```bash
yarn build
node my-extension/my-extension.js
```

Verifique a  [API](../api/intro.md) para mais informações dos métodos disponíveis.