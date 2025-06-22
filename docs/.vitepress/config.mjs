import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Vibe Coding',
  description: 'Harmonize Your Workflow',

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'English Guide', link: '/en/' },
      { text: 'Chinese Guide', link: '/zh/' }
    ],

    sidebar: {
      '/': [
        {
          text: 'Welcome',
          items: [
            { text: 'Vibe Coding Introduction', link: '/' }
          ]
        },
        {
          text: 'Language Guides',
          items: [
            { text: 'English Guide', link: '/en/' },
            { text: 'Chinese Guide', link: '/zh/' }
          ]
        }
      ],
      '/en/': [
        {
          text: 'Foundation',
          items: [
            { text: 'Introduction to Vibe Coding', link: '/en/foundation/introduction' },
            { text: 'IDE Setup', link: '/en/foundation/ide-setup' },
            { text: 'AI Integration', link: '/en/foundation/ai-integration' }
          ]
        },
        {
          text: 'Lifecycle',
          items: [
            { text: 'Project Scaffolding', link: '/en/lifecycle/project-scaffolding' },
            { text: 'AI-Assisted Coding', link: '/en/lifecycle/ai-coding' },
            { text: 'Debugging & Testing', link: '/en/lifecycle/debugging-testing' },
            { text: 'Refactoring & Quality', link: '/en/lifecycle/refactoring-quality' },
            { text: 'Data Integration', link: '/en/lifecycle/data-integration' },
            { text: 'DevOps & SRE', link: '/en/lifecycle/devops-sre' }
          ]
        },
        {
          text: 'Advanced',
          items: [
            { text: 'Tips & Tricks', link: '/en/advanced/tips-tricks' },
            { text: 'Conclusion', link: '/en/advanced/conclusion' }
          ]
        },
        {
          text: 'Examples',
          items: [
            { text: 'Markdown Examples', link: '/en/markdown-examples' },
            { text: 'Runtime API Examples', link: '/en/api-examples' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],

    algolia: {
      appId: 'YOUR_APP_ID',
      apiKey: 'YOUR_API_KEY',
      indexName: 'YOUR_INDEX_NAME'
    }
  },

  locales: {
    root: {
      label: 'Home',
      lang: 'en'
    },
    en: {
      label: 'English',
      lang: 'en',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Foundation', link: '/en/foundation/introduction' },
          { text: 'Lifecycle', link: '/en/lifecycle/project-scaffolding' },
          { text: 'Advanced', link: '/en/advanced/tips-tricks' }
        ],
        sidebar: [
          {
            text: 'Foundation',
            items: [
              { text: 'Introduction to Vibe Coding', link: '/en/foundation/introduction' },
              { text: 'IDE Setup', link: '/en/foundation/ide-setup' },
              { text: 'AI Integration', link: '/en/foundation/ai-integration' }
            ]
          },
          {
            text: 'Lifecycle',
            items: [
              { text: 'Project Scaffolding', link: '/en/lifecycle/project-scaffolding' },
              { text: 'AI-Assisted Coding', link: '/en/lifecycle/ai-coding' },
              { text: 'Debugging & Testing', link: '/en/lifecycle/debugging-testing' },
              { text: 'Refactoring & Quality', link: '/en/lifecycle/refactoring-quality' },
              { text: 'Data Integration', link: '/en/lifecycle/data-integration' },
              { text: 'DevOps & SRE', link: '/en/lifecycle/devops-sre' }
            ]
          },
          {
            text: 'Advanced',
            items: [
              { text: 'Tips & Tricks', link: '/en/advanced/tips-tricks' },
              { text: 'Conclusion', link: '/en/advanced/conclusion' }
            ]
          },
          {
            text: 'Examples',
            items: [
              { text: 'Markdown Examples', link: '/en/markdown-examples' },
              { text: 'Runtime API Examples', link: '/en/api-examples' }
            ]
          }
        ]
      }
    },
    zh: {
      label: 'Chinese',
      lang: 'zh',
      themeConfig: {
        nav: [
          { text: '主页', link: '/zh/' },
          { text: '示例', link: '/zh/markdown-examples' }
        ],
        sidebar: [
          {
            text: '示例',
            items: [
              { text: 'Markdown 示例', link: '/zh/markdown-examples' },
              { text: '运行时 API 示例', link: '/zh/api-examples' }
            ]
          },
          {
            text: '指南',
            items: [
              { text: '快速开始', link: '/zh/guide/getting-started' }
            ]
          }
        ]
      }
    }
  }
})
