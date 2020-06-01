chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({volume: 0.5}, function() {
        console.log("Setting default volume to 0.5");
    });
});




