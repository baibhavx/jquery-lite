const DomNodeCollection = require('./dom_node_collection');  

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