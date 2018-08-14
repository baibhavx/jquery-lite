$l = arg => { 

  const nodeList = document.querySelectorAll(arg);  
  const nodeArray = Array.from(nodeList); 
  console.log(Array.isArray(nodeList) ); 
  console.log(Array.isArray(nodeArray));  
}

window.$l = $l; 