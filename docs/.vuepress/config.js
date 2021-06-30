module.exports = {
  title: 'MHXW',
  description: 'mhxw blog',
  theme: require.resolve('../../'),
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],
    ['meta', { name: 'MHXW', content: 'mhxw blog' }],
  ],
  base:'/note/',
  themeConfig: {
    dateFormat: 'YYYY-MM-DD',
    author: "MHXW",
    repo: "github.com/mhxw/note",
    docsDir: "docs",
    editLinks: true,
    editLinkText: "在 GitHub 上编辑此页",
    lastUpdated: "Last Updated",
    nav: [
      {
        text: '首页',
        link: '/',
      },
      {
        text: '标签',
        link: '/tag/',
      },
      {
        text: '关于',
        link: '/about',
      },
    ],
    footer: {
      contact: [
        {
          type: 'github',
          link: 'https://github.com/mhxw',
        },
      ],
      copyright: [
        {
          text: 'Copyright © 2017-Present Powered by MHXW',
        },
      ],
    },
    globalPagination: {
      lengthPerPage: 10,
      prevText: '上一页',
      nextText: '下一页'
    },
    frontmatters: [
      {
        id: "tag",
        keys: ['tag', 'tags'],
        path: '/tag/',
      },
      {
        id: "location",
        keys: ['location'],
        path: '/location/',
      },
    ],
    sitemap: {
      hostname: 'https://mhxw.life/'
    },
    locales: {
      '/': {
        lang: 'zh-CN', // 将会被设置为 <html> 的 lang 属性
        title: "MHXW",
        description: 'MHXW blog'
      },
    },
    feed: {
      canonical_base: 'https://mhxw.life/',
    },
    pwa:true,
    smoothScroll: true
  },
  plugins: [
    [
      [
        "@mr-hope/copy-code",
        {
          // 你的选项
        },
      ],
    ],
  ],
}
