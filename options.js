function setVolume()
{
    let vlm = document.getElementById('volumePicker').volume;
    chrome.storage.sync.set({'volume': vlm}, function() {
        console.log('Volume is set to' + vlm);
        alert("Got it! Volume saved to "+ vlm);
    });
}

document.getElementById("myButton").addEventListener("click", setVolume);
