---
id: intro
sidebar_position: 6
---
# Ribozilla CLI to GUI  
O Ribozilla oferece essa API para que o desenvolvimento de novas extensões sejam mais simples e práticas para diferentes níveis de usuários.

## Classes

### `RibozillaExtension`

Inicialização de classe obrigatório para acessar os metódos posteriores, só pode ser instanciado uma vez por extensão.

- **Parâmetros do Construtor**

| Param | Tipo |Default| Descrição| Obrigatório|
|-|-|-|-|:-:|
| `name` | `string` | `undefined` |  Nome da extensão/software | ✅ |
| `version` | `string` | `undefined` |  Versão do software utilizado | ✅ |

- **Exemplo do construtor**
```ts
import RibozillaExtension, { Categories, ParamsTypes, InputTypes, RequiredTypes } from '../../../packages/ribozilla-clui-api/lib'
const extension = new RibozillaExtension('STAR', '2.7.9a')
```

## Métodos da Instância
### `command()`
Caso o software possua mais de um comando é possível configurar cada após o método `end()`

| Param | Tipo |Default| Descrição| Obrigatório|
|-|-|-|-|:-:|
| `command` | `string` | `undefined` | Define um comando do software | ✅ |

```ts
extension.command("STAR")
```

### `category()`

| Param | Tipo |Default| Descrição| Obrigatório|
|-|-|-|-|:-:|
| `category` | `Categories` | `undefined` | Categoria em que o software se encaixa | ✅ |

```ts
extension.category(Categories.GENOME_INDEX)
```


```ts
/* Categories */
export enum Categories {
  ALIGNMENT='Alignment',
  TRIMMING='Trimming',
  GENOME_INDEX='Genome Index',
  QUALITY_ASSESSMENT='Quality Assessment',
  OTHER='Other'
}
```

### `param()`

| Param | Tipo |Default| Descrição| Obrigatório|
|-|------------|-|-|:-:|
| `type` | `ParamTypes` | `undefined` | É uma flag ou argumento | ✅  |
| `signature` | `string` | `undefined` |  Forma da flag na linha de comando, se for argumento pode ser um nome definido pelo usuário | ✅ |
| `label` | `string` | `undefined` | Rótulo de exibição da flag/argumento na GUI|✅|
| `places` | `integer` | `undefined` | Quantidade de entradas de cada flag ou argumento | ✅|
| `inputs` | `[InputTypes,string[]?][]` | `undefined` | Tipos de entradas e opções que uma flag/argumento possui | ✅ |
| `isRequired` | `RequiredTypes` | `undefined` | Definir de flag/argumento aparecerá como entrada/saída nos nós |❌ |
| `separator` | `[string, string]` | `[' ', ' ']` | Separador de comando [0] e opções [1] da sintaxe da linha de comando | ❌ |
| `description` | `string` | `"Description"` |  Documentação da flag/commando |❌ |
| `lastValues` | `string[]` | `[]` |  Armazenador de valores no nó, não é utilizado no desenvolvimento da extensão  | ❌ |

:::note Nota
  * `places = 0` `InputTypes` devem ser `BOOLEAN` ou `ENUM `.
  * `places = -1` se as entradas forem 'ilimitadas' ou definidas pelo usuário.
  * `places >= 1` deve-se definir o tipo e os valores (opcional).
  * Se `InputTypes.ENUM` os valores são as opções disponíveis.
  * Se `InputTypes.BOOLEAN` os valores são um array vazio `[]`.
:::

```ts
ext.param(ParamsTypes.FLAG, '--runThreadN', 'Threads', 1, [[InputTypes.NUMBER]])
  .param(ParamsTypes.FLAG, '--runMode', 'Task mode', 0, [[InputTypes.ENUM, ['genomeGenerate']]])
  .param(ParamsTypes.FLAG, '--genomeDir', 'Genome Index', -1, [[InputTypes.DIR]], RequiredTypes.MAIN_OUT)
  .param(ParamsTypes.FLAG, '--genomeFastaFiles', 'Read files', -1, [[InputTypes.FILE]], RequiredTypes.MAIN_IN)
  .param(ParamsTypes.FLAG, '--sjdbGTFfile', 'Annotation', 1, [[InputTypes.FILE]], RequiredTypes.MAIN_IN)
  .param(ParamsTypes.ARG, '--sjdbOverhang', 'Read Length', 1, [[InputTypes.NUMBER, ['99']]], RequiredTypes.MAIN_OUT)
  .end()
```


```ts
export enum ParamsTypes {
  FLAG = 'flag',
  ARG = 'arg'
}
```

```ts
export enum InputTypes {
  ENUM='enum',
  STRING='string',
  BOOLEAN='boolean',
  NUMBER='number',
  DIR='dir',
  FILE='file'
}
```
```ts
export enum RequiredTypes {
  OPT_PARAM = 'opt/param',
  MAIN_IN = 'main/in',
  MAIN_OUT = 'main/out',
  REQ_IN = 'req/in',
  REQ_OUT = 'req/out'
}
```

### `end()`
- Uso obrigatório para finalizar o comando

```ts
ext.command('DCC')
  .category(Categories.OTHER)
  .param(ParamsTypes.ARG, '@samplesheet', 'Samplesheet', -1, [[InputTypes.FILE]], RequiredTypes.MAIN_IN)
  .param(ParamsTypes.FLAG, '-mt1', 'Mate 1', 1, [[InputTypes.FILE]], RequiredTypes.MAIN_IN)
  .param(ParamsTypes.FLAG, '-D', 'Detect circRNA', 0, [[InputTypes.BOOLEAN]])
  .param(ParamsTypes.FLAG, '-M', 'Filter Mitochondrial Candidates', 0, [[InputTypes.BOOLEAN]])
  .param(ParamsTypes.FLAG, '-R', 'Repeats Annotations', -1, [[InputTypes.FILE]], RequiredTypes.MAIN_IN)
  .param(ParamsTypes.FLAG, '-Nr', 'Replicates (min,max)', 2, [
    [InputTypes.NUMBER],
    [InputTypes.NUMBER]
  ])
  .end()
```

### `generateExtension()`
- Uso obrigatório para poder buildar o gerador da extensão

| Param | Tipo |Default| Descrição| Obrigatório|
|-|-|-|-|:-:|
| `filename` | `string` | `undefined` | Nome do arquivo de saída JSON | ✅ |
| `outDir` | `string` | `_dirname` | Diretório onde salva o arquivo JSON (Não alterar `_dirname`) | ✅ |

```ts
ext.generateExtension('dcc', __dirname)
```
