// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var $siteList = $('.siteList'); // 声明$siteList将为要插的节点

var $lastLi = $siteList.find('li.last'); // 通过数组find函数找到li的last属性并声明$lastLi

var $iconDelete = $('use.icon-delete');
var x = localStorage.getItem('x');
var xObject = JSON.parse(x); // 解析JSON字符串，构造数组
// 用哈希表存储网站

var hashMap = xObject || [{
  logo: 'C',
  url: 'https://blog.csdn.net/JankoY?spm=1011.2124.3001.5343'
}, {
  logo: 'I',
  url: 'https://www.iconfont.cn/'
}, {
  logo: 'F',
  url: 'https://figma.com/'
}];

var simplifyUrl = function simplifyUrl(url) {
  return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, ''); // 删除链接/后面的内容
};

var render = function render() {
  // 通过调用函数的方式，调用数据结构增删列表
  $siteList.find('li:not(.last)').remove();
  hashMap.forEach(function (node, index) {
    // 遍历节点和下标
    var $li = $("<li>\n        <div class=\"site\">\n            <div class=\"logo\">".concat(node.logo[0], "</div>\n            <div class=\"link\">").concat(simplifyUrl(node.url), "</div>\n            <div class=\"close\">\n            <svg class=\"icon\">\n            <use class=\"icon-delete\" xlink:href=\"#icon-shanchu\"></use>\n            </svg></div>\n        </div>\n        </a>\n    </li>")).insertBefore($lastLi);
    $li.on('click', function () {
      window.open(node.url);
    });
    $li.on('click', '.close', function (e) {
      e.stopPropagation();
      hashMap.splice(index, 1);
      render();
    });
  });
};

render();
$('.addButton').on('click', function () {
  var url = window.prompt('请输入将要添加的网址：');

  if (url.indexOf('http') !== 0) {
    url = 'https://' + url;
  }

  hashMap.push({
    //push：往数组最后插入新下标
    logo: simplifyUrl(url)[0].toUpperCase(),
    url: url
  });
  render();
});
$('.addButton').hover(function () {
  $($iconDelete).hide;
}, function () {
  $($iconDelete).show;
});

window.onbeforeunload = function () {
  //在页面载入时加载localStorage（浏览器缓存—从而加载数据）
  var string = JSON.stringify(hashMap); //将一个JavaScript 对象或值转换为JSON 字符串

  window.localStorage.setItem('x', string); //setItem:接受一个键名和值作为参数，将会把键名添加到存储中，如果键名已存在，则更新其对应的值。
};
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.db78e489.js.map