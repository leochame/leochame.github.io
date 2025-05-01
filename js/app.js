// 文章数据
const articlesData = [

    {
        id: 28,
        title: "GFS（1）- 大数据的三驾马车",
        summary: "GFS 也就是 Google 文件系统。目前的大部分分布式系统都或多或少的依赖于底层的文件系统。",
        link: "https://www.yuque.com/yuqueyonghu6p3x1u/lagatg/gx2szi2mss9pkbps?singleDoc# 《GFS（1）- 大数据的三驾马车》",
        platform: "语雀",
        date: "2025-05-01",
        category: "大数据"
    },
    {
        id: 18,
        title: "有了MESI缓存一致性协议为什么还需要volatile？",
        summary: "本篇文章先从 CPU 的三级缓存讲起，再讲解三级缓存带来的缓存不一致的挑战，最后去讲解 Java 中的volatile...",
        link: "https://mp.weixin.qq.com/s/50wt85WcCmdmIQY--sVVBw",
        platform: "微信公众号",
        date: "2025-04-25",
        category: "Java"
    },
    {
        id: 1,
        title: "从NTP时钟同步优化角度出发 - 大学知识不再是空中楼阁（一）",
        summary: "本系列基于数学，操作系统，计算机网络及网络编程角度出发去探寻 NTP 时钟同步的优化。将大学所学应用在这个优化上。",
        link: "https://juejin.cn/post/7480441580059852835",
        platform: "掘金",
        date: "2025-03-12",
        category: "计算机基础"
    },
    {
        id: 2,
        title: "从NTP时钟同步优化角度出发 - 大学知识不再是空中楼阁（二）",
        summary: "文章主要从网络角度探讨NTP时钟同步的优化，先指出原始方法性能差的原因，包括客户端实例重复创建等，然后介绍使用NIO的优化方式，如连接复用、非阻塞实现、使用Selector等，还对比了原方案和NIO优化方案，最后讨论了为何使用NIO而非Netty优化及Linux下的Epoll Bug和Netty的解决办法，并在附录中介绍了ByteBuffer的相关知识。",
        link: "https://juejin.cn/post/7480777354932109349",
        platform: "掘金",
        date: "2025-03-12",
        category: "计算机基础"
    },
    {
        id: 3,
        title: "从NTP时钟同步优化角度出发 - 大学知识不再是空中楼阁（一）",
        summary: "本系列基于数学，操作系统，计算机网络及网络编程角度出发去探寻 NTP 时钟同步的优化。将大学所学应用在这个优化上。",
        link: "https://juejin.cn/post/7480441580059852835",
        platform: "掘金",
        date: "2025-03-12",
        category: "计算机基础"
    },
    {
        id: 4,
        title: "操作系统 - PageTable（一）",
        summary: "这篇文章主要探讨了操作系统中的页表相关内容，包括页表如何为进程提供专用空间和地址，实现地址转换与隔离，以 Sv39 RISC-V 架构为例介绍虚拟地址到物理地址的转换过程，还涉及内核地址空间、相关代码的创建与执行，如初始化过程、exec 系统调用加载应用程序的过程等。",
        link: "https://juejin.cn/post/7477228933638373391",
        platform: "掘金",
        date: "2025-03-03",
        category: "操作系统"
    },
    {
        id: 19,
        title: "MIT6.1810 - Sleep And Wake Up（1）",
        summary: "",
        link: "https://mp.weixin.qq.com/s/NeaYy0R4gXtEDpz0nVYU1w",
        platform: "微信公众号",
        date: "2024-12-29",
        category: "MIT 6.1810【笔记】"
    },
    {
        id: 20,
        title: "MIT6.1810 - Sleep And Wake Up（2）",
        summary: "",
        link: "https://mp.weixin.qq.com/s/Ksen60Ki0wwrSFtdMnVBaw",
        platform: "微信公众号",
        date: "2024-12-29",
        category: "MIT 6.1810【笔记】"
    },
    {
        id: 21,
        title: "MIT6.1810 - Scheduler And Thread Switch",
        summary: "",
        link: "https://mp.weixin.qq.com/s/28YhnpgXE_vD3dOTiYYNQg",
        platform: "微信公众号",
        date: "2024-12-28",
        category: "MIT 6.1810【笔记】"
    },
    {
        id: 22,
        title: "MIT6.1810 - Copy On Write",
        summary: "",
        link: "https://mp.weixin.qq.com/s/SgW_RtLbvu0UjHX_hTsFBg",
        platform: "微信公众号",
        date: "2024-12-28",
        category: "MIT 6.1810【笔记】"
    },
    {
        id: 23,
        title: "MIT6.1810 - Copy On Write",
        summary: "",
        link: "https://mp.weixin.qq.com/s/SgW_RtLbvu0UjHX_hTsFBg",
        platform: "微信公众号",
        date: "2024-12-28",
        category: "MIT 6.1810【笔记】"
    },
    {
        id: 24,
        title: "MIT6.1810 - Operation System Organization",
        summary: "",
        link: "https://mp.weixin.qq.com/s/sCAaLyMUnBGC4rKOBN90mA",
        platform: "微信公众号",
        date: "2024-12-28",
        category: "MIT 6.1810【笔记】"
    },
    {
        id: 25,
        title: "拥塞控制原理与TCP拥塞",
        summary: "",
        link: "https://www.yuque.com/yuqueyonghu6p3x1u/lagatg/kkmagdynt183fyvo",
        platform: "语雀",
        date: "2025-04-01",
        category: "计算机网络"
    },
    {
        id: 26,
        title: "Java线程池如何保证线程安全？",
        summary: "在Java并发编程中，ThreadPoolExecutor类堪称线程池的\"大脑\"，Java线程池的线程安全设计展示了并发编程的终极艺术：在保证正确性的前提下追求最大性能。每个看似简单的API背后，都凝结着无数次的JVM调优经验与并发难题的解决方案。",
        link: "https://juejin.cn/post/7490497276738486322",
        platform: "掘金",
        date: "2025-04-08",
        category: "Java"

    },
    {
        id: 27,
        title: "操作系统 - 中断与系统驱动",
        summary: "网卡收到 pack page,网卡就会产生中断，按下键盘也会产生中断。如果受到一个中断，sw save its work, process interupt, resume its work。它和page fault,syscall都使用了相同的机制。",
        link: "https://juejin.cn/spost/7485188648485601280",
        platform: "掘金",
        date: "2025-03-24",
        category: "操作系统"
    },
    {
        id: 5,
        title: "操作系统 - 结构与组织",
        summary: "这篇文章主要介绍了操作系统的结构与组织，包括操作系统的经典组织结构，如硬件资源、内核空间和用户空间的关系，内核中的重要模块...",
        link: "https://juejin.cn/post/7474427694630142002",
        platform: "掘金",
        date: "2025-02-23",
        category: "操作系统"
    },
    {
        id: 6,
        title: "操作系统-NetWorking",
        summary: "文章主要围绕操作系统中的网络功能展开，包括网络分类及通信方式、重要协议（以太网、ARP、IP、UDP）、数据包传输过程（接收与发送、DMA 技术）、Livelock 现象（出现原因、丢包情况）及解决办法（轮询模式）等内容。",
        link: "https://juejin.cn/post/7473721599248744485",
        platform: "掘金",
        date: "2025-02-21",
        category: "操作系统"
    },
    {
        id: 7,
        title: "MySQL-存储引擎篇",
        summary: "文章主要围绕MySQL中的存储引擎篇展开...",
        link: "https://www.yuque.com/yuqueyonghu6p3x1u/lau566/yxqxpt0858ngqpe9?singleDoc# 《存储引擎篇》",
        platform: "语雀",
        date: "2025-02-10",
        category: "MySQL"
    },
    {
        id: 8,
        title: "MySQL - 查询篇",
        summary: "文章主要围绕 MySQL 中的查询篇展开，深入讲解查询语句的使用技巧、优化方法等...",
        link: "https://www.yuque.com/yuqueyonghu6p3x1u/lau566/cwcgubokz1hblvw5?singleDoc# 《查询篇》",
        platform: "语雀",
        date: "2025-02-11",
        category: "MySQL"
    },
    {
        id: 9,
        title: "MySQL - 缓存篇",
        summary: "文章聚焦于 MySQL 中的缓存篇，详细介绍缓存机制、缓存策略以及如何有效利用缓存提升性能...",
        link: "https://www.yuque.com/yuqueyonghu6p3x1u/lau566/yxqxpt0858ngqpe9?singleDoc# 《缓存篇》",
        platform: "语雀",
        date: "2025-02-12",
        category: "MySQL"
    },
    {
        id: 10,
        title: "MySQL - 日志篇",
        summary: "此文章围绕 MySQL 中的日志篇，全面阐述日志类型、日志记录原理以及日志在故障排查和数据恢复中的作用...",
        link: "https://www.yuque.com/yuqueyonghu6p3x1u/lau566/xbdexw8q18ugtll8?singleDoc# 《日志篇》",
        platform: "语雀",
        date: "2024-09-13",
        category: "MySQL"
    },
    {
        id: 11,
        title: "MySQL - 索引篇",
        summary: "文章着重介绍 MySQL 中的索引篇，包括索引的类型、创建和使用索引的注意事项以及索引对查询性能的影响...",
        link: "https://www.yuque.com/yuqueyonghu6p3x1u/lau566/ttq528fb1bza7o34?singleDoc# 《索引篇》",
        platform: "语雀",
        date: "2025-02-14",
        category: "MySQL"
    },
    {
        id: 12,
        title: "MySQL-MVCC 篇",
        summary: "该文章深入剖析 MySQL 中的 MVCC 篇，详细讲解 MVCC 的工作原理、实现机制以及在并发控制中的应用...",
        link: "https://www.yuque.com/yuqueyonghu6p3x1u/lau566/egmggw9ld3fmoiin?singleDoc# 《MVCC篇》",
        platform: "语雀",
        date: "2025-02-15",
        category: "MySQL"
    },
    {
        id: 13,
        title: "MySQL - 锁篇",
        summary: "文章主要针对 MySQL 中的锁篇，全面介绍锁的类型、锁的粒度以及如何避免死锁等问题...",
        link: "https://www.yuque.com/yuqueyonghu6p3x1u/lau566/frd4zmhhvz6mzmqz?singleDoc# 《锁篇》",
        platform: "语雀",
        date: "2025-02-16",
        category: "MySQL"
    },
    {
        id: 14,
        title: "MySQL - 实践开发篇",
        summary: "此文章围绕 MySQL 在实践开发中的应用展开，分享实际项目中使用 MySQL 的经验、技巧以及常见问题的解决方案...",
        link: "https://www.yuque.com/yuqueyonghu6p3x1u/lau566/gihgg9agt8nhe2bu?singleDoc# 《实践开发篇》",
        platform: "语雀",
        date: "2025-02-17",
        category: "MySQL"
    },
    {
        id: 15,
        title: "MySQL - 架构篇",
        summary: "文章聚焦于 MySQL 的架构篇，详细解读 MySQL 的体系架构、各个组件的功能以及架构设计的要点...",
        link: "https://www.yuque.com/yuqueyonghu6p3x1u/lau566/zgkvm3dydayfgf7q?singleDoc# 《架构篇》",
        platform: "语雀",
        date: "2024-10-18",
        category: "MySQL"
    },
    {
        id: 16,
        title: "MySQL - 优化篇",
        summary: "该文章围绕 MySQL 的优化篇，从多个方面介绍优化策略，包括查询优化、存储优化、服务器参数优化等...",
        link: "https://www.yuque.com/yuqueyonghu6p3x1u/lau566/mqzyghdezlgkkmh7?singleDoc# 《优化篇》",
        platform: "语雀",
        date: "2025-02-19",
        category: "MySQL"
    },
    {
        id: 17,
        title: "MySQL - 问答篇",
        summary: "文章以问答形式呈现，涵盖 MySQL 使用过程中的常见问题及详细解答，为读者提供实用的参考...",
        link: "https://www.yuque.com/yuqueyonghu6p3x1u/lau566/tqi51k3apvv80b71?singleDoc# 《问答篇》",
        platform: "语雀",
        date: "2025-02-20",
        category: "MySQL"
    }
];

