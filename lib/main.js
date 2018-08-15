const DomNodeCollection = require('./dom_node_collection');  
const documentReadyCallbacks = []; 
const isDocumentReady = false; 

window.$l = arg => { 
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

$l.extend = (main, ...others) => {
  others.forEach(object => {
    for(const key in object) {
      main[key] = object[key]; 
    }
  }); 
  return main; 
} 

$l.ajax = options => {
  const request = new XMLHttpRequest(); 
  const defaults = {
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8', 
    method: 'GET', 
    url: "", 
    success: () => null, 
    error: () => null, 
    data: {}
  }; 
  options = $.extend(defaults, options); 
  options.method = options.method.toUpperCase(); 

  if(options.method === "GET") {
    options.url += `?${toQueryString(options.data)}`; 
  } 
  request.open(options.method, options.url, true); 
  request.onload = e => {
    if(request.status === 200) {
      options.success(request.response); 
    } else {
      options.error(request.response); 
    }
  }; 
  request.send(JSON.stringify(options.data)); 
};  

toQueryString = object => {
  let queryString = ""; 
  for(const key in object) {
    if(Object.prototype.hasOwnProperty.call(object, key)) {
      queryString += `${key}=${object[key]}&`; 
    }
  }
  return queryString.slice(0, queryString.length - 1); 
}

getNodesFromDom = selector => {
  const nodes = document.querySelectorAll(selector); 
  const nodesArray = Array.from(nodes); 
  return new DomNodeCollection(nodesArray); 
};  

registerDocumentReadyCallback = cb => {
  if(!isDocumentReady) {
    documentReadyCallbacks.push(cb); 
  } else {
    cb(); 
  }
};  

document.addEventListener('DOMContentLoaded', () => {
  isDocumentReady = true; 
  documentReadyCallbacks.forEach(cb => (cb())); 
}); 
