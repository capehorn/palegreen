import { createApp } from "../../../index.js";
import * as API from "./api.js";

import { Navbar } from "./ui-nav.js";
import { ArticleList } from "./ui-page-home.js";
import { ArticlePreview } from "./ui-article-preview.js";

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
    
  },
  showArticle: function(article) {
    console.log("Show article");
    console.log(article);
  },
  routing: function(routeObj, popstateEvent) {
    console.log("routing");
    console.log(routeObj);
    //console.log(e.state.action);
    if (routeObj != null) {
      app.action[routeObj.actionName].call();
    }
  },
};

let action = new Action();

app.action = action;

app.startAt = function(route) {
  history.replaceState({route}, "", route);
};

app.router = {};

app.router.routes = {
  home: () => ({
    route: `#/`,
    routeProps: {},
    actionName: app.action.showHomePage.name,
    popstateEvent: null,
  }),
  article: (articleSlug) => ({
    route: `#/article/${/^(?<articleSlug>[\w-]+)$/}`,
    routeProps: { articleSlug },
    actionName: app.action.showArticlePage.name,
    popstateEvent: null,
  }),
  login: {
    route: ["#", "/", "login", "/", /^(?<username>\w+)$/, "?", ["country", "fr"]],
  },
  profile: {
    
  },
  register: {
    
  },
  settings: {
    
  }
  
};

window.addEventListener('popstate', e => {
  console.log(e);
  let url = URL.parse(e.target.location.href);
  
  app.do(app.action.routing, null, e);
});

app.addView(Navbar);
app.addView(ArticleList);
app.addView(ArticlePreview);

history.replaceState({routing: "#/"}, "", "#/");

app.action.routing(app.router.routes.home());

let routeRegexp = buildRouterRegexp`#/article/${/(?<articleSlug>[\w-]+)/}`;
function buildRouterRegexp(strings, ...rexps) {
  const result = [RegExp.escape(strings[0])];
  rexps.forEach((rexp, i) => {
    result.push(rexp.source, RegExp.escape(strings[i + 1]));
  });
  return new RegExp(result.join(""));
}
console.log(routeRegexp.source);
console.log(routeRegexp.test("#/article/toto"));






