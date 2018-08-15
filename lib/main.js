const DomNodeCollection = require('./dom_node_collection');  
const documentReadyCallbacks = []; 
const isDocumentReady = false; 

$l = arg => { 
  switch(typeof arg) {
    case "function": 
       return registerDocumentReadyCallback(arg)
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

registerDocReadyCallback = callback => {
  if(!isDocumentReady) {
    documentReadyCallbacks.push(cb); 
  } else {
    callback(); 
  }
} 

document.addEventListener('DOMContentLoaded', () => {
  isDocumentReady = true; 
  documentReadyCallbacks.forEach(cb => (cb())); 
})

window.$l = $l; 