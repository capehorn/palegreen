

export let ArticleList = function(app){
  this.app = app;
};
ArticleList.prototype = {
  sel: function(){ return this.app.root.querySelector('main'); },
  init: function() {
    let elem = this.sel();
    elem.appendChild(viewArticles());
    let articleListElem = elem.querySelector('div[data-pg-elem="article-list"]');
    // this.app.on(this.app.action.notifyApiCallSuccess, fnAction => {
      // this.app.model.articles.forEach(article => elem.insertAdjacentElement("beforeend", this.app.view.ArticlePreview.buildView(article)));
    // });
    this.app.on(this.app.action.showArticles, () => {
      this.app.model.articles.forEach(article => articleListElem.insertAdjacentElement("beforeend", this.app.view.ArticlePreview.buildView(article)));
    });
  },
  buildView: function() {
    
  }
};

function viewArticles() {
  return Document.parseHTMLUnsafe(`
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a class="nav-link" href="">Your Feed</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="">Global Feed</a>
              </li>
            </ul>
          </div>
          <div data-pg-elem="article-list">
            <!-- TEMPLATE article preview -->
          </div>

          <ul class="pagination">
            <li class="page-item active">
              <a class="page-link" href="">1</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="">2</a>
            </li>
          </ul>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <a href="" class="tag-pill tag-default">programming</a>
              <a href="" class="tag-pill tag-default">javascript</a>
              <a href="" class="tag-pill tag-default">emberjs</a>
              <a href="" class="tag-pill tag-default">angularjs</a>
              <a href="" class="tag-pill tag-default">react</a>
              <a href="" class="tag-pill tag-default">mean</a>
              <a href="" class="tag-pill tag-default">node</a>
              <a href="" class="tag-pill tag-default">rails</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `).body.firstChild;
}