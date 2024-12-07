---
layout: page
title: "首页"
---

# 欢迎来到 Leochame 的个人博客

你好！我是 **Leo Cham**，一名全栈开发者和技术爱好者。在这个博客上，我分享我在编程、技术和生活中的经验与思考，希望我的内容能帮助你成长与进步。

这是一个梦想成为架构师的Java赛博肥料生产者，是一个悲观的人，是一个朝着幽默风趣绅士努力的人。

--- 

### 最新文章

以下是我最新学习的内容，欢迎浏览，欢迎交流：

{% for post in site.posts limit:3 %}
  <article>
    <h4><a href="{{ post.url }}">{{ post.title }}</a></h4>
    <p>{{ post.excerpt | strip_html | truncatewords: 50 }}</p>
    <a href="{{ post.url }}">阅读全文</a>
  </article>
{% endfor %}

--- 
###  我的推荐

如果你是第一次来到我的博客，以下是一些我推荐的文章和教程：

- [如何学习前端开发](#)
- [我在开源项目中的经历](#)
- [如何通过项目提升编程技能](#)