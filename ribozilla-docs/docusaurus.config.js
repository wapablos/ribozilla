/* eslint-disable semi */
const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Ribozilla',
  tagline: 'Playing with genetics',
  url: 'https://ribozilla.netlify.app',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/ribozilla.ico',
  organizationName: 'wapablos', // Usually your GitHub org/user name.
  projectName: 'ribozilla', // Usually your repo name.
  i18n: {
    defaultLocale: 'pt-BR',
    locales: ['en', 'pt-BR']
  },
  themeConfig: {
    colorMode: {
      defaultMode: 'dark'
    },
    navbar: {
      title: 'Ribozilla',
      logo: {
        alt: 'Ribozilla Logo',
        src: 'img/ribozilla.ico'
      },
      items: [
        { type: 'doc', docId: 'intro', position: 'left', label: 'Docs' },
        { type: 'doc', docId: 'api/intro', position: 'left', label: 'API' },
        // { to: '/blog', label: 'Blog', position: 'left' },
        // {
        //   type: 'localeDropdown',
        //   position: 'right'
        // },
        { to: '/ux-research', label: 'UX Research', position: 'right' },
        { to: '/downloads', label: 'Downloads', position: 'right' },
        {
          href: 'https://github.com/wapablos/ribozilla',
          label: 'GitHub',
          position: 'right'
        }
      ]
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/docs/intro'
            }
          ]
        },
        {
          title: 'Contribuição',
          items: [
            {
              label: 'Blog',
              to: '/blog'
            },
            {
              label: 'GitHub',
              href: 'https://github.com/wapablos/ribozilla'
            }
          ]
        },
        {
          title: 'Sobre Nós',
          items: [
            {
              label: 'LGHM-UFPA',
              href: 'https://www.lghm.com.br/'
            }
          ]
        }
      ],
      copyright: `Copyright © 2020-${new Date().getFullYear()} wapablos & contributors. Built with Docusaurus.`
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
      additionalLanguages: ['powershell']
    }
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: 'docs',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/facebook/docusaurus/edit/master/website/'
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl: 'https://github.com/facebook/docusaurus/edit/master/website/blog/'
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        }
      }
    ]
  ]
}
