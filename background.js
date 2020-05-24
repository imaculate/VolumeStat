chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({volume: 0.5}, function() {
        console.log("Setting default volume to 0.5");
    });
});

/*
// Damn it chrome does not support programmatic tab cature, has to be initiated by user action
// https://developer.chrome.com/extensions/activeTab
chrome.runtime.onMessage.addListener((page, sender, sendResponse) => {
    updateTabVolume(sender.tab.id);
    sendResponse({status: "ok"});
});*/

chrome.browserAction.onClicked.addListener(updateTabVolume);


function updateTabVolume()
{
    // this can only be called in background script
    chrome.storage.sync.get('volume', function(data) {
    // but how do you get the stream?
        chrome.tabs.query({active: true}, (tab) => {

            if(!tab)
            {
                console.log("Doesn't look like there is an active Tab here");
                return;
            }

            let constraints = {
                audio: true,
                video: false
            };

            chrome.tabCapture.capture(constraints, (stream) => {
                console.log('got stream for capture');

                if (!stream) {
                    chrome.windows.create({
                        url: "data:text/html,<h1>" + chrome.runtime.lastError.message + "Internal error occurred while capturing the screen.</h1>",
                        type: 'popup',
                        width: screen.width / 2,
                        height: 170
                    });
                    console.log('Could not retrieve stream of this tab');
                    return;
                }

                console.log('setting stream volume to '+ data.volume);
                stream.volume = data.volume;
                // I think what you want to is to create a document audio element that plays stream, but is it? Well, I tried :)
            });
        });
    });
}
