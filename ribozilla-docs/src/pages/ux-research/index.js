/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import clsx from 'clsx'
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import '../../css/ux-research.css'
import PropTypes from 'prop-types'
import styles from '../index.module.css'
import homepageStyles from '../../components/HomepageFeatures.module.css'
import ScriptImage from '../../../static/img/script-bioinfo.svg'

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
      description: (
        <>
          Baixe a versão mais recente do Ribozilla e realize a instalação
          {' '}
          <a href="/docs/getting-started/installation">(Como instala?) </a>
        </>)
    },
    {
      description: (
        <>
          Você irá precisar baixar as extensões do teste. Elas permitem montar scripts simples, mas podem ser melhoradas utilizando a API.
          {' '}
          <a href="https://github.com/wapablos/ribozilla/releases/download/v1.0.0-beta.0/ux-extensions.zip">Baixe aqui</a>
          {' '}
          e copie os arquivos
          {' '}
          <b>.manifest.json</b>
          {' '}
          para:
          <ul>
            <li>
              (Mac & Windows ) -
              {' '}
              <b>/Users/seu_usuario/.ribozilla/extensions</b>
              {' '}
            </li>
            <li>
              (Linux) -
              {' '}
              <b>/home/seu_usuario/.ribozilla/extensions</b>
            </li>
          </ul>
        </>)
    },
    {
      description: (
        <>
          {' '}
          Se você não tem dados ou experiência, não se preocupe. Fizemos um modelo que simula arquivos para uma análise, e é ideal para realizar esse roteiro.
          {' '}
          <a href="https://github.com/wapablos/ribozilla/releases/download/v1.0.0-beta.0/ribozilla-analysis.zip">Baixe aqui</a>
          {' '}
          e descompacte.
          {' '}
        </>)
    },
    {
      description: (
        <>
          {' '}
          Abra o Ribozilla e crie um novo projeto clicando no botão
          {' '}
          <b>NEW PROJECT</b>
          {' '}
        </>)
    },
    {
      description: (
        <>
          {' '}
          Após o projeto ser criado, inicie-o clicando em
          {' '}
          <b>START</b>
        </>)
    },
    {
      description: (
        <>
          Vá na seção de
          {' '}
          <b>Pipelines</b>
          . Para adicionar um nó (software) clique na seta ao lado dele.
        </>)
    },
    {
      description: (
        <>
          Monte a seguinte análise e lembre de salvar o projeto, Ctrl+S (Windows) ou Cmd+S (Mac)
          <img src="../../../static/img/script-bioinfo.png" style={{ width: '100%' }} />
        </>)
    },
    {
      description: (
        <>
          {' '}
          Ao concluir, vá até a seção
          {' '}
          <b>Toolbox</b>
          , você verá que os comandos já estarão montados para serem executados
        </>)
    },
    {
      description: (<> Você pode editar (ícone com lápis) ou salvar (ícone de disquete).</>)
    },
    {
      description: (<> Se você fechar o programa ou quiser reajustar alguma informação, os scripts serão reajustados também.</>)
    },
    {
      description: (<> Se você chegou até aqui. Parabéns, você montou uma análise completa no Ribozilla, que pode ser executada se os programas estiverem instalados na máquina.</>)
    }
  ]
  return (
    <div className="ux-div-section  ux-script">
      <ul>
        {scriptItems.map(({ description }, index) => (
          <li className="ux-script-item">
            {description}
          </li>
        ))}
      </ul>
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
        <Link className={clsx('button button--secondary button--lg')} to="https://forms.gle/96eLrFaHX7A2Xjpk7" target="_blank">
          Então, como foi?
        </Link>
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
