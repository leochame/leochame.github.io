/**
 * ====================================================================
 * Data Layer - System Archive (Refined Version)
 * ====================================================================
 */
const articlesData = [
    {
        id: 300,
        title: "MySQL Architecture & Performance Engineering",
        summary: "A comprehensive deep dive into MySQL internals. Topics cover MVCC, Indexing strategies (B+Tree), Buffer Pool management, and Locking mechanisms.",
        link: "#",
        platform: "Yuque",
        date: "2025-02-20",
        mainCategory: "Database",
        subCategory: "MySQL Series",
        isSeries: true,
        children: [
            { title: "MySQL - Storage Engines & System Architecture", link: "https://www.yuque.com/yuqueyonghu6p3x1u/lau566/yxqxpt0858ngqpe9" },
            { title: "MySQL - Deep Dive into B+Tree Indexing", link: "https://www.yuque.com/yuqueyonghu6p3x1u/lau566/ttq528fb1bza7o34" },
            { title: "MySQL - Buffer Pool & Cache Optimization", link: "https://www.yuque.com/yuqueyonghu6p3x1u/lau566/yxqxpt0858ngqpe9" },
            { title: "MySQL - Understanding MVCC Mechanisms", link: "https://www.yuque.com/yuqueyonghu6p3x1u/lau566/egmggw9ld3fmoiin" },
            { title: "MySQL - Locking Strategies & Deadlock Prevention", link: "https://www.yuque.com/yuqueyonghu6p3x1u/lau566/frd4zmhhvz6mzmqz" },
            { title: "MySQL - Logging: Redo, Undo, and Binlog Internals", link: "https://www.yuque.com/yuqueyonghu6p3x1u/lau566/xbdexw8q18ugtll8" },
            { title: "MySQL - Query Execution & Optimizer Logic", link: "https://www.yuque.com/yuqueyonghu6p3x1u/lau566/cwcgubokz1hblvw5" }
        ]
    },
    {
        id: 25,
        title: "GC Deep Dive (II): Implementing Zero-STW Relocation",
        summary: "Detailed analysis of ZGC's concurrent relocation mechanism. Solving the core challenge: maintaining object accessibility during Region migration.",
        link: "https://mp.weixin.qq.com/s/hHZseg7QYVk4iNeuvkbOhg",
        platform: "WeChat",
        date: "2025-07-30",
        mainCategory: "Java",
        subCategory: "JVM Internals",
        isSeries: false
    },
    {
        id: 23,
        title: "Prompt Caching: Architecting Low-Latency AI Agents",
        summary: "Analysis of core mechanisms to reduce inference costs by 90% and boost speed by 85% in Agentic workflows.",
        link: "https://mp.weixin.qq.com/s/xfidMN73XnurT0O-OrpWPg",
        platform: "WeChat",
        date: "2025-07-30",
        mainCategory: "人工智能",
        subCategory: "Agentic Systems",
        isSeries: false
    },
    {
        id: 100,
        title: "The Three Musketeers: GFS Protocol Analysis",
        summary: "Analyzing Master-Chunkserver interactions, lease-based consistency, and data replication for fault tolerance.",
        link: "#",
        platform: "Yuque",
        date: "2025-05-05",
        mainCategory: "Infrastructure",
        subCategory: "Distributed Systems",
        isSeries: true,
        children: [
            { title: "GFS (Part I) - Architecture Overview", link: "https://www.yuque.com/yuqueyonghu6p3x1u/lagatg/gx2szi2mss9pkbps" },
            { title: "GFS (Part II) - Write Pipeline & Control Flow", link: "https://www.yuque.com/yuqueyonghu6p3x1u/lagatg/ggru1bz14yr7vzw6" },
            { title: "GFS (Part III) - Consistency & Fault Tolerance", link: "https://www.yuque.com/yuqueyonghu6p3x1u/lagatg/cg6disr86tugih9p" }
        ]
    },
    {
        id: 14,
        title: "OS Internals: The Mechanics of PageTables",
        summary: "Exploration of address translation, hardware-level isolation, and dedicated process spaces in xv6.",
        link: "https://juejin.cn/post/7477228933638373391",
        platform: "Juejin",
        date: "2025-03-03",
        mainCategory: "操作系统",
        subCategory: "MIT6.1810",
        isSeries: false
    }
];