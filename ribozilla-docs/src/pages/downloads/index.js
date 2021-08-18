import React from 'react'
import Layout from '@theme/Layout'
import { SiWindows, SiApple, SiLinux } from 'react-icons/si'
import PropTypes from 'prop-types'
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment'
// import { getOs } from './utils'
import '../index.module.css'
import '../../css/downloads.css'

export const getOs = () => {
  if (navigator.platform.includes('Win')) { return 'win32' }
  if (navigator.platform.includes('Mac')) { return 'darwin' }
  if (navigator.platform.includes('Linux')) { return 'linux' }

  return 'linux'
}

function Header() {
  return (
    <header className="dl-header">
      <div className="title">
        Download Ribozilla 1.0.0-beta.0
      </div>
      <div className="desc">
        Disponível nas plataformas populares
      </div>
    </header>
  )
}

function Binary({ name, icon, requirement, os }) {
  return (
    <div className="os-spec mini">
      <div>
        {React.createElement(icon, { size: '2em' })}
      </div>
      <div className="info">
        <div className="os-name">
          {name}
        </div>
        <div>
          {requirement}
        </div>
        <div className="per-os-list">
          {os?.map(({ file, arch, href }) => (
            <div className="dl-link">
              {file}
              <a href={href ?? '?'} className="button button--primary href-arch">
                {arch}
              </a>
            </div>
          ))}

        </div>
      </div>
    </div>
  )
}

Binary.propTypes = {
  name: PropTypes.string,
  icon: PropTypes.element,
  requirement: PropTypes.string,
  os: PropTypes.arrayOf({
    file: PropTypes.string,
    arch: PropTypes.oneOf(['64-bit', '32-bit', 'ARM']),
    href: PropTypes.string
  })
}

function PlatformDownloader({ name, icon, requirement, href }) {
  return (
    <div className="os-spec">
      <div>
        {React.createElement(icon, { size: '5em' })}
      </div>
      <a href={href} className="button button--primary  ">{`Download para ${name}`.toUpperCase()}</a>
      <div>
        {requirement}
      </div>
    </div>
  )
}

PlatformDownloader.propTypes = {
  ...Binary.propTypes,
  href: PropTypes.string
}

const platformProps = {
  mac: {
    name: 'MacOS',
    icon: SiApple,
    requirement: 'macOS 10.9+',
    href: 'https://github.com/wapablos/ribozilla/releases/download/v1.0.0-beta.0/ribozilla-1.0.0-beta.0.dmg',
    os: [{
      file: 'DMG (Intel)',
      arch: '64-bit',
      href: 'https://github.com/wapablos/ribozilla/releases/download/v1.0.0-beta.0/ribozilla-1.0.0-beta.0.dmg'
    }]
  },
  win: {
    name: 'Windows',
    icon: SiWindows,
    requirement: 'Windows 7, 8, 10',
    href: 'https://github.com/wapablos/ribozilla/releases/download/v1.0.0-beta.0/ribozilla-setup-1.0.0-beta.0.exe',
    os: [{
      file: '.exe',
      arch: '64-bit',
      href: 'https://github.com/wapablos/ribozilla/releases/download/v1.0.0-beta.0/ribozilla-setup-1.0.0-beta.0.exe'
    }]
  },
  linux: {
    name: 'Linux',
    icon: SiLinux,
    requirement: 'LTS+',
    href: 'https://github.com/wapablos/ribozilla/releases/download/v1.0.0-beta.0/ribozilla-1.0.0-beta.0.AppImage',
    os: [
      { file: '.deb',
        arch: '64-bit',
        href: 'https://github.com/wapablos/ribozilla/releases/download/v1.0.0-beta.0/ribozilla_1.0.0_beta.0_amd64.deb' },
      { file: '.AppImage',
        arch: '64-bit',
        href: 'https://github.com/wapablos/ribozilla/releases/download/v1.0.0-beta.0/ribozilla-1.0.0-beta.0.AppImage' },
      { file: '.pacman',
        arch: '64-bit',
        href: 'https://github.com/wapablos/ribozilla/releases/download/v1.0.0-beta.0/ribozilla-1.0.0-beta.0.pacman' }]
  }
}

function DownloadPerOs() {
  switch (getOs()) {
    case 'win32':
      return <PlatformDownloader {...platformProps.win} />
    case 'darwin':
      return <PlatformDownloader {...platformProps.mac} />
    default:
      return <PlatformDownloader {...platformProps.linux} />
  }
}

function DownloadAllOs() {
  return (
    <div className="download-list">
      <Binary {...platformProps.mac} />
      <Binary {...platformProps.win} />
      <Binary {...platformProps.linux} />
    </div>
  )
}

export default function Home() {
  const location = ExecutionEnvironment.canUseDOM ? window.location.href : null

  return (
    <Layout title="Downloads" description="Get your Ribozilla release">
      <section className="dl-wrapper">
        <Header />
        {location && <DownloadPerOs />}
        <div className="divider-with-text">
          <span className="center-label">
            ou
          </span>
        </div>
        <DownloadAllOs />
      </section>
    </Layout>
  )
}
