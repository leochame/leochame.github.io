// 页面交互增强功能
function enhancePageInteraction() {
    // 为所有外部链接添加安全属性
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        if (!link.hasAttribute('rel')) {
            link.setAttribute('rel', 'noopener noreferrer');
        }
        if (!link.hasAttribute('target')) {
            link.setAttribute('target', '_blank');
        }
    });
    
    // 为图片添加加载完成事件，但排除头像图片
    document.querySelectorAll('img').forEach(img => {
        // 立即将头像设置为已加载状态
        if (img.classList.contains('avatar-large') || img.classList.contains('avatar')) {
            img.classList.add('loaded');
        } else if (img.hasAttribute('loading') && img.getAttribute('loading') === 'lazy') {
            // 只有明确标记为lazy的图片才添加加载事件
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
        } else {
            // 非懒加载图片直接设置为已加载状态
            img.classList.add('loaded');
        }
    });
    
    // 为推荐文章链接添加平滑滚动
    document.querySelectorAll('.scroll-link').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                    // 更新URL但不跳转
                    history.pushState(null, null, targetId);
                }
            }
        });
    });

    // 添加页面滚动监听
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });
}

// 在DOM内容加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 增强页面交互
    enhancePageInteraction();
    
    // 获取DOM元素
    const categoryList = document.getElementById('category-list');
    const articlesContainer = document.getElementById('articles-container');
    const currentCategoryTitle = document.getElementById('current-category');
    const subCategoriesScroll = document.getElementById('sub-categories-scroll');
    const articleToggleCheckbox = document.getElementById('article-toggle-checkbox');
    const toggleLabel = document.getElementById('toggle-label');

    // 从URL获取当前分类和显示状态
    const urlParams = new URLSearchParams(window.location.search);
    let currentMainCategory = urlParams.get('mainCategory');
    let currentSubCategory = urlParams.get('subCategory');
    const showAll = urlParams.get('showAll') === 'true'; // 新增：检查是否要显示全部

    // 初始状态判断：
    if (showAll) {
        currentMainCategory = 'all'; // URL明确要求显示全部
    } else if (!currentMainCategory && !currentSubCategory) {
        currentMainCategory = 'featured'; // 默认或URL无参数，显示推荐
    } else if (!currentMainCategory) {
        currentMainCategory = 'all'; // 有子分类但没主分类（理论上不应发生），默认为 all
    }

    // 构建层级分类数据结构
    const allowedMainCategories = ["Java", "操作系统", "计算机网络", "计算机基础", "数据库", "人工智能","大数据"];
    const categories = articlesData.reduce((acc, article) => {
        const { mainCategory, subCategory } = article;
        if (allowedMainCategories.includes(mainCategory)) {
            if (!acc[mainCategory]) {
                acc[mainCategory] = new Set();
            }
            if (subCategory) {
                acc[mainCategory].add(subCategory);
            }
        }
        return acc;
    }, {});

    // 检查URL参数
    const categoryParam = urlParams.get('category');
    
    // 创建分类并设置初始选中状态
    createCategories();
    
    // 如果URL有分类参数，则激活该分类
    if (categoryParam) {
        const categoryButton = document.querySelector(`.category-filter button[data-category="${categoryParam}"]`);
        if (categoryButton) {
            categoryButton.click();
        } else {
            // 如果没有找到精确匹配，尝试查找包含此分类的按钮
            const buttons = document.querySelectorAll('.category-filter button');
            for (const btn of buttons) {
                if (btn.getAttribute('data-category').includes(categoryParam)) {
                    btn.click();
                    break;
                }
            }
        }
    }

    // 首页文章展示功能
    function initializeHomepage() {
        const articlesContainer = document.getElementById('articles-container');
        if (!articlesContainer) return; // 不是首页，退出
        
        // 获取所有featured为true的文章
        const featuredArticles = articlesData
            .filter(article => article.featured === true) // 确保明确匹配true
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 6); // 只展示最多6篇推荐文章
        
        if (featuredArticles.length === 0) {
            articlesContainer.innerHTML = '<div class="text-center"><p class="text-muted">暂无推荐文章</p></div>';
            return;
        }
        
        // 显示找到的推荐文章数量
        const featuredCount = document.createElement('div');
        featuredCount.className = 'featured-count mb-3';
        featuredCount.innerHTML = `<span class="badge bg-primary">共找到 ${featuredArticles.length} 篇推荐文章</span>`;
        articlesContainer.appendChild(featuredCount);
        
        // 创建文章卡片网格
        const articleGrid = document.createElement('div');
        articleGrid.className = 'article-grid';
        articlesContainer.appendChild(articleGrid);
        
        featuredArticles.forEach(article => {
            const articleCard = document.createElement('div');
            articleCard.className = 'article-card';
            
            const categoryDisplay = article.subCategory
                ? `${article.mainCategory} / ${article.subCategory}`
                : article.mainCategory;
            
            articleCard.innerHTML = `
                <div class="featured-badge"><i class="bi bi-star-fill"></i> 推荐</div>
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
                    <span class="category">${categoryDisplay}</span>
                </div>
                <p class="article-summary">${article.summary}</p>
                <a href="${article.link}" class="read-more" target="_blank">阅读全文 &rarr;</a>
            `;
            
            articleGrid.appendChild(articleCard);
        });
    }

    // 检查是否是首页
    const isHomepage = document.getElementById('featured-articles') !== null;
    
    if (isHomepage) {
        // 首页特定初始化
        initializeHomepage();
    } else {
        // 文章列表页初始化
        if (categoryList) {
            // 初始化页面
            initializePage();
        }
    }

    function initializePage() {
        // 页面加载时，根据 currentMainCategory, currentSubCategory, showAll 的状态渲染
        renderCategories();
        renderSubCategories(); // renderSubCategories 会自己读取 currentMainCategory
        renderArticles();
        setupArticleToggle(); // 设置切换按钮
    }

    // 渲染分类列表函数
    function renderCategories() {
        categoryList.innerHTML = '';

        // 创建主分类容器
        const mainCategoriesContainer = document.createElement('div');
        mainCategoriesContainer.className = 'main-categories-container';

        // 主分类渲染逻辑保持不变，因为切换按钮不在侧边栏

        // 渲染主分类
        for (const mainCategory in categories) {
            const categoryLink = document.createElement('a');
            categoryLink.href = `index.html?mainCategory=${encodeURIComponent(mainCategory)}`;
            categoryLink.textContent = mainCategory;
            // 激活状态：当主分类匹配且不是在看全部或精品时
            if (mainCategory === currentMainCategory && currentMainCategory !== 'all' && currentMainCategory !== 'featured') {
                categoryLink.classList.add('active');
            }

            categoryLink.addEventListener('click', function(e) {
                e.preventDefault();
                currentMainCategory = mainCategory;
                currentSubCategory = null;
                window.history.pushState({}, '', `index.html?mainCategory=${encodeURIComponent(mainCategory)}`);
                initializePage(); // 重新初始化
            });

            mainCategoriesContainer.appendChild(categoryLink);
        }

        categoryList.appendChild(mainCategoriesContainer);
    }

    // 渲染子分类列表
    function renderSubCategories() {
        subCategoriesScroll.innerHTML = '';
        // 推荐和全部视图下不显示子分类
        if (currentMainCategory === 'featured' || currentMainCategory === 'all') {
            subCategoriesScroll.style.display = 'none';
            return;
        }
        const currentSubCategories = Array.from(categories[currentMainCategory] || []);
        if (currentSubCategories.length === 0) {
            subCategoriesScroll.style.display = 'none';
            return;
        }
        subCategoriesScroll.style.display = 'block';
        const subCategoriesList = document.createElement('ul');
        subCategoriesList.className = 'sub-categories-list';
        currentSubCategories.sort().forEach(subCategory => {
            const subCategoryItem = document.createElement('li');
            const subCategoryLink = document.createElement('a');
            subCategoryLink.href = `index.html?mainCategory=${encodeURIComponent(currentMainCategory)}&subCategory=${encodeURIComponent(subCategory)}`;
            subCategoryLink.textContent = subCategory;
            if (subCategory === currentSubCategory) {
                subCategoryLink.classList.add('active');
            }
            subCategoryLink.addEventListener('click', function(e) {
                e.preventDefault();
                currentSubCategory = subCategory;
                window.history.pushState({}, '', `index.html?mainCategory=${encodeURIComponent(currentMainCategory)}&subCategory=${encodeURIComponent(subCategory)}`);
                initializePage();
            });
            subCategoryItem.appendChild(subCategoryLink);
            subCategoriesList.appendChild(subCategoryItem);
        });
        subCategoriesScroll.appendChild(subCategoriesList);
    }

    // 渲染文章列表函数
    function renderArticles() {
        articlesContainer.innerHTML = '';
        let filteredArticles = [];

        // 根据状态筛选文章
        if (currentMainCategory === 'featured') {
            // 首页推荐阅读视图
            filteredArticles = articlesData.filter(article => article.featured);
            currentCategoryTitle.textContent = '推荐阅读';
        } else if (currentMainCategory === 'all') {
            // 切换到“全部文章”视图
            filteredArticles = articlesData;
            currentCategoryTitle.textContent = '全部文章';
        } else if (currentMainCategory && currentMainCategory !== 'all' && currentMainCategory !== 'featured') {
            // 选择了具体的主分类
            if (currentSubCategory) {
                // 选择了子分类
                filteredArticles = articlesData.filter(article => 
                    article.mainCategory === currentMainCategory && article.subCategory === currentSubCategory
                );
                currentCategoryTitle.textContent = `${currentMainCategory} / ${currentSubCategory}`;
            } else {
                // 只选择了主分类
                filteredArticles = articlesData.filter(article => 
                    article.mainCategory === currentMainCategory
                );
                currentCategoryTitle.textContent = currentMainCategory;
            }
        } else {
             // 默认情况或无法处理的状态，显示推荐阅读文章
             filteredArticles = articlesData.filter(article => article.featured);
             currentCategoryTitle.textContent = '推荐阅读';
        }
        updateToggleState(); // 确保切换按钮状态与当前视图一致

        // 按日期排序（最新的在前面）
        filteredArticles.sort((a, b) => new Date(b.date) - new Date(a.date));

        // 创建文章卡片
        filteredArticles.forEach(article => {
            const articleCard = document.createElement('div');
            articleCard.className = 'article-card';

            // Display both main and subcategory if available
            const categoryDisplay = article.subCategory 
                ? `${article.mainCategory} / ${article.subCategory}` 
                : article.mainCategory;

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
                        ${categoryDisplay} 
                    </span>
                </div>
                <p class="article-summary">${article.summary}</p>
                <a href="${article.link}" class="read-more" target="_blank">阅读全文 &rarr;</a>
            `;

            articlesContainer.appendChild(articleCard);
        });

        // 如果没有文章，显示提示信息
        if (filteredArticles.length === 0) {
            articlesContainer.innerHTML = '<div class="no-articles">该分类下暂无文章</div>';
        }
    }

    // 设置文章切换按钮
    function setupArticleToggle() {
        // 每次都重新获取最新的 DOM 元素，防止被移除后变量失效
        const articleToggleCheckbox = document.getElementById('article-toggle-checkbox');
        const toggleLabel = document.getElementById('toggle-label');
        const articleToggleDiv = document.querySelector('.article-toggle');
        // 如果元素不存在，尝试重新插入按钮结构
        if (!articleToggleCheckbox || !toggleLabel || !articleToggleDiv) {
            const titleAndToggle = document.querySelector('.title-and-toggle');
            if (titleAndToggle && !document.querySelector('.article-toggle')) {
                const toggleDiv = document.createElement('div');
                toggleDiv.className = 'article-toggle';
                toggleDiv.innerHTML = `
                    <label class="switch">
                        <input type="checkbox" id="article-toggle-checkbox">
                        <span class="slider round"></span>
                    </label>
                    <span id="toggle-label">显示全部</span>
                `;
                titleAndToggle.appendChild(toggleDiv);
            }
        }
        // 再次获取最新的 DOM 元素
        const checkbox = document.getElementById('article-toggle-checkbox');
        const label = document.getElementById('toggle-label');
        if (!checkbox || !label) return;
        updateToggleState();
        // 先移除所有旧的事件监听（通过 cloneNode 替换）
        const newCheckbox = checkbox.cloneNode(true);
        checkbox.parentNode.replaceChild(newCheckbox, checkbox);
        newCheckbox.addEventListener('change', function() {
            const isChecked = this.checked;
            if (isChecked) {
                currentMainCategory = 'all';
                currentSubCategory = null;
                window.history.pushState({}, '', 'index.html?showAll=true');
            } else {
                currentMainCategory = 'featured';
                currentSubCategory = null;
                window.history.pushState({}, '', 'index.html');
            }
            initializePage();
        });
        // 确保切换按钮可见
        if (newCheckbox.parentNode && newCheckbox.parentNode.parentNode) {
            newCheckbox.parentNode.parentNode.style.display = '';
        }
        label.style.display = '';
    }

    // 更新切换按钮的视觉状态和标签文本
    function updateToggleState() {
        const articleToggleCheckbox = document.getElementById('article-toggle-checkbox');
        const toggleLabel = document.getElementById('toggle-label');
        if (!articleToggleCheckbox || !toggleLabel) return;
        articleToggleCheckbox.style.display = 'inline-block';
        toggleLabel.style.display = 'inline-block';
        const isAllView = currentMainCategory === 'all';
        articleToggleCheckbox.checked = isAllView;
        toggleLabel.textContent = isAllView ? '切换到推荐' : '查看全部';
        toggleLabel.title = isAllView ? '点击切换到推荐文章' : '点击查看所有文章';
        toggleLabel.classList.toggle('active', isAllView);
    }
});