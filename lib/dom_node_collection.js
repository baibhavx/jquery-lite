class DomNodeCollection {
  constructor(nodes) {
    this.nodes = nodes;
  }

  each(cb) {
    this.nodes.forEach(cb);
  }

  html(html) {
    if (typeof html === "string") {
      this.each(node => (node.innerHTML = html));
    } else if (this.nodes.length > 0) {
      return this.nodes[0].innerHTML;
    }
  }

  empty() {
    this.html = ""
  }

  append(children) {
    if (this.nodes.length === 0) return;

    if (typeof children === 'object' &&
      !(children instanceof DomNodeCollection)) {
      children = $l(children)
    }

    if (typeof children === "string") {
      this.each(node => (node.innerHTML += children))
    } else if (children instanceof DomNodeCollection) {
      this.each(node => {
        children.each(childNode =>
          (node.appendChild(childNode.cloneNode(true))))
      })
    }

  }

  remove() {
    this.each(node => node.parentNode.removeChild(node))
  }

  attr(key, value) {
    if (typeof value === "string") {
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
      if (!parentNode.visited) {
        parentNodes.push(parentNode);
        parentNode.visited = true;
      }
    });

    parentNodes.forEach(node => (node.visited = false));
    return new DomNodeCollection(parentNodes);
  }

  on(eventName, cb) {
    this.each(node => {
      node.addEventListener(eventName, cb);
      const eventKey = `jqliteEvents-${eventName}`;
      if (typeof node[eventKey] === "undefined") {
        node[eventKey] = [];
      }
      node[eventKey].push(cb)
    });
  }

  off(eventName) {
    this.each(node => {
      const eventKey = `jqliteEvents-${eventName}`;
      if (node[eventKey]) {
        node[eventKey]
          .forEach(cb => (node.removeEventListener(eventName, cb)));
      }
      node[eventKey] = [];
    })
  }
}

module.exports = DomNodeCollection; 