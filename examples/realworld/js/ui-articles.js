import { formatDate } from "./utils.js";

export let ArticleList = function(app){
  this.app = app;
};
ArticleList.prototype = {
  sel: function(){ return this.app.root.querySelector('div[data-pg-elem="article-list"]'); },
  init: function() {
    let elem = this.sel();
    this.app.on(this.app.action.notifyApiCallSuccess, fnAction => {
      this.app.model.articles.forEach(article => elem.insertAdjacentElement("beforeend", this.app.view.ArticlePreview.buildView(article)));
    });
  },
};

export let ArticlePreview = function(app){
  this.app = app;
};
ArticlePreview.prototype = {
  sel: function(id) { return this.app.root.querySelector('div[data-article-id="'+id+'"]'); },
  init: function() {
      
  },
  
  buildView: function(article) {
    let template = this.app.root.querySelector('template#article-preview');
    let clone = document.importNode(template.content, true);
    let elem = clone.children[0];
    elem.dataset.articleId = article.id;
    let elemArticleLink = elem.querySelector('[data-pg-elem="article-link"]');
    elemArticleLink.setAttribute("href", "#/article/" + article.slug);
    elem.querySelector('[data-pg-elem="author"]').textContent = article.author.username;
    elem.querySelector('[data-pg-elem="date"]').textContent = formatDate(article.updatedAt, {month: "long", day: "numeric"});
    elem.querySelector('[data-pg-elem="title"]').textContent = article.title;
    elem.querySelector('[data-pg-elem="desc"]').textContent = article.description;
    
    elemArticleLink.addEventListener("click", e => this.app.do(this.app.action.showArticle, article));
    return elem;
  }
};