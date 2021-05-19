/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Ribozilla',
  tagline: 'Playing with genetics',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/medusa.svg',
  organizationName: 'wapablos', // Usually your GitHub org/user name.
  projectName: 'ribozilla', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Ribozilla',
      logo: {
        alt: 'Ribozilla Logo',
        src: 'img/medusa.svg'
      },
      items: [
        { type: 'doc', docId: 'intro', position: 'left', label: 'Docs' },
        { to: '/api/getting-started', activeBaseRegex: '/api/', position: 'left', label: 'API' },
        { to: '/blog', label: 'Blog', position: 'left' },
        { to: '/ux-research', label: 'UX Research', position: 'right' },
        { to: '/downloads', label: 'Downloads', position: 'right' },
        {
          href: 'https://github.com/wapablos/ribozilla',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository'
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
          title: 'Community',
          items: [
            {
              label: 'Twitter',
              href: 'https://twitter.com/ribozilla'
            }
          ]
        },
        {
          title: 'More',
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
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Tunguska Cyberpunk, Inc. Built with Docusaurus.`
    }
  },
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'api',
        path: 'docs/api',
        routeBasePath: 'api',
        include: ['**/*.md', '**/*.mdx'],
        sidebarPath: require.resolve('./sidebarsApi.js')
      }
    ]
  ],
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
