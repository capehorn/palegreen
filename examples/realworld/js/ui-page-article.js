


export let ArticlePage = function(app){
  this.app = app;
};
ArticlePage.prototype = {
  sel: function(){ return this.app.root.querySelector('div[data-pg-elem="article-page"]'); },
  init: function() {
    this.app.on(this.app.action.showArticle, article => {
      let elemArticle = this.buildView(article);
      
    });
    
    
    
    // let elem = this.sel();
    // if (elem != null) {
    // }
  },
  buildView: function(article) {
    let template = this.app.root.querySelector('template#article-page');
    let clone = document.importNode(template.content, true);
    let elem = clone.children[0];
    return elem
  },
};