import React from 'react'
import clsx from 'clsx'
import styles from './HomepageFeatures.module.css'

const FeatureList = [
  {
    title: 'Fácil de usar',
    Svg: require('../../static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Ribozilla foi projetado para realizar montagem de processos de sequenciamento de nova geração de forma simples e rápida
        e para facilitar o entendimento dos recursos que o usuário está utilizando.
      </>
    )
  },
  {
    title: 'Com foco no que importa',
    Svg: require('../../static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        O Ribozilla disponibiliza um repositório de softwares CLI que pode ser baixado e
        utilizado diretamente em sua interface sem se preocupar com problemas de compatibilidade e refatorações de scripts CLI.
      </>
    )
  },
  {
    title: 'Arquitetura Flexível',
    Svg: require('../../static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        O software foi projetado para que tanto usuário finais e desenvolvedores possam escalar o uso da aplicação de forma totalmente livre
      </>
    )
  }
]

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  )
}