document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const categoryList = document.getElementById('category-list');
    const articlesContainer = document.getElementById('articles-container');
    const currentCategoryTitle = document.getElementById('current-category');

    // 从URL获取当前分类
    const urlParams = new URLSearchParams(window.location.search);
    let currentCategory = urlParams.get('category') || 'all';

    // 获取所有不重复的分类
    const categories = ['all', ...new Set(articlesData.map(article => article.category))];

    // 渲染分类列表
    renderCategories();

    // 渲染文章列表
    renderArticles();

    // 渲染分类列表函数
    function renderCategories() {
        if (!categoryList) return; // 如果页面没有分类列表，则跳过
        categoryList.innerHTML = '';

        categories.forEach(category => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = category === 'all' ? 'index.html' : `index.html?category=${encodeURIComponent(category)}`;
            a.textContent = category === 'all' ? '全部文章' : category;

            if (category === currentCategory) {
                a.classList.add('active');
            }

            li.appendChild(a);
            categoryList.appendChild(li);
        });

// 主题切换功能
document.addEventListener('DOMContentLoaded', function() {
    // 检查本地存储中是否有主题偏好
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // 应用保存的主题
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (document.querySelector('#theme-switch')) {
            document.querySelector('#theme-switch').checked = true;
        }
    }
    
    // 监听主题切换
    const themeSwitch = document.querySelector('#theme-switch');
    if (themeSwitch) {
        themeSwitch.addEventListener('change', function(e) {
            if (e.target.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
            }
        });
    }
});
    }

    // 渲染文章列表函数
    function renderArticles() {
        if (!articlesContainer) return; // 如果页面没有文章容器，则跳过
        articlesContainer.innerHTML = '';

        // 根据当前分类筛选文章
        let filteredArticles = articlesData;
        if (currentCategory !== 'all') {
            filteredArticles = articlesData.filter(article => article.category === currentCategory);
            if (currentCategoryTitle) {
                currentCategoryTitle.textContent = currentCategory;
            }
        }

        // 按日期排序（最新的在前面）
        filteredArticles.sort((a, b) => new Date(b.date) - new Date(a.date));

        // 创建文章卡片
        filteredArticles.forEach(article => {
            const articleCard = document.createElement('div');
            articleCard.className = 'article-card';

            articleCard.innerHTML = `
                <h2 class="article-title">
                    <a href="${article.link}" target="_blank">${article.title}</a>
                </h2>
                <div class="article-meta">
                    <span class="platform">
                        <i class="bi bi-journal-text"></i> ${article.platform}
                    </span>
                    <span class="date">
                        <i class="bi bi-calendar3"></i> ${article.date}
                    </span>
                    <span class="category">
                        ${article.category}
                    </span>
                </div>
                <p class="article-summary">${article.summary}</p>
                <a href="${article.link}" class="read-more" target="_blank">阅读全文 &rarr;</a>
            `;

            articlesContainer.appendChild(articleCard);
        });

// 主题切换功能
document.addEventListener('DOMContentLoaded', function() {
    // 检查本地存储中是否有主题偏好
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // 应用保存的主题
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (document.querySelector('#theme-switch')) {
            document.querySelector('#theme-switch').checked = true;
        }
    }
    
    // 监听主题切换
    const themeSwitch = document.querySelector('#theme-switch');
    if (themeSwitch) {
        themeSwitch.addEventListener('change', function(e) {
            if (e.target.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
            }
        });
    }
});

        // 如果没有文章，显示提示信息
        if (filteredArticles.length === 0) {
            articlesContainer.innerHTML = '<div class="no-articles">该分类下暂无文章</div>';
        }

        // 初始加载时触发滚动动画检查
        handleScrollAnimation();
    }

    // 滚动显示动画
    const scrollElements = document.querySelectorAll('.article-card');
        
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend);
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('fade-in-up');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            }
        });

