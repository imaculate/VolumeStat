let volumeRow = document.getElementById('vol-row');


chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {file: 'setVolume.js'});
});




 