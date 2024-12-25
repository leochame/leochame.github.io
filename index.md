---
layout: page
title: "首页"
---

# 欢迎来到 Leochame 的个人博客

你好！我是 **Leo Cham**，一名全栈开发者和技术爱好者。在这个博客上，我分享我在编程、技术和生活中的经验与思考，希望我的内容能帮助你成长与进步。

这是一个梦想成为架构师的Java赛博肥料生产者，是一个悲观的人，是一个朝着幽默风趣绅士努力的人。

--- 
|   
|  
|




# 最新文章

## 以下是我的最新学习内容：

{% for post in site.posts limit:5 %}
  <article>
    <h4><a href="{{ post.url }}">{{ post.title }}</a></h4>
    <p>{{ post.excerpt | strip_html | truncatewords: 50 }}</p>
    <a href="{{ post.url }}">阅读全文</a>
  </article>
{% endfor %}

---