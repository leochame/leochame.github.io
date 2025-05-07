document.addEventListener('DOMContentLoaded', function() {
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

    // 初始化页面
    initializePage();

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