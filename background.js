chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({volume: 0.5}, function() {
        console.log("Setting default volume to 0.5");
    });
});

chrome.runtime.onMessage.addListener((page, sender, sendResponse) => {
    updateTabVolume(sender.tab.id);
    sendResponse({status: "ok"});
});


function updateTabVolume(tabId)
{
    console.log("Message coming from tab: "+ tabId);
    // this can only be called in background script
    chrome.storage.sync.get('volume', function(data) {
    // but how do you get the stream?
        chrome.tabs.get(tabId, (tab) => {

            if (!tab.audible)
            {
                console.log('Nothing audible here, no need to stat this page');
                return;
            }
            let constraints = {
                audio: true,
                video: true,
                videoConstraints: {
                    mandatory: {
                        chromeMediaSource: 'tab',
                        googLeakyBucket: true,
                        googTemporalLayeredScreencast: true
                    }
                }
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
                stream.inputs[0].volume = data.volume;
            });
        });
    });
}
