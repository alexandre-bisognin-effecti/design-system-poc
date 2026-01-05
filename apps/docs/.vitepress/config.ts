import { defineConfig } from "vitepress";

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  title: "DS Effecti",
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/introduction' },
      { text: 'Components', link: '/components/' }
    ],
    
    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introdução', link: '/guide/introduction' },
            { text: 'Instalação', link: '/guide/installation' }
          ]
        }
      ],
      '/components/': [
        {
          text: 'Development',
          collapsed: false,
          items: [
            { text: 'Quick Start', link: '/components/development/quick-start' }
          ]
        },
        {
          text: 'Básicos',
          collapsed: false,
          items: [
            { text: 'Button', link: '/components/me-button/me-button' },
            { text: 'Input', link: '/components/input' },
            { text: 'Checkbox', link: '/components/checkbox' }
          ]
        },
        {
          text: 'Feedback',
          collapsed: false,
          items: [
            { text: 'Alert', link: '/components/alert' },
            { text: 'Toast', link: '/components/toast' },
            { text: 'Modal', link: '/components/modal' }
          ]
        },
        {
          text: 'Navegação',
          collapsed: false,
          items: [
            { text: 'Menu', link: '/components/menu' },
            { text: 'Tabs', link: '/components/tabs' },
            { text: 'Breadcrumb', link: '/components/breadcrumb' }
          ]
        }
      ]
    },
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/seu-org/design-system' }
    ]
  }
});
