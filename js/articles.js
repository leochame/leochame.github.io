// 文章数据
const articlesData = [
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
        id: 5,
        title: "操作系统 - 结构与组织",
        summary: "这篇文章主要介绍了操作系统的结构与组织，包括操作系统的经典组织结构，如硬件资源、内核空间和用户空间的关系，内核中的重要模块...",
        link: "https://juejin.cn/post/7474427694630142002",
        platform: "掘金",
        date: "2025-02-23",
        category: "操作系统"
    },
    {
        id: 4,
        title: "操作系统-NetWorking",
        summary: "文章主要围绕操作系统中的网络功能展开，包括网络分类及通信方式、重要协议（以太网、ARP、IP、UDP）、数据包传输过程（接收与发送、DMA 技术）、Livelock 现象（出现原因、丢包情况）及解决办法（轮询模式）等内容。",
        link: "https://juejin.cn/post/7473721599248744485",
        platform: "掘金",
        date: "2025-02-21",
        category: "操作系统"
    },
];