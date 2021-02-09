module.exports = {
  title: 'Vue 3.x From Render',
  description: 'Just playing around',
  base: '/vue-form-render/',
  themeConfig: {
    logo: 'https://user-images.githubusercontent.com/21073039/104408849-ef6d2280-559f-11eb-93e4-fed00748e4b6.png',
    nav: [
      { text: '教程', link: '/guide/' },
      { text: '示例', link: 'https://muwoo.github.io/vue-form-render/dist/#/' },
    ],
    sidebar: [
      {
        title: '教程',   // 必要的
        path: '/guide/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        sidebarDepth: 1,    // 可选的, 默认值是 1
      },
      {
        title: '开始使用',
        path: '/start/',
      },
      {
        title: '相关组件',
        children: [
          {
            title: 'string',
            path: '/component/string'
          },
          {
            title: 'number',
            path: '/component/number'
          },
          {
            title: 'boolean',
            path: '/component/boolean'
          },
          {
            title: 'array',
            path: '/component/array'
          },
          {
            title: 'object',
            path: '/component/object'
          }
        ]
      },
    ],
    // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
    repo: 'muwoo/vue-form-render',
    // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
    // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
    repoLabel: 'Github',
    // 默认是 false, 设置为 true 来启用
    editLinks: true,
    // 默认为 "Edit this page"
    editLinkText: '帮助我们改善此页面！'
  }
}