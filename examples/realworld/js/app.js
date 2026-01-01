import { createApp, nanoid } from "../../../index.js";
import * as API from "./api.js";
import { formatDate } from "./utils.js";
import { ArticleList, ArticlePreview } from "./ui-articles.js";
import { ArticlePage } from "./ui-article-page.js";
import { Spa } from "./ui-spa.js";

let app = createApp();
app.root = document;
app.model = {};
app.model.articles = [];

let Action = function(){}

Action.prototype = {
  fetchArticles: function() {
    API.getArticles()
      .then(value => {app.model.articles = value.articles; app.do(app.action.notifyApiCallSuccess, app.action.fetchArticles)})
      .catch(err => console.error(err));
  },
  notifyApiCallSuccess: function(fnAction) {
    console.log("notifyApiCallSuccess: " + fnAction.name);
    return fnAction;
  },
  showArticles: function() {
    
  },
  showArticle: function(article) {
    console.log("Show article");
    console.log(article);
  },
  browserNavigation: function() {
    console.log("browser navigation");
  },
};

let action = new Action();

app.action = action;

app.addView(ArticleList);
app.addView(ArticlePreview);
app.addView(ArticlePage);
app.addView(Spa);
// initialize the app
history.replaceState(null, "", "#/");

window.addEventListener('popstate', function() {
   app.do(app.action.browserNavigation);
});

app.action.fetchArticles();