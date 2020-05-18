// update volume
var messenger = chrome.runtime.sendMessage({ 
  location: window.location, 
  document: document.documentElement.outerHTML
}, (response) => {
  console.log("Document is idle lets do some tabbing");
  if (response == undefined || response == null ||
      Object.keys(response).length == 0) {
    return console.log("Calling into the void");
  } 

  console.log("Content script finished");
});