


export let Router = function(){
  this.routes = new Map(); 
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
  
  match: function(path) {
    let matchingRoutes = [];
    this.routes.forEach((regExps, name) => {
      regExps.forEach(regExp => {
        let resultArray = reExp.exec(path);
        if (resultArray != null) {
          console.log("report matching");
        }
      });
    });
  },
};

export function route(strings, ...rexps) {
  const result = [RegExp.escape(strings[0])];
  rexps.forEach((rexp, i) => {
    result.push(rexp.source, RegExp.escape(strings[i+1]));
  });
  return result.join("");
}