// 主题切换功能
document.addEventListener('DOMContentLoaded', function() {
    // 检查本地存储中是否有主题偏好
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // 应用保存的主题
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (document.querySelector('#theme-switch')) {
            document.querySelector('#theme-switch').checked = true;
        }
    }
    
    // 监听主题切换
    const themeSwitch = document.querySelector('#theme-switch');
    if (themeSwitch) {
        themeSwitch.addEventListener('change', function(e) {
            if (e.target.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
            }
        });
    }
});
    };
    
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

// 主题切换功能
document.addEventListener('DOMContentLoaded', function() {
    // 检查本地存储中是否有主题偏好
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // 应用保存的主题
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (document.querySelector('#theme-switch')) {
            document.querySelector('#theme-switch').checked = true;
        }
    }
    
    // 监听主题切换
    const themeSwitch = document.querySelector('#theme-switch');
    if (themeSwitch) {
        themeSwitch.addEventListener('change', function(e) {
            if (e.target.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
            }
        });
    }
});

});

// 主题切换功能
document.addEventListener('DOMContentLoaded', function() {
    // 检查本地存储中是否有主题偏好
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // 应用保存的主题
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (document.querySelector('#theme-switch')) {
            document.querySelector('#theme-switch').checked = true;
        }
    }
    
    // 监听主题切换
    const themeSwitch = document.querySelector('#theme-switch');
    if (themeSwitch) {
        themeSwitch.addEventListener('change', function(e) {
            if (e.target.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
            }
        });
    }
});