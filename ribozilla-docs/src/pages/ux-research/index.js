import React from 'react'
import clsx from 'clsx'
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import '../../css/ux-research.css'
import PropTypes from 'prop-types'
import styles from '../index.module.css'
import homepageStyles from '../../components/HomepageFeatures.module.css'

const InstructionsList = [
  {
    title: 'Instale o Ribozilla',
    description: (
      <>
        Siga as instruções de instalação e aproveite para ver as funcionalidade disponíveis.
      </>
    )
  },
  {
    title: 'Siga nosso roteiro de testes',
    description: (
      <>
        Separe um tempo para realizar a atividade proposta e explore à vontade o interface do software.
      </>
    )
  },
  {
    title: 'Responda ao formulário',
    description: (
      <>
        Ao concluir as atividades do roteiro você poderá compartilhar sua experiência clicando no botão &quot;Então, como foi?&quot;.
      </>
    )
  }
]

function Instructions({ title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center" />
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}

Instructions.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string
}

function UXInfo() {
  return (
    <section className={clsx('hero hero--primary', styles.heroBanner, homepageStyles.features)}>
      <div className="container">
        <h1>
          Como participar?
        </h1>
        <div className="row">
          {InstructionsList.map((props, idx) => (
            <Instructions key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  )
}

function UXScript() {
  const scriptItems = [
    {
      description: (<> Baixe a versão mais recente do Ribozilla e realize a instalação (Como instala?) </>)
    },
    {
      description: (<> Baixe os dados de RNA-Seq. São levinhos não se preocupe</>)
    },
    {
      description: (<> Abra o Ribozilla e crie um novo projeto clicando no botão &quot;NEW PROJECT&quot; </>)
    },
    {
      description: (<> Após o projeto ser criado, inicie-o clicando em &quot;Start&quot;</>)
    },
    {
      description: (<> Clique na seção de Pipelines. Para adicionar um nó (software) clique na seta ao lado dele</>)
    },
    {
      description: (<> Monte a seguinte análise. Lembre de salvar o projeto, Ctrl+S (Windows) ou Cmd+S (Mac)</>)
    },
    {
      description: (<> Ao concluir, vá até a seção Toolbox, você verá que os comandos já estarão montados para serem executados</>)
    },
    {
      description: (<> Você pode editar (ícone com lápis) ou salvar (ícone de disquete).</>)
    },
    {
      description: (<> Se você fechar o programa ou quiser reajustar alguma informação, os scripts serão reajustados também.</>)
    },
    {
      description: (<> Se você chegou até aqui. Parabéns, você montou uma análise completa no Ribozilla, e pronta para ser executada.</>)
    }
  ]
  return (
    <div className="ux-div-section  ux-script">
      <ol>
        {scriptItems.map(({ description }, index) => (
          <li className="ux-script-item">
            {description}
          </li>
        ))}
      </ol>
    </div>
  )
}

function UXForm() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <header className={clsx(styles.heroBanner, 'ux-div-section')}>
      <div className="container">
        <h1 className="hero__title">Já terminei</h1>
        <p className="hero__subtitle">E agora?</p>
        <div className={clsx('button button--secondary button--lg')}>
          Então, como foi?
        </div>
      </div>
    </header>

  )
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout
      title="UX Research"
      description="Try a User Experience Test"
    >

      <UXInfo />

      <div className="page-wrapper">
        <UXScript />
        <UXForm />
      </div>
    </Layout>
  )
}
