---
sidebar_position: 2
---

# Ribozilla Development Mode

## Get the source code

  You can get the source code cloning the repository using the following command:

    git clone https://github.com/wapablos/ribozilla.git

## Install dependencies and serve application
```bash
yarn install-dev
yarn server:all
```
## Run the docs
```bash
cd ribozilla-docs
yarn start
```

- On browser go to `http://localhost:3000/`

## Setup extensions
```bash
cd extensions
yarn install 
```
## Create new extension
```bash
mkdir my-extension
cd my-extension
touch my-extension.ts
```
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

Please check the [API](../api/intro.md) to get the functions parameters