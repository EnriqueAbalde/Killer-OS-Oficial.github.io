// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Killer-OS Linux',
  icon: {
    favicon: './src/assets/favicon.png',
    touchicon: './src/assets/favicon.png'
  },
  siteUrl: (process.env.SITE_URL ? process.env.SITE_URL : 'https://Killer-OS-Oficial.github.io'),
  settings: {
    web: process.env.URL_WEB || true,
    vk: process.env.URL_VK || false,
    github: process.env.URL_GITHUB || true,
    nav: {
      links: [
        { path: '/wiki', title: 'Wiki' },
        { path: '/wiki/changelog', title: 'Changelog' },
        { path: '/wiki/whois', title: 'About' },
        { path: '/donat', title: 'Apoyo' },
        { path: '/get', title: 'Descargar' }
      ]
    },
    sidebar: [
      {
        name: 'wiki',
        sections: [
          {
            title: 'Apoyo',
            items: [
              '/wiki/backup/timeshift-rsync/',
              '/wiki/backup/squashfs/',
              '/wiki/backup/netcat/',
            ]
          },
          {
            title: 'BSPWM',
            items: [
              '/wiki/wm/bspwm/',
            ]
          },
          {
            title: 'Programas',
            items: [
              '/wiki/packages/other-pkg/',
              '/wiki/packages/iwd/',
            ]
          },
          //{
          //  title: 'Configurando',
          //  items: [
          //    '/wiki/config/videocfg/',
          //    '/wiki/config/recomend/',
          //    '/wiki/config/trouble/',
          //    '/wiki/config/autologin/',
          //    '/wiki/config/ssh/',
          //  ]
          //},
          {
            title: 'Btrfs',
            items: [
              '/wiki/btrfs/btrfs-part1/',
              '/wiki/btrfs/btrfs-part2/',
            ]
          },
          {
            title: 'Otro',
            items: [
              '/wiki/other/notes/',
              '/wiki/other/gnupg/',
              '/wiki/other/grub-uefi/',
              '/wiki/other/screencast/',
              '/wiki/other/git-start/',
           ]
          }
        ]
      },
      {
        name: 'changelog',
        sections: [
          {
            title: 'Registro de Cambios',
            items: [
              '/wiki/changelog/',
            ]
          },
          {
            items: [
              '/wiki/changelog/bspwm-1-0/',
            ]
          }
        ]
      }
    ]
  },
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        baseDir: './content',
        path: 'wiki/**/*.md',
        typeName: 'MarkdownPage',
        remark: {
          externalLinksTarget: '_blank',
          externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
          plugins: [
            '@gridsome/remark-prismjs'
          ]
        }
      }
    },
    {
      use: '@gridsome/vue-remark',
      options: {
        typeName: 'MdPage',
        baseDir: './mdpages',
        route: '/:slug',
        template: './src/templates/MdPage.vue',
        remark: {
          externalLinksTarget: '_blank',
          externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
          plugins: [
            '@gridsome/remark-prismjs'
          ]
        }
      }
    },

    {
      use: 'gridsome-plugin-rss',
      options: {
        contentTypeName: 'MarkdownPage',
        feedOptions: {
          title: 'Killer-OS Linux Wiki',
          description: 'Documentación de Killer-OS Linux',
          feed_url: 'https://Killer-OS-Oficial.github.io/wiki/feed.xml',
          site_url: 'https://Killer-OS-Oficial.github.io/wiki'
        },
        feedItemOptions: node => ({
          title: node.title,
          description: node.excerpt,
          date: node.date,
          url: 'https://Killer-OS-Oficial.github.io' + node.path,
        }),
        output: {
          dir: './static/wiki',
          name: 'feed'
        }
      }
    },

    {
      use: 'gridsome-plugin-tailwindcss',
      options: {
        tailwindConfig: './tailwind.config.js',
        purgeConfig: {
          // Prevent purging of prism classes.
          whitelistPatternsChildren: [
            /token$/
          ]
        }
      }
    },

    {
      use: '@gridsome/plugin-google-analytics',
      options: {
        id: (process.env.GA_ID ? process.env.GA_ID : '#')
      }
    },
    {
      use: 'gridsome-plugin-yandex-metrika',
      options: {
        id: 67192255
      }
    },

    {
      use: '@gridsome/plugin-sitemap',
      options: {
      }
    }
  ]
}
