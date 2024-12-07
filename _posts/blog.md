---
layout: default
title: 博客目录
permalink: /blog/
---

# 博客目录

欢迎来到我的博客目录。下面是所有的博客文章：

<ul>
  {% for post in site.posts %}
    <li><a href="{{ post.url }}">{{ post.title }}</a> - <small>{{ post.date | date: "%Y-%m-%d" }}</small></li>
  {% endfor %}
</ul>
