# Longchang Liu's Personal Website

这是一个部署在 GitHub Pages 上的纯静态个人网站，包含个人主页、精选项目和可搜索的技术 Archive。

线上地址：[https://leochame.github.io/](https://leochame.github.io/)

## 本地预览

```bash
python3 -m http.server 8000
```

打开 [http://localhost:8000/](http://localhost:8000/)。

## 结构

```text
.
├── index.html              # 个人主页
├── tech.html               # 技术 Archive
├── css/site.css            # 两个页面共享的视觉系统
├── js/articles.js          # 文章与项目数据
├── js/archive.js           # 搜索、筛选和弹层交互
├── images/                 # 站点与项目视觉资产
└── resources/resume/       # 公开简历
```

站点使用原生 HTML、CSS 和 JavaScript，仅通过 CDN 加载字体与 Bootstrap Icons，不需要构建步骤。
