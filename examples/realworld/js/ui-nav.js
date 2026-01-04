
export let Navbar = function(app){
  this.app = app;
};
Navbar.prototype = {
  sel: function() {return this.app.root.querySelector('nav');},
  init: function() {
    this.sel().appendChild(viewNav());
  },
};

function viewNav() {
  return Document.parseHTMLUnsafe(`
    <div class="container">
      <a class="navbar-brand" href="/">conduit</a>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <!-- Add "active" class when you're on that page" -->
          <a class="nav-link active" href="/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/login">Sign in</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/register">Sign up</a>
        </li>
      </ul>
    </div>
  `).body.firstChild;
  
}