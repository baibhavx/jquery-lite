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
} 

module.exports = DomNodeCollection; 