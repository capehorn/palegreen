

export let Spa = function(app){
  this.app = app;
};
Spa.prototype = {
  sel: function(){ return this.app.root.body; },
  init: function() {
    let elem = this.sel();
    this.app.on(this.app.action.showArticle, article => {
      //console.log("should switch to article view");
      let elemArticle = this.app.view.ArticlePage.buildView(article);
      let elemMain = document.createElement("main");
      elemMain.appendChild(elemArticle);
      elem.querySelector("main").replaceWith(elemMain);
    });
  },
};