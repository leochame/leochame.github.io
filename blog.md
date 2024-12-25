---
layout: default
title: 博客专栏
permalink: /blog/
---

# 博客专栏目录
> 欢迎来到我的博客专栏目录。下面是我的所有的博客专栏

<ul style="font-size: 25px;">
  {% for post in site.posts %}
    <li><a href="{{ post.url }}">{{ post.title }}</a> - <small>{{ post.date | date: "%Y-%m-%d" }}</small></li>
  {% endfor %}
</ul>
