


export let Router = function(routingFn){
  this.routes = new Map();
  this.routingFn = routingFn;
};

Router.prototype = {
  addRoute: function(name, path) {
    let paths = this.routes.get(name);
    if (paths === undefined) {
      this.routes.set(name, [new RegExp(path)]);
    } else {
      paths.push(new RegExp(path));
    }
    return this;
  },
  
  goToPath: function(path) {
    let matchingRoutes = [];
    this.routes.forEach((regExps, name) => {
      regExps.forEach(regExp => {
        let resultArray = regExp.exec(path);
        if (resultArray != null) {
          console.log("report matching");
          console.log(resultArray.groups);
          this.routingFn(name, resultArray.groups);
        }
      });
    });
  },
  goTo(name, props) {
    let route = this.routes.get(name);
    if (route != undefined) {
      this.routingFn(name, props);
    }
  }
};

export function route(strings, ...rexps) {
  const result = [RegExp.escape(strings[0])];
  rexps.forEach((rexp, i) => {
    result.push(rexp.source, RegExp.escape(strings[i+1]));
  });
  return result.join("");
}

