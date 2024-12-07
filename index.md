---
layout: page
title: "首页"
---

# 欢迎来到 Leochame 的个人博客

你好！我是 **Leo Cham**，一名全栈开发者和技术爱好者。在这个博客上，我分享我在编程、技术和生活中的经验与思考，希望我的内容能帮助你成长与进步。

## 最新文章

以下是我最新发布的一些文章，欢迎阅读：

{% for post in site.posts limit:3 %}
  <article>
    <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
    <p>{{ post.excerpt | strip_html | truncatewords: 50 }}</p>
    <a href="{{ post.url }}">阅读全文</a>
  </article>
{% endfor %}

## 我的推荐

如果你是第一次来到我的博客，以下是一些我推荐的文章和教程：

- [如何学习前端开发](#)
- [我在开源项目中的经历](#)
- [如何通过项目提升编程技能](#)

## 关于我

我是一个开发者，对技术充满热情。除了写代码，我还喜欢研究机器学习、人工智能以及如何利用编程解决实际问题。你可以通过以下方式与我联系：

- **电子邮件**: [liulch.cn@gmail.com](mailto:liulch.cn@gmail.com)
- **GitHub**: [github.com/leochame](https://github.com/leochame)
- **LinkedIn**: [linkedin.com/in/username](https://linkedin.com/in/username)

## 社交媒体

关注我的社交媒体平台，获取更多更新和分享：

- **Twitter**: [@leochame](https://twitter.com/username)
- **GitHub**: [@leochame](https://github.com/leochame)

---
