(() => {
  "use strict";

  const state = { category: "all", query: "" };
  const feed = document.getElementById("feed-container");
  const filters = document.getElementById("category-filters");
  const searchInput = document.getElementById("searchInput");
  const articleCount = document.getElementById("article-count");
  const resultLabel = document.getElementById("result-label");
  const seriesOverlay = document.getElementById("seriesOverlay");
  const projectOverlay = document.getElementById("projectOverlay");
  let lastFocused = null;

  function createElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }

  function createExternalLink(href, className, label, iconClass) {
    const link = createElement("a", className);
    link.href = href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    if (iconClass) {
      const icon = createElement("i", iconClass);
      icon.setAttribute("aria-hidden", "true");
      link.appendChild(icon);
    }
    link.appendChild(document.createTextNode(label));
    return link;
  }

  function setDialogOpen(overlay, isOpen) {
    if (isOpen) {
      lastFocused = document.activeElement;
      overlay.hidden = false;
      overlay.classList.add("active");
      document.body.classList.add("dialog-open");
      overlay.querySelector(".icon-button")?.focus();
      return;
    }

    overlay.classList.remove("active");
    overlay.hidden = true;
    document.body.classList.remove("dialog-open");
    lastFocused?.focus();
    lastFocused = null;
  }

  function openSeries(id) {
    const series = articlesData.find((article) => article.id === id);
    if (!series?.children) return;

    document.getElementById("seriesTitle").textContent = series.title;
    const list = document.getElementById("seriesList");
    list.replaceChildren();

    series.children.forEach((child, index) => {
      const link = createExternalLink(child.link, "step-item", "", "");
      const number = createElement("span", "step-number", String(index + 1).padStart(2, "0"));
      const title = createElement("span", "", child.title);
      const icon = createElement("i", "bi bi-arrow-up-right");
      icon.setAttribute("aria-hidden", "true");
      link.append(number, title, icon);
      list.appendChild(link);
    });

    setDialogOpen(seriesOverlay, true);
  }

  function closeSeries() {
    setDialogOpen(seriesOverlay, false);
  }

  function openProject(id) {
    const project = articlesData.find((article) => article.id === id);
    if (!project) return;

    document.getElementById("projectTitle").textContent = project.title;
    document.getElementById("projectSummary").textContent = project.summary;

    const meta = document.getElementById("projectMeta");
    meta.replaceChildren(
      createElement("span", "tag tag-platform", project.platform),
      createElement("span", "", project.date.replaceAll("-", ".")),
      createElement("span", "", `// ${project.subCategory}`)
    );

    const video = document.getElementById("projectVideo");
    video.replaceChildren();
    video.hidden = !(project.hasVideo && project.videoId);
    if (!video.hidden) {
      const poster = createExternalLink(
        project.videoUrl ?? `https://www.youtube.com/watch?v=${project.videoId}`,
        "project-poster",
        "",
        ""
      );
      poster.setAttribute("aria-label", `Watch the ${project.title} demonstration on YouTube`);
      const image = document.createElement("img");
      image.src = project.poster ?? "images/lavis-project.jpg";
      image.alt = "Lavis green mascot";
      image.width = 1280;
      image.height = 1280;
      const play = createElement("span", "project-play", "Watch demo");
      const playIcon = createElement("i", "bi bi-play-fill");
      playIcon.setAttribute("aria-hidden", "true");
      play.prepend(playIcon);
      poster.append(image, play);
      video.appendChild(poster);
    }

    const links = document.getElementById("projectLinks");
    links.replaceChildren();
    if (project.githubUrl) {
      links.appendChild(createExternalLink(project.githubUrl, "button button-dark", "GitHub repo", "bi bi-github"));
    }
    if (project.link && project.link !== "#" && project.link !== project.githubUrl) {
      links.appendChild(createExternalLink(project.link, "button button-light", "Open detail", "bi bi-arrow-up-right"));
    }

    const featureSection = document.getElementById("projectFeatures");
    const featureList = document.getElementById("featuresList");
    featureList.replaceChildren();
    featureSection.hidden = !(project.features?.length > 0);
    project.features?.forEach((feature) => featureList.appendChild(createElement("li", "", feature)));

    const techSection = document.getElementById("techStack");
    const techTags = document.getElementById("techTags");
    techTags.replaceChildren();
    techSection.hidden = !(project.techStack?.length > 0);
    project.techStack?.forEach((technology) => techTags.appendChild(createElement("span", "tag", technology)));

    setDialogOpen(projectOverlay, true);
  }

  function closeProject() {
    document.getElementById("projectVideo").replaceChildren();
    setDialogOpen(projectOverlay, false);
  }

  function activateDialogArticle(article) {
    if (article.hasVideo) {
      openProject(article.id);
    } else if (article.isSeries) {
      openSeries(article.id);
    }
  }

  function appendMeta(parent, article) {
    parent.appendChild(createElement("span", "tag tag-platform", article.platform));
    parent.appendChild(createElement("span", "", article.date.replaceAll("-", ".")));
    if (article.isSeries) {
      parent.appendChild(createElement("span", "tag", `${article.children.length} parts`));
    }
    if (article.hasVideo) {
      parent.appendChild(createElement("span", "tag tag-video", "Video"));
    }
    parent.appendChild(createElement("span", "", `// ${article.subCategory}`));
  }

  function createArticleEntry(article) {
    const entry = createElement(
      "article",
      `article-entry${article.isSeries ? " is-series" : ""}${article.hasVideo ? " has-video" : ""}`
    );
    const isDialog = article.hasVideo || article.isSeries;
    let content = entry;
    if (isDialog) {
      entry.tabIndex = 0;
      entry.setAttribute("role", "button");
      entry.setAttribute("aria-label", `Open ${article.title}`);
      entry.addEventListener("click", () => activateDialogArticle(article));
      entry.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          activateDialogArticle(article);
        }
      });
    } else {
      const link = createElement("a", "entry-link");
      link.href = article.link;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      content = link;
      entry.appendChild(link);
    }

    const meta = createElement("div", "entry-meta");
    appendMeta(meta, article);
    const title = createElement("h2", "entry-title", article.title);
    const summary = createElement("p", "entry-summary", article.summary);
    content.append(meta, title, summary);
    return entry;
  }

  function getFilteredArticles() {
    const query = state.query.trim().toLowerCase();
    return articlesData
      .filter((article) => {
        const categoryMatch = state.category === "all"
          || (state.category === "video" && article.hasVideo)
          || article.mainCategory === state.category;
        const childTitles = article.children?.map((child) => child.title).join(" ") ?? "";
        const searchable = `${article.title} ${article.summary} ${article.mainCategory} ${article.subCategory} ${childTitles}`.toLowerCase();
        return categoryMatch && searchable.includes(query);
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  function render() {
    const articles = getFilteredArticles();
    feed.replaceChildren();
    articleCount.textContent = String(articles.length);
    resultLabel.textContent = `${articles.length} ${articles.length === 1 ? "record" : "records"}`;

    if (articles.length === 0) {
      feed.appendChild(createElement("div", "empty-state", "No records matched this search."));
      return;
    }

    articles.forEach((article) => feed.appendChild(createArticleEntry(article)));
  }

  function selectFilter(button, category) {
    filters.querySelectorAll(".filter-item").forEach((item) => {
      const selected = item === button;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    state.category = category;
    render();
  }

  function createFilter(label, category, count, selected = false) {
    const button = createElement("button", `filter-item${selected ? " active" : ""}`);
    button.type = "button";
    button.dataset.category = category;
    button.setAttribute("aria-pressed", String(selected));
    button.append(
      createElement("span", "", label),
      createElement("span", "filter-count", String(count))
    );
    button.addEventListener("click", () => selectFilter(button, category));
    return button;
  }

  function initFilters() {
    filters.replaceChildren(createFilter("All", "all", articlesData.length, true));
    const videoCount = articlesData.filter((article) => article.hasVideo).length;
    if (videoCount) filters.appendChild(createFilter("Video", "video", videoCount));

    [...new Set(articlesData.map((article) => article.mainCategory))]
      .sort()
      .forEach((category) => {
        const count = articlesData.filter((article) => article.mainCategory === category).length;
        filters.appendChild(createFilter(category, category, count));
      });
  }

  function getActiveOverlay() {
    return [seriesOverlay, projectOverlay].find((overlay) => !overlay.hidden);
  }

  function trapDialogFocus(event, overlay) {
    const focusable = [...overlay.querySelectorAll("a[href], button:not([disabled])")];
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  searchInput.addEventListener("input", (event) => {
    state.query = event.target.value;
    render();
  });

  document.getElementById("closeSeries").addEventListener("click", closeSeries);
  document.getElementById("closeProject").addEventListener("click", closeProject);
  seriesOverlay.addEventListener("click", (event) => {
    if (event.target === seriesOverlay) closeSeries();
  });
  projectOverlay.addEventListener("click", (event) => {
    if (event.target === projectOverlay) closeProject();
  });

  document.addEventListener("keydown", (event) => {
    const overlay = getActiveOverlay();
    if (!overlay) return;
    if (event.key === "Escape") {
      overlay === seriesOverlay ? closeSeries() : closeProject();
    } else if (event.key === "Tab") {
      trapDialogFocus(event, overlay);
    }
  });

  initFilters();
  render();

  const projectParam = new URLSearchParams(window.location.search).get("project") ?? "";
  const projectId = Number(projectParam);
  if (/^\d+$/.test(projectParam) && Number.isSafeInteger(projectId)) {
    const project = articlesData.find((article) => article.id === projectId);
    if (project?.hasVideo) openProject(projectId);
    else if (project?.isSeries) openSeries(projectId);
  }
})();
