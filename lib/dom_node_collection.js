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

  
} 

module.exports = DomNodeCollection; 