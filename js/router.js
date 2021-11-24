class Route {
  constructor(name, htmlName, defaultRoute) {
    if(!name || !htmlName) {
      throw 'error: name and htmlName params are mandatories';
    }
    this.name = name;
    this.htmlName = htmlName;
    this.default = defaultRoute;
  }

  isActiveRoute (hashedPath) {
    return hashedPath.replace('#', '') === this.name; 
  }
}

class Router {
  constructor (routes) {
    this.routes = routes;
    this.rootElem = document.querySelector('.wrapper');
    this.scripts = document.querySelectorAll('script');
    this.count = 0;
    this.init();
  }
  init () {
    const r = this.routes;
    (function(scope, r) { 
        window.addEventListener('hashchange', function (e) {
            scope.hasChanged(scope, r);
        });
    })(this, r);
    this.hasChanged(this, r);
  }
  hasChanged (scope, r) {
    if (window.location.hash.length > 0) {
      for (let i = 0, length = r.length; i < length; i++) {
        const route = r[i];
        if(route.isActiveRoute(window.location.hash.substr(1))) {
          scope.goToRoute(route.htmlName);
        }
      }
    } 
    else {
      for (let i = 0, length = r.length; i < length; i++) {
        let route = r[i];
        if(route.default) {
          scope.goToRoute(route.htmlName);
        }
      }
    }
  }
  goToRoute (htmlName) {
    (function(scope) { 
      const url = 'html/' + htmlName;
      const xhttp = new XMLHttpRequest();
          
      xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          let filename = htmlName.slice(0, htmlName.lastIndexOf('.')) + '.js?n=' + scope.count;
          scope.count++;
          // scope.hideElement();
          scope.rootElem.innerHTML = this.responseText;
          // setTimeout(() => {scope.showElement()}, 3000);
          scope.removeScripts();
          scope.addScript(filename);  
        }
      };
      xhttp.open('GET', url, true);
      xhttp.send();
    })(this);
  }
  removeScripts () {
    this.scripts = document.querySelectorAll('script');
    for(let i = 0; i < this.scripts.length; i++) {
      const path = this.scripts[i].src.split('/');
      const filename = path[path.length-1];
      if(filename !== 'router.js') {
        this.scripts[i].remove();
      }
    }
  }
  addScript (filename) {
    const script = document.createElement('script');
    script.src = './js/' + filename;
    script.type = 'module';
    this.rootElem.after(script);
  }
  hideElement() {
    let step = 0.1;
    let opacity = 1;
    let timer1 = setInterval(() => {
      console.log(opacity);
      this.rootElem.style.opacity = opacity;
      opacity = (opacity - step).toFixed(1);
      if(opacity <= 0) {
        clearInterval(timer1);
      }
    }, 50);
  }
  showElement () {
    let step = 0.1;
    let opacity = 0;
    let timer2 = setInterval(() => {
      console.log(opacity);
      this.rootElem.style.opacity = opacity;
      opacity = (Number(opacity) + step).toFixed(1);
      if(opacity >= 1) {
        clearInterval(timer2);
      }
    }, 50);
  }
}

(function init() {
  const router = new Router([  
    new Route('home', 'home.html', true),  
    new Route('settings', 'settings.html'),
    new Route('pictures-quiz', 'pictures-quiz.html'),
    new Route('pictures-game', 'pictures-game.html'),
  ]);

  if(localStorage.getItem('volume') === null) {
    localStorage.setItem('volume', 0.5);
  }
  if(localStorage.getItem('time') == null) {
    localStorage.setItem('time', 20);
  }
  if(localStorage.getItem('isTimer') === null) {
    localStorage.setItem('isTimer', true);
  }
}());