import { formatDate } from "./utils.js";

export let ArticlePreview = function(app){
  this.app = app;
};
ArticlePreview.prototype = {
  sel: function(id) { return this.app.root.querySelector('div[data-article-id="'+id+'"]'); },
  init: function() {
      
  },
  
  buildView: function(article) {
    let elem = viewArticlePreview();
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

function viewArticlePreview() {
  return Document.parseHTMLUnsafe(`
  <div class="article-preview" data-article-id="">
    <div class="article-meta">
      <a href="/profile/eric-simons"><img src="http://i.imgur.com/Qr71crq.jpg" /></a>
      <div class="info">
        <a href="/profile/eric-simons" class="author" data-pg-elem="author"></a>
        <span class="date" data-pg-elem="date"></span><!--January 20th-->
      </div>
      <button class="btn btn-outline-primary btn-sm pull-xs-right">
        <i class="ion-heart"></i> 29
      </button>
    </div>
    <a href="" class="preview-link" data-pg-elem="article-link">
      <h1 data-pg-elem="title"></h1>
      <p data-pg-elem="desc"></p>
      <span>Read more...</span>
      <ul class="tag-list">
        <li class="tag-default tag-pill tag-outline">realworld</li>
        <li class="tag-default tag-pill tag-outline">implementations</li>
      </ul>
    </a>
  </div>
  `).body.firstChild;
}