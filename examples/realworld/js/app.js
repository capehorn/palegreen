import { createApp } from "../../../index.js";
import * as API from "./api.js";

import { Router, route } from "../../../packages/router/index.js";

import { Navbar } from "./ui-nav.js";
import { ArticleList } from "./ui-page-home.js";
import { ArticlePreview } from "./ui-article-preview.js";
import { ArticlePage } from "./ui-page-article.js";

let app = createApp();
app.root = document;
app.model = {};
app.model.articles = [];

let Action = function(){}

Action.prototype = {
  fetchArticles: function() {
    API.getArticles()
      .then(value => {
        app.model.articles = value.articles; 
        app.do(app.action.notifyApiCallSuccess, app.action.fetchArticles);
      })
      .catch(err => console.error(err));
  },
  notifyApiCallSuccess: function(fnAction) {
    console.log("notifyApiCallSuccess: " + fnAction.name);
    return fnAction;
  },
  showHomePage: function() {
    Promise.all([API.getArticles()])
      .then(([articles]) => {
        app.model.articles = articles.articles;
        app.do(app.action.showArticles);
      });
  },
  showArticles: function() {
    console.log("Show articles");
  },
  showArticle: function(article) {
    console.log("Show article");
    console.log(article);
  },
  routing: function(routeName, props) {
    console.log("routing");
    console.log(routeName);
    console.log(props)
    switch(routeName) {
      case "home": app.do(app.action.showHomePage); break;
      case "article": app.do(app.action.showArticle, props.directValue); break;
      default: return;
    }
  },
};

let action = new Action();
app.action = action;

// register routes
let router = new Router(app.action.routing);
router.addRoute("home", `#/`);
router.addRoute("article", route`#/article/${/(?<articleSlug>[\w-]+)/}`);
app.router = router;

app.startAt = function(route) {
  history.replaceState({route}, "", route);
};

window.addEventListener('popstate', e => {
  console.log(e);
  let url = URL.parse(e.target.location.href);
  
  app.do(app.action.routing, null, e);
});

app.addView(Navbar);
app.addView(ArticleList);
app.addView(ArticlePreview);
app.addView(ArticlePage);

history.replaceState({routing: "home"}, "", "#/");
app.router.goTo("home");







