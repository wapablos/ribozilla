import React from 'react'
import clsx from 'clsx'
import styles from './HomepageFeatures.module.css'

const FeatureList = [
  {
    title: 'Fácil de usar',
    Svg: require('../../static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Ribozilla foi projetado para realizar montagem de pipelines utilizados na análise de sequenciamento de nova geração de forma fácil e rápida.
      </>
    )
  },
  {
    title: 'Com foco no que importa',
    Svg: require('../../static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        O Ribozilla disponibiliza um repositório de extensões de softwares CLI que podem ser baixados e
        utilizados diretamente em sua interface sem se preocupar com problemas de compatibilidade e refatorações e sintaxe dos scripts.
      </>
    )
  },
  {
    title: 'Arquitetura Flexível',
    Svg: require('../../static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        O software foi projetado para que tanto usuários finais e desenvolvedores possam ampliar o uso da aplicação de forma totalmente livre e personalizada.
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
