/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/dom_node_collection.js":
/*!************************************!*\
  !*** ./lib/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

class DomNodeCollection {
  constructor(nodes) {
    this.nodes = nodes; 
  } 

  each(cb) {
    this.nodes.forEach(cb); 
  }

  html(html) {
    if(typeof html === "string") {
      this.each(node => (node.innerHTML = html)); 
    } else if(this.nodes.length > 0) {
      return this.nodes[0].innerHTML; 
    }
  } 

  empty() {
    this.html = ""
  } 

  append(children) {
    if(this.nodes.length === 0) return; 

    if(typeof children === 'object' && 
      !(children instanceof DomNodeCollection)) {
        children = $l(children)
    } 

    if(typeof children === "string") {
      this.each(node => (node.innerHTML += children))
    } else if(children instanceof DomNodeCollection) {
      this.each(node => {
        children.each(childNode => (node.appendChild(childNode.cloneNode(true))))
      })
    }

  } 

  remove() {
    this.each(node => node.parentNode.removeChild(node))
  } 

  attr(key, value) {
    if(typeof value === "string") {
      this.each(node => node.setAttribute(key, val)); 
    } else {
      return this.nodes[0].getAttribute(key); 
    }
  } 

  addClass(newClass) {
    this.each(node => (node.classList.add(newClass))); 
  } 

  removeClass(oldClass) {
    this.each(node => node.classList.remove(oldClass)); 
  } 

  toggleClass(toggleClass) {
    this.each(node => (node.classList.toggle(toggleClass))); 
  }   

  find(selector) {
    let foundNodes = []; 
    this.each(node => { 
      const nodeList = node.querySelectorAll(selector); 
      foundNodes = foundNodes.concat(Array.from(nodeList)); 
    }) 
    return new DomNodeCollection(foundNodes); 
  } 

  children() {
    let childNodes = []; 
    this.each(node => {
      const childNodeList = node.children; 
      childNodes = childNodes.concat(Array.from(childNodeList)); 
    }); 
    return new DomNodeCollection(childNodes); 
  } 

  parent() {
    const parentNodes = []; 
    this.each(({ parentNode }) => {
      if(!parentNode.visited) {
        parentNodes.push(parentNode); 
        parentNode.visited = true; 
      }
    });  

    parentNodes.forEach(node => (node.visited = false)); 
    return new DomNodeCollection(parentNodes); 
  }
} 

module.exports = DomNodeCollection; 

/***/ }),

/***/ "./lib/main.js":
/*!*********************!*\
  !*** ./lib/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const DomNodeCollection = __webpack_require__(/*! ./dom_node_collection */ "./lib/dom_node_collection.js");  

$l = arg => { 
  switch(typeof arg) {
    case "function": 
    // :TODO 
    case "string": 
      return getNodesFromDom(arg) 
    case "object": 
      if(arg instanceof HTMLElement) {
        return new DomNodeCollection([arg])
      }
  }
}; 

getNodesFromDom = selector => {
  const nodes = document.querySelectorAll(selector); 
  const nodesArray = Array.from(nodes); 
  return new DomNodeCollection(nodesArray); 
}

window.$l = $l; 

/***/ })

/******/ });
//# sourceMappingURL=jquery_lite.js.map