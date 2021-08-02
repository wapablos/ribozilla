import React from 'react'
import Layout from '@theme/Layout'
import { SiWindows, SiApple, SiDebian, SiArchlinux, SiLinux } from 'react-icons/si'
import PropTypes from 'prop-types'
import { getOs } from './utils'
import '../../css/downloads.css'

function Header() {
  return (
    <header className="dl-header">
      <div className="title">
        Download Ribozilla
      </div>
      <div className="desc">
        Works on all popular platforms
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
              <a href={href ?? '?'} className="href-arch">
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
      <a href={href} className="download-link-button">{`Download for ${name}`.toUpperCase()}</a>
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
    href: 'https://wire-app.wire.com/linux/Wire-3.26.2941_x86_64.AppImage',
    os: [{
      file: 'DMG (Intel)',
      arch: '64-bit'
    }]
  },
  win: {
    name: 'Windows',
    icon: SiWindows,
    requirement: 'Windows 7, 8, 10',
    os: [{
      file: 'User Installer',
      arch: '64-bit'
    }]
  },
  linux: {
    name: 'Linux',
    icon: SiLinux,
    requirement: 'LTS+',
    os: [
      { file: '.deb',
        arch: '64-bit' },
      { file: '.AppImage',
        arch: '64-bit' },
      { file: '.pacman',
        arch: '64-bit' }]
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
  return (
    <Layout title="Downloads" description="Get your Ribozilla release">
      <section className="dl-wrapper">
        <Header />
        <DownloadPerOs />
        <div className="divider-with-text">
          <span className="center-label">
            or
          </span>
        </div>
        <DownloadAllOs />
      </section>
    </Layout>
  )
}
