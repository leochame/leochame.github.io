document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const categoryList = document.getElementById('category-list');
    const articlesContainer = document.getElementById('articles-container');
    const currentCategoryTitle = document.getElementById('current-category');
    const subCategoriesScroll = document.getElementById('sub-categories-scroll');

    // 从URL获取当前分类
    const urlParams = new URLSearchParams(window.location.search);
    let currentMainCategory = urlParams.get('mainCategory') || 'all';
    let currentSubCategory = urlParams.get('subCategory');

    // 构建层级分类数据结构
    const allowedMainCategories = ["Java", "操作系统", "计算机网络", "计算机基础", "数据库", "大数据", "人工智能"];
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
        // 默认选中第一个主分类
        if (!currentMainCategory || currentMainCategory === 'all') {
            const firstMainCategory = Object.keys(categories)[0];
            if (firstMainCategory) {
                currentMainCategory = firstMainCategory;
                // 更新URL，但不触发页面刷新
                window.history.replaceState({}, '', `index.html?mainCategory=${encodeURIComponent(currentMainCategory)}`);
            }
        }
        renderCategories();
        renderSubCategories(currentMainCategory);
        renderArticles();
    }

    // 渲染分类列表函数
    function renderCategories() {
        categoryList.innerHTML = '';

        // 创建主分类容器
        const mainCategoriesContainer = document.createElement('div');
        mainCategoriesContainer.className = 'main-categories-container';

        // 添加"全部文章"
        const allLink = document.createElement('a');
        allLink.href = 'index.html';
        allLink.textContent = '全部文章';
        if (currentMainCategory === 'all') {
            allLink.classList.add('active');
        }
        allLink.addEventListener('click', function(e) {
            e.preventDefault();
            currentMainCategory = 'all';
            currentSubCategory = null;
            window.history.pushState({}, '', 'index.html');
            renderCategories();
            renderSubCategories();
            renderArticles();
        });
        mainCategoriesContainer.appendChild(allLink);

        // 渲染主分类
        for (const mainCategory in categories) {
            const categoryLink = document.createElement('a');
            categoryLink.href = `index.html?mainCategory=${encodeURIComponent(mainCategory)}`;
            categoryLink.textContent = mainCategory;
            if (mainCategory === currentMainCategory) {
                categoryLink.classList.add('active');
            }

            categoryLink.addEventListener('click', function(e) {
                e.preventDefault();
                currentMainCategory = mainCategory;
                currentSubCategory = null;
                window.history.pushState({}, '', `index.html?mainCategory=${encodeURIComponent(mainCategory)}`);
                renderCategories();
                renderSubCategories();
                renderArticles();
            });

            mainCategoriesContainer.appendChild(categoryLink);
        }

        categoryList.appendChild(mainCategoriesContainer);
    }

    // 渲染子分类列表
    function renderSubCategories() {
        subCategoriesScroll.innerHTML = '';
        
        if (currentMainCategory === 'all') {
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
                renderCategories();
                renderSubCategories();
                renderArticles();
            });

            subCategoryItem.appendChild(subCategoryLink);
            subCategoriesList.appendChild(subCategoryItem);
        });

        subCategoriesScroll.appendChild(subCategoriesList);
    }

    // 渲染文章列表函数
    function renderArticles() {
        articlesContainer.innerHTML = '';
        currentCategoryTitle.textContent = '全部文章'; // Default title

        // 根据当前分类筛选文章
        let filteredArticles = articlesData;

        if (currentMainCategory !== 'all') {
            if (currentSubCategory) {
                // Filter by specific subcategory
                filteredArticles = articlesData.filter(article => 
                    article.mainCategory === currentMainCategory && article.subCategory === currentSubCategory
                );
                currentCategoryTitle.textContent = `${currentMainCategory} / ${currentSubCategory}`;
            } else {
                // Filter by main category (all its subcategories)
                filteredArticles = articlesData.filter(article => 
                    article.mainCategory === currentMainCategory
                );
                currentCategoryTitle.textContent = currentMainCategory;
            }
        } 

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
});