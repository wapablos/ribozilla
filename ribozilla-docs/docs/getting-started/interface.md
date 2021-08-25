---
sidebar_position: 2
---

# Interface do Ribozilla

Nesta seção, vamos nos familiarizar com a interface do **Ribozilla** e ver a utilização de cada funcionalidade.

:::info
O **Ribozilla** ainda está em fase de desenvolvimento e nem todas as funcionalidades estão completas. Estão disponíveis somente as principais funcionalidades definidas no início do projeto.
:::

## Elementos da Interface
Para proseguir sua jornada com o uso do Ribozilla é essencial entender como funciona sua interface, que por sinal é bem simples.

<img src="/img/interface/interface.png" width="80%"/>

- **(A)** A **Barra de Menu** permite acessar recursos básicos da aplicação, tais como os projeto atuais, informações, configuração e também gerenciamento de arquivos. No MacOS, as opções são exibidas no menu global.  
- **(B)** A **Barra de Ferramentas** contém as funcionalidades da aplicação, entre elas, o gerenciamento de **projetos**, montagem de **pipelines**, seção de **resultados** (Toolbox) e gerenciador de **extensões**. Se você pousar o mouse sobre os ícones será exibido o nome das seções.
- **(C)** O **Workspace** é a região onde é exibida a interface de cada funcionalidade.  
- **(D)** A **Barra de status** exibe as informações sobre o projetos, notificações e conexões remotas(ainda não implementada).  

# Funcionalidades


## Projetos
A seção onde você inicia seus experimentos dando um nome e uma descrição, além de escolher um lugar onde cada projeto vai ficar.

<img src="/img/interface/projects.png" width="80%"/>

- **(A)** Ao clicar em 'NEW PROJECT' um *card* vai aparecer requisitando informações de um novo projeto  
- **(B)** Todos os projetos criados ficarão disponíveis nessa inicial e serão sincronizados no diretório escolhido anteriormente.

:::info
Para desbloquear as outras funcionalidades é preciso inicar um projeto, com exceção a seção de **Extensões**
:::


## Pipelines
Aqui você monta seu pipeline e configura seus parâmetros utilizando os softwares (extensões) disponíveis.

<img src="/img/interface/pipeline.png" width="80%"/>

- **Marcador vermelho** indica o **projeto** que está aberto. O ponto ao lado indica que ele possui alterações e precisa ser salvo.
- **(A)** **Lista de softwares** disponíveis para ser configurado no Ribozilla, todas as que foram instaladas na seção de **Extensões**, serão exibidas nesta lista. E ao clicar no ícone ao lado de cada software, um novo nó é adicionado e, por sua vez, um respectivo card será exibido.
- **(B)** **Editor de nós**, todos os softwares adicionados em forma de um nó que pode conter conectores de entradas de dados (verde) e de saídas (rosa).
- **(C)** **Cards** são versões extendidas de um nó, é nele que são realizadas configuraçãos dos paramêtros relacionados a um software escolhido. O rótulo acima do *card* exibe o código de seu respectivo nó e o commando do software que será configurado.

:::caution atenção
Para salvar o arquivo utilize `Ctrl+S`
:::

## Toolbox
Nesta seção todas os softwares e ajustes realizados são convertidos em um script de linha de comando, obedecendo as flags, parâmetros e sintaxe, que foram configuradas na extensão.

<img src="/img/interface/toolbox.png" width="80%"/>

- Ícone de **Disquete** permite escolher um local para salvar o script.
- Ícone de **Lápis** edita o script.

## Extensões
Você pode adicionar em seu pipeline qualquer software que estiver disponível ou até mesmo [criar uma nova extensão](/docs/developers-guide/start-ribozilla#criar-nova-extensão) para uso próprio.

<img src="/img/interface/extensions.png" width="80%"/>

- **(A)** Lista das extensões instaladas. As mesmas estão disponíveis na seção de **Pipelines**.
- **(B)** Lista das extensões disponíveis para download.