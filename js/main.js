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
    }

    // 渲染文章列表函数
    function renderArticles() {
        articlesContainer.innerHTML = '';

        // 根据当前分类筛选文章
        let filteredArticles = articlesData;
        if (currentCategory !== 'all') {
            filteredArticles = articlesData.filter(article => article.category === currentCategory);
            currentCategoryTitle.textContent = currentCategory;
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

        // 如果没有文章，显示提示信息
        if (filteredArticles.length === 0) {
            articlesContainer.innerHTML = '<div class="no-articles">该分类下暂无文章</div>';
        }
    }
});